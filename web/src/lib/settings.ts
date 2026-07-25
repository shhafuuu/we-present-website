import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };

export type HomeSettings = {
  intro: {
    kicker: LocalizedString;
    body: LocalizedString;
  };
};

export type IncludedItem = { icon: string; label: LocalizedString };

export type ToursSettings = {
  included: {
    items: IncludedItem[];
    notes: LocalizedString;
  };
  onSiteProgram: {
    title: LocalizedString;
    items: LocalizedString[];
  };
};

const HOME_SETTINGS_FILE = path.join(process.cwd(), "content", "settings", "home.json");
const TOURS_SETTINGS_FILE = path.join(process.cwd(), "content", "settings", "tours.json");

/**
 * Home-page content-portal-editable fields (spec §9.2: "home-page intro, teasers
 * and CTAs where content-driven") live in content/settings/home.json rather than
 * the i18n dictionaries, since those are UI chrome, not portal-managed content.
 */
export function getHomeSettings(): HomeSettings {
  const raw = fs.readFileSync(HOME_SETTINGS_FILE, "utf8");
  return JSON.parse(raw) as HomeSettings;
}

/**
 * The participation package ("What's Included") and on-site programme are the
 * same across every tour, not tour-specific — they used to live on each tour's
 * own JSON (spec v2.0 §7.1/7.2) and rendered on that tour's detail page, but
 * that read as oddly TTM-Tour-2-specific for content that applies to any trip.
 * Moved here so it renders once, on the tours overview page.
 */
export function getToursSettings(): ToursSettings {
  const raw = fs.readFileSync(TOURS_SETTINGS_FILE, "utf8");
  return JSON.parse(raw) as ToursSettings;
}

export const t = (value: LocalizedString, locale: Locale) => value[locale];
