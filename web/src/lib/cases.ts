import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };

export const CASE_CATEGORIES = [
  "sales",
  "media",
  "influencers",
  "events",
  "digital",
  "awards",
] as const;

export type CaseCategory = (typeof CASE_CATEGORIES)[number];

export type Case = {
  slug: string;
  category: CaseCategory;
  partner: LocalizedString;
  /** The one figure the index card leads with. Cases without a number (an
   *  appointment, an award) simply omit it and the card falls back to the summary. */
  headlineMetric?: { value: string; label: LocalizedString };
  /** One line, shown on the index card. */
  summary: LocalizedString;
  /** Detail-page copy. A case without a description gets no detail page and is not
   *  linked from the index, so a half-written case never ships a dead link. */
  description?: LocalizedString;
  activities?: LocalizedString[];
  results?: LocalizedString[];
  /** Paraphrased, never quoted verbatim: the source material is private partner
   *  correspondence. See docs/cases-source-extract.md. */
  quote?: { text: LocalizedString; attribution: LocalizedString };
  images?: string[];
  destination?: string;
  order: number;
  featured?: boolean;
  /** Defaults to true. `false` keeps a fully written case out of the site while a
   *  permission question is open, without deleting the work. Oman ships this way:
   *  Appendix D still lists "whether the representation may be published as a case"
   *  as unconfirmed. */
  published?: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "cases");

/**
 * Cases are a separate collection from `how_it_was` on purpose. How It Was is
 * post-tour reportage from We Present editions; cases are pre-existing COATI results
 * used as proof. Conflating them would imply We Present delivered work that predates
 * it, which is exactly what the agreed attribution line guards against.
 */
function loadCases(): Case[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as Case)
    .filter((c) => c.published !== false)
    .sort((a, b) => a.order - b.order);
}

export const cases: Case[] = loadCases();

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

/** Only cases with detail copy get a page, so the index never links to an empty one. */
export const casesWithDetail = cases.filter((c) => Boolean(c.description));

export const hasDetail = (c: Case) => Boolean(c.description);

/** Categories actually present in the content, so the filter row never offers an
 *  option that would return nothing. */
export const activeCategories = CASE_CATEGORIES.filter((cat) =>
  cases.some((c) => c.category === cat)
);

export const t = (value: LocalizedString, locale: Locale) => value[locale];
