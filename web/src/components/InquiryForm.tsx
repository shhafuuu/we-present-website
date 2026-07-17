"use client";

import { useState, type FormEvent } from "react";

export function InquiryForm({ resortName }: { resortName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          agency: form.get("agency"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          hotel: resortName,
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
          Your inquiry about {resortName} has been noted. Our team will be in
          touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-soft-lilac/40 p-8">
      <h3 className="font-display text-xl text-aubergine">
        I&rsquo;m interested &mdash; request price/availability
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
          Agency / Company
          <input
            name="agency"
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
          Phone (WhatsApp/Telegram)
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm text-ink/70">
        Message
        <textarea
          name="message"
          rows={3}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-aubergine transition-colors hover:bg-soft-gold disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
