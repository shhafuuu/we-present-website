"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          inquiryType: form.get("inquiryType"),
          message: form.get("message"),
          consent: form.get("consent") === "on",
        }),
      });

      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-soft-lilac/40 p-8 text-center">
        <p className="font-display text-xl text-aubergine">Thank you.</p>
        <p className="mt-2 text-sm text-ink/60">
          Your message has been noted. Our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-soft-lilac/40 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-ink/70">
          Full Name
          <input
            required
            name="name"
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Phone (optional)
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Inquiry Type
          <select
            name="inquiryType"
            defaultValue="General"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          >
            <option>General</option>
            <option>Private Trip</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block text-sm text-ink/70">
        Message
        <textarea
          required
          name="message"
          rows={4}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-ink/60">
        <input required name="consent" type="checkbox" className="mt-1 accent-amethyst" />
        <span>
          I consent to my data being processed as described in the{" "}
          <a href="/legal" className="text-amethyst underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-aubergine transition-colors hover:bg-soft-gold disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
