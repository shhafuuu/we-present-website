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

/** `enabled: false` keeps an item in the portal, switched off, without deleting it.
 *  Used for the registration fee: round 4 removed it from the package, but a future
 *  edition may charge one, so the editor can switch it back on rather than retype it.
 *  Absent means enabled — existing items don't need the flag. */
export type IncludedItem = { icon: string; label: LocalizedString; enabled?: boolean };

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

export type CasesSettings = {
  /** Client-agreed wording. Every case carries it: these are COATI results, not
   *  We Present results, and the site must not present them as the latter. */
  attribution: LocalizedString;
  /** Exactly three. Beyond that each number loses impact, so the render caps it. */
  /** `animate: false` shows the figure without counting up. A year counting from
   *  zero reads as a clock, not a credential. */
  stats: { value: string; label: LocalizedString; animate?: boolean }[];
};

const HOME_SETTINGS_FILE = path.join(process.cwd(), "content", "settings", "home.json");
const CASES_SETTINGS_FILE = path.join(process.cwd(), "content", "settings", "cases.json");
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
  const settings = JSON.parse(raw) as ToursSettings;
  return {
    ...settings,
    included: {
      ...settings.included,
      items: settings.included.items.filter((item) => item.enabled !== false),
    },
  };
}

export function getCasesSettings(): CasesSettings {
  const raw = fs.readFileSync(CASES_SETTINGS_FILE, "utf8");
  const settings = JSON.parse(raw) as CasesSettings;
  // Three is the ceiling per v2.1 section 2.2, enforced here rather than trusting the
  // portal, so a fourth entry degrades the rail instead of breaking its layout.
  return { ...settings, stats: settings.stats.slice(0, 3) };
}

export const t = (value: LocalizedString, locale: Locale) => value[locale];
