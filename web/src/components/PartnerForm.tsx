"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { FileField } from "@/components/FileField";
import { Sparkle } from "@/components/Sparkle";

export function PartnerForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).forms.partner;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [loadedAt] = useState(() => Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        body: new FormData(event.currentTarget),
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
        <Sparkle className="mx-auto h-5 w-5 text-gold" />
        <p className="font-display mt-3 text-xl text-aubergine">{dict.thankYouTitle}</p>
        <p className="mt-2 text-sm text-ink/70">{dict.thankYouBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl bg-soft-lilac/40 p-8"
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0"
        aria-hidden="true"
      />
      <input type="hidden" name="formLoadedAt" value={loadedAt} readOnly />
      <h2 className="font-display text-xl text-aubergine">{dict.title}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-ink/70">
          {dict.hotelName}
          <input
            required
            name="hotelName"
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          {dict.contactPerson}
          <input
            required
            name="contactPerson"
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          {dict.email}
          <input
            required
            name="email"
            type="email"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          {dict.phone}
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70 sm:col-span-2">
          {dict.website}
          <input
            name="website"
            type="url"
            placeholder="https://"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm text-ink/70">
        {dict.message}
        <textarea
          name="message"
          rows={3}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>

      <div className="mt-5">
        <FileField
          name="files"
          label={dict.upload}
          hint={dict.uploadHint}
          multiple
          locale={locale}
        />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-ink/70">
        <input required name="consent" type="checkbox" className="mt-1 accent-amethyst" />
        <span>
          {dict.consent}{" "}
          <Link href={href(locale, "/legal")} className="text-amethyst underline">
            {dict.consentLink}
          </Link>
          .
        </span>
      </label>

      {status === "error" && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-aubergine transition-colors hover:bg-soft-gold disabled:opacity-60"
      >
        {status === "sending" ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}
