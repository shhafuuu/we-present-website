"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { FileField } from "@/components/FileField";
import { Sparkle } from "@/components/Sparkle";

/** One selectable programme. Built on the server so the form stays a plain string list
 *  rather than pulling the tours loader into the client bundle. */
export type RegisterEventOption = {
  slug: string;
  label: string;
  /** Drives whether agency performance statistics are asked for. */
  isWorkshop: boolean;
};

export function RegisterForm({
  locale,
  events,
}: {
  locale: Locale;
  events: RegisterEventOption[];
}) {
  const dict = getDictionary(locale).forms.register;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [loadedAt] = useState(() => Date.now());

  // Prefilled when the visitor arrives from a programme page (/register?event=slug).
  // Read on the client so this page stays statically generated; the Suspense boundary
  // it needs lives in the page.
  const params = useSearchParams();
  const requested = params.get("event") ?? "";
  const [event, setEvent] = useState(
    events.some((e) => e.slug === requested) ? requested : ""
  );

  // A workshop registration should not demand agency performance statistics: the event
  // is complimentary and open to agents generally, so there is nothing to assess.
  const requiresStats = !events.find((e) => e.slug === event)?.isWorkshop;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/register", {
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

      <label className="mt-6 block text-sm text-ink/70">
        {dict.event}
        <select
          name="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        >
          <option value="">{dict.eventGeneral}</option>
          {events.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-ink/70">
          {dict.fullName}
          <input
            required
            name="name"
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          {dict.agency}
          <input
            required
            name="agency"
            type="text"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
        <label className="text-sm text-ink/70">
          {dict.phone}
          <input
            required
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
          <span className="mt-1.5 block text-xs text-ink/70">{dict.phoneHint}</span>
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
      </div>

      <label className="mt-5 block text-sm text-ink/70">
        {dict.comments}
        <textarea
          name="comments"
          rows={3}
          className="mt-2 w-full rounded-lg border border-amethyst/20 bg-ivory px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>

      {/* The business card is always asked for. Statistics are not: see requiresStats. */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {requiresStats && (
          <FileField name="stats" label={dict.statsUpload} hint={dict.statsUploadHint} required locale={locale} />
        )}
        <FileField name="businessCard" label={dict.cardUpload} hint={dict.cardUploadHint} required locale={locale} />
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
