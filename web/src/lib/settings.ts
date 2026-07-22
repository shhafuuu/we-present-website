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

const HOME_SETTINGS_FILE = path.join(process.cwd(), "content", "settings", "home.json");

/**
 * Home-page content-portal-editable fields (spec §9.2: "home-page intro, teasers
 * and CTAs where content-driven") live in content/settings/home.json rather than
 * the i18n dictionaries, since those are UI chrome, not portal-managed content.
 */
export function getHomeSettings(): HomeSettings {
  const raw = fs.readFileSync(HOME_SETTINGS_FILE, "utf8");
  return JSON.parse(raw) as HomeSettings;
}

export const t = (value: LocalizedString, locale: Locale) => value[locale];
