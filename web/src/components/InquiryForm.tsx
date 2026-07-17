"use client";

import { useState, type FormEvent } from "react";

export function InquiryForm({ resortName }: { resortName: string }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form backend (serverless function + email routing) is not yet wired up —
    // see Technical Specification Section 8.2 for the intended flow.
    setSubmitted(true);
  };

  if (submitted) {
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
      <input type="hidden" name="hotel" value={resortName} />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-ink/70">
          Full Name
          <input
            required
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Agency / Company
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Email
          <input
            required
            type="email"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          Phone (WhatsApp/Telegram)
          <input
            type="tel"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm text-ink/70">
        Message
        <textarea
          rows={3}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>
      <button
        type="submit"
        className="mt-6 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-aubergine transition-colors hover:bg-soft-gold"
      >
        Send Inquiry
      </button>
    </form>
  );
}
