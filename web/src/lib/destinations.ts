import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";
import { resorts, type Resort } from "./resorts";
import { tours, type Tour } from "./tours";

type LocalizedString = { en: string; ru: string };

export type Destination = {
  slug: string;
  /** Display order on the /destinations landing page — lower first. */
  order: number;
  /** "active" gets a real page (hero, intro, resorts, programmes) and generateStaticParams.
   *  "coming-soon" only ever shows as a non-clickable card on the landing page — no
   *  resorts/partners exist yet, so there's nothing to build a real page around. */
  status: "active" | "coming-soon";
  /**
   * What kind of programme this destination runs, which decides what its page shows.
   *
   * "hotels" (the default) is the Maldives shape: COATI represents individual partner
   * properties, so the page renders a resort grid.
   *
   * "destination" is Oman: COATI represents the destination as a whole, so there is no
   * resort grid to render and the page is built around the itinerary and what the
   * destination offers. Rendering an empty grid here would imply a roster that does
   * not exist.
   *
   * "collection" is Kenya: COATI represents the Saruni Basecamp collection of safari
   * lodges, with selected lodges included depending on the itinerary. Lodges are
   * listed by name, and no logos are available.
   */
  programmeType?: "hotels" | "destination" | "collection";
  /** Only for programmeType "collection". */
  collection?: {
    name: string;
    description?: LocalizedString;
    /** Ships empty until the client supplies the roster. Never invent lodge names. */
    lodges?: { name: string; image?: string }[];
  };
  name: LocalizedString;
  /** Only present for "active" destinations. */
  heroImage?: string;
  intro?: { kicker: LocalizedString; body: LocalizedString };
};

const CONTENT_DIR = path.join(process.cwd(), "content", "destinations");

/**
 * Destination data is loaded from content/destinations/*.json, same pattern as
 * tours.ts/resorts.ts, so the content portal can add a destination (e.g. once Oman
 * or Kenya has confirmed resorts) with no code change.
 */
function loadDestinations(): Destination[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  const destinations = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as Destination;
  });
  return destinations.sort((a, b) => a.order - b.order);
}

export const destinations: Destination[] = loadDestinations();

export const getDestination = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);

export const getResortsForDestination = (slug: string): Resort[] =>
  resorts.filter((resort) => resort.destinationSlug === slug);

/**
 * Whether this destination's page should render a resort grid at all.
 *
 * Guarding on programmeType rather than on "are there any resorts yet" matters: an
 * empty grid on Oman would read as a roster still loading, when in fact COATI
 * represents the destination as a whole and there will never be one.
 */
export const showsResortGrid = (destination: Destination) =>
  (destination.programmeType ?? "hotels") === "hotels";

/**
 * Tours don't carry a destinationSlug of their own — they already have a
 * free-text `destination` display field (e.g. { en: "Maldives" }) used for the
 * calendar grouping, so a programme is considered to visit a destination when
 * that field's English name matches the destination's English name. Lightweight
 * on purpose: revisit with a real destinationSlug on Tour if this string
 * coupling ever causes a mismatch.
 */
export const getToursForDestination = (destination: Destination): Tour[] =>
  // A workshop has no destination, so it never matches and never appears under one.
  tours.filter((tour) => tour.destination?.en === destination.name.en);

export const t = (value: LocalizedString, locale: Locale) => value[locale];
