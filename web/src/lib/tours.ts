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

/** A property on a tour that has a named line-up but no itinerary yet. Distinct from
 *  TourStop, which is a dated stop on a confirmed route. */
export type TourProperty = {
  name: string;
  /** Groups the list into visually separate tiers with their own subheadings, per the
   *  client's instruction for Cinnamon. Properties of different ratings are not to be
   *  mixed into one grid. */
  tier?: string;
  /** Short flag rendered as a badge, e.g. "Adults only, 18+". Not body copy. */
  badge?: LocalizedString;
  /** Written separately and added through the portal. Ships empty and guarded. */
  description?: LocalizedString;
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
  /** Named line-up for a tour whose dates are not confirmed. */
  properties?: TourProperty[];
  ttmOverview?: LocalizedString;
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

/**
 * Whether a tour has enough content to justify its own page.
 *
 * Confirmed tours always do. A pending tour normally does not, which is why it renders
 * as a non-clickable card. Cinnamon is the case that broke that binary: the client has
 * confirmed its four properties but not its dates, so there is real content to show and
 * nothing to schedule. Deriving this from content rather than adding a second status
 * flag means a tour gets a page the moment its line-up is entered in the portal.
 */
export const hasDetailPage = (tour: Tour) =>
  tour.status === "confirmed" || (tour.properties?.length ?? 0) > 0;

/** Groups a property list into its tiers, preserving first-seen tier order so the
 *  content file controls which group leads. */
export function groupByTier(properties: TourProperty[]) {
  const groups: { tier: string | undefined; items: TourProperty[] }[] = [];
  for (const property of properties) {
    const existing = groups.find((g) => g.tier === property.tier);
    if (existing) existing.items.push(property);
    else groups.push({ tier: property.tier, items: [property] });
  }
  return groups;
}
export const t = (value: LocalizedString, locale: Locale) => value[locale];
