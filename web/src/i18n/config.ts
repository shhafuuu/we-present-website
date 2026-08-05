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

/**
 * `alternates` for one page's metadata, given its locale-independent path
 * ("/", "/about", "/tours/maldives-tour-1").
 *
 * Every page used to inherit the root layout's alternates, which name `/ru` and `/en`
 * literally — so `/ru/about` told search engines its English equivalent was the English
 * *homepage*. Lighthouse flags it as an invalid hreflang. The routes mirror each other
 * one-to-one across locales, so the correct alternate is always the same path under the
 * other prefix.
 *
 * `x-default` points at the default locale, and `canonical` at this page's own URL.
 */
export function localeAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = href(l, path);
  languages["x-default"] = href(defaultLocale, path);
  return { canonical: href(locale, path), languages };
}
