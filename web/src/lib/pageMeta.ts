import type { Metadata } from "next";
import { localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

/**
 * Per-page `<title>` and meta description.
 *
 * Every page used to inherit one title and one description from the root layout, so
 * fourteen routes in two languages presented as the same document to search engines and
 * to anyone pasting a link into a chat. Lighthouse cannot catch this — it audits one
 * page at a time and sees a perfectly good title.
 *
 * Nothing here writes new copy. Titles and descriptions are drawn from the page's own
 * banner heading and body, or from the entity's own name and tagline, which are client
 * copy already visible on the page. That keeps the meta consistent with what a visitor
 * actually lands on, and avoids adding another block of unapproved marketing text.
 */

/** Google truncates around 155–160 characters; longer descriptions are simply cut. */
const MAX_DESCRIPTION = 160;

export function truncate(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return trimmed.replace(/[\s,;:.–—·]+$/, "") + "…";
}

export function pageMetadata(
  locale: Locale,
  path: string,
  page: { title: string; description?: string },
): Metadata {
  const dict = getDictionary(locale);
  return {
    // The brand reads the same in both locales; only the layout's site-level title
    // carries the localized "by Coati" / "от Coati" suffix.
    title: `${page.title} · We Present`,
    description: truncate(page.description ?? dict.meta.description),
    alternates: localeAlternates(locale, path),
  };
}
