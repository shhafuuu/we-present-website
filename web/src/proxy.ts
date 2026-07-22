import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - the content-portal admin UI (public/admin/index.html — a static file with
     *   no extension in its URL, so it isn't caught by the .* extension exclusion
     *   below; it must stay locale-prefix-free like /api does)
     * - Next.js internals (_next/static, _next/image)
     * - public files (anything with a file extension, e.g. favicon.ico, images)
     */
    "/((?!api|admin|_next/static|_next/image|.*\\..*).*)",
  ],
};
