import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import {
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF,
  INSTAGRAM_HREF,
  LINKEDIN_HREF,
} from "@/lib/contact";
import { LogoLockup } from "@/components/Logo";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer id="contact" className="bg-aubergine text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* The footer has room for the full lockup, wordmark and all. */}
            <LogoLockup
              aria-label="WePresent by COATI"
              className="h-24 w-auto text-ivory"
            />
            <p className="mt-4 max-w-[220px] text-sm text-soft-lilac">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <Kicker tone="gold">{dict.footer.explore}</Kicker>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li><Link href={href(locale, "/about")} className="hover:text-ivory">{dict.nav.about}</Link></li>
              <li><Link href={href(locale, "/tours")} className="hover:text-ivory">{dict.nav.tours}</Link></li>
              <li><Link href={href(locale, "/destinations")} className="hover:text-ivory">{dict.nav.destinations}</Link></li>
              <li><Link href={href(locale, "/partners")} className="hover:text-ivory">{dict.nav.partners}</Link></li>
              <li><Link href={href(locale, "/how-it-was")} className="hover:text-ivory">{dict.nav.howItWas}</Link></li>
            </ul>
          </div>

          <div>
            <Kicker tone="gold">{dict.footer.contact}</Kicker>
            {/* No email until the production address exists (v2.1 section 6). The
                placeholder was never confirmed, so it is not presented as final. */}
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li>
                <a href={PHONE_HREF} className="hover:text-ivory">
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory"
                >
                  {dict.footer.whatsapp}
                </a>
              </li>
              <li className="text-soft-lilac/70">{dict.footer.emailTbc}</li>
              <li className="text-soft-lilac/70">{dict.footer.officeTbc}</li>
            </ul>
          </div>

          <div>
            <Kicker tone="gold">{dict.footer.follow}</Kicker>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li>
                <a
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory"
                >
                  {dict.footer.instagramHandle}
                </a>
              </li>
              {/* Added alongside Instagram, not replacing it. */}
              <li>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory"
                >
                  {dict.footer.linkedinLabel}
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <Kicker tone="gold">{dict.footer.parentBrand}</Kicker>
            </div>
            <a
              href="https://coatitravel.ru"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-soft-lilac hover:text-ivory"
            >
              {dict.footer.projectByCoati}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-soft-lilac/70 sm:flex-row">
          <p>{dict.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href={href(locale, "/legal")} className="hover:text-ivory">
              {dict.footer.privacyPolicy}
            </Link>
            <span>EN / RU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
