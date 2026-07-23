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
 * Tours don't carry a destinationSlug of their own — they already have a
 * free-text `destination` display field (e.g. { en: "Maldives" }) used for the
 * calendar grouping, so a programme is considered to visit a destination when
 * that field's English name matches the destination's English name. Lightweight
 * on purpose: revisit with a real destinationSlug on Tour if this string
 * coupling ever causes a mismatch.
 */
export const getToursForDestination = (destination: Destination): Tour[] =>
  tours.filter((tour) => tour.destination.en === destination.name.en);

export const t = (value: LocalizedString, locale: Locale) => value[locale];
