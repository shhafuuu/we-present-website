import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };
type LocalizedList = { en: string[]; ru: string[] };

export type Resort = {
  slug: string;
  /** Display order in grids/lists — lower first. Editable via the content portal. */
  order: number;
  name: string;
  atoll: LocalizedString;
  tagline: LocalizedString;
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  heroVideo?: string;
  logo: string;
  /** Official resort website — link target for clickable partner logos (spec §6.7). Empty until the client supplies it. */
  website?: string;
  /** "none" = logo is self-contained (transparent art or its own baked-in background) and renders with no wrapper. "dark" = logo needs a dark backdrop to be visible (light-on-transparent art). */
  logoBg: "none" | "dark";
  built: boolean;
  stayDates: LocalizedString;
  story: LocalizedList;
  keyFacts: {
    location: LocalizedString;
    villas: LocalizedString;
    facilities: LocalizedString;
  };
  gallery: { src: string; alt: string }[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "resorts");

/**
 * Resort data is loaded from content/resorts/*.json (one file per resort, filename
 * doesn't matter — the "slug" field does) rather than hardcoded here, so the content
 * portal can add/edit a resort by writing a JSON file with no code change required.
 */
function loadResorts(): Resort[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  const resorts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as Resort;
  });
  return resorts.sort((a, b) => a.order - b.order);
}

export const resorts: Resort[] = loadResorts();

export const getResort = (slug: string) =>
  resorts.find((resort) => resort.slug === slug);

export const t = (value: LocalizedString, locale: Locale) => value[locale];
export const tl = (value: LocalizedList, locale: Locale) => value[locale];
