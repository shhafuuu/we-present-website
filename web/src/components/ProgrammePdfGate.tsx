"use client";

import { useState, type FormEvent } from "react";
import { Sparkle } from "@/components/Sparkle";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type PdfOption = { file: string; label: string };

/**
 * Name-and-email gate in front of a tour's programme PDF.
 *
 * The response body is the file itself rather than a URL, so nothing here ever holds
 * a shareable link to it. The blob is turned into an object URL only long enough to
 * trigger the download, then revoked.
 */
export function ProgrammePdfGate({
  locale,
  tourSlug,
  options,
}: {
  locale: Locale;
  tourSlug: string;
  options: PdfOption[];
}) {
  const dict = getDictionary(locale).programmePdf;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [loadedAt] = useState(() => Date.now());
  const [selected, setSelected] = useState(options[0]?.file ?? "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/programme-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          tourSlug,
          file: selected,
          company_website: form.get("company_website"),
          formLoadedAt: loadedAt,
        }),
      });

      if (!res.ok) {
        const message = await res
          .json()
          .then((j) => j.error as string)
          .catch(() => null);
        throw new Error(message ?? dict.error);
      }

      // A honeypot or time-trap hit returns JSON, not a PDF. Treat it as success so
      // the response is indistinguishable from a real one, but hand over no file.
      const type = res.headers.get("Content-Type") ?? "";
      if (type.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = selected;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }

      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-amethyst/15 bg-ivory p-8 text-center">
        <Sparkle className="mx-auto h-5 w-5 text-gold" />
        <p className="font-display mt-3 text-xl text-aubergine">{dict.sentTitle}</p>
        <p className="mt-2 text-sm text-ink/70">{dict.sentBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-amethyst/15 bg-ivory p-8"
    >
      <p className="kicker text-amethyst">{dict.kicker}</p>
      <h2 className="font-display mt-3 text-2xl text-aubergine">{dict.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{dict.body}</p>

      {options.length > 1 && (
        <div className="mt-6">
          <label htmlFor="pdf-file" className="kicker block text-amethyst">
            {dict.versionLabel}
          </label>
          <select
            id="pdf-file"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-white px-4 py-3 text-sm text-ink focus:border-amethyst focus:outline-none"
          >
            {options.map((o) => (
              <option key={o.file} value={o.file}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pdf-name" className="kicker block text-amethyst">
            {dict.nameLabel}
          </label>
          <input
            id="pdf-name"
            name="name"
            required
            maxLength={200}
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-white px-4 py-3 text-sm text-ink focus:border-amethyst focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="pdf-email" className="kicker block text-amethyst">
            {dict.emailLabel}
          </label>
          <input
            id="pdf-email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="mt-2 w-full rounded-lg border border-amethyst/20 bg-white px-4 py-3 text-sm text-ink focus:border-amethyst focus:outline-none"
          />
        </div>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold px-7 py-3 text-sm font-medium text-aubergine transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amethyst disabled:opacity-60"
      >
        {status === "sending" ? dict.sending : dict.cta}
      </button>

      {error && (
        <p role="alert" className="mt-4 text-sm text-ink/70">
          {error}
        </p>
      )}
    </form>
  );
}
