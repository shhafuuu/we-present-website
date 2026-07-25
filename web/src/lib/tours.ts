import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };

export type TourStop = {
  label: string;
  dates: LocalizedString;
  note: LocalizedString;
  resortSlug?: string;
};

export type IncludedItem = { icon: string; label: LocalizedString };

export type WhatsIncluded = {
  items: IncludedItem[];
  notes: LocalizedString;
};

export type OnSiteProgram = {
  title: LocalizedString;
  items: LocalizedString[];
};

export type Tour = {
  slug: string;
  /** Display order in the calendar — lower first. Editable via the content portal. */
  order: number;
  year: string;
  name: LocalizedString;
  destination: LocalizedString;
  dates: LocalizedString;
  status: "confirmed" | "pending";
  summary: LocalizedString;
  stops: TourStop[];
  ttmOverview?: LocalizedString;
  /** Participation package (registration fee, accommodation, etc). Portal-editable,
   *  per-tour since inclusions vary — spec v2.0 §7.1. Only render when present. */
  whatsIncluded?: WhatsIncluded;
  /** The on-site programme every resort stop includes. Content is the same across
   *  tours today, but modelled per-tour (not a single shared default) so it stays
   *  portal-editable if a future tour ever needs to diverge — spec v2.0 §7.2. */
  onSiteProgram?: OnSiteProgram;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "tours");

/**
 * Tour data is loaded from content/tours/*.json (one file per tour, filename doesn't
 * matter — the "slug" field does) rather than hardcoded here, so the content portal
 * can add/edit/remove a tour by writing a JSON file with no code change required.
 * Sorted by dates so the calendar order stays deterministic regardless of file order.
 */
function loadTours(): Tour[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  const tours = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as Tour;
  });
  return tours.sort((a, b) => a.order - b.order);
}

export const tours: Tour[] = loadTours();

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);
export const t = (value: LocalizedString, locale: Locale) => value[locale];
