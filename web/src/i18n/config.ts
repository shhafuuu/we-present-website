export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the given locale, e.g. href("ru", "/tours") -> "/ru/tours" */
export function href(locale: Locale, path: string) {
  if (path.startsWith("#")) return path;
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
