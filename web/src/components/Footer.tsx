import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer id="contact" className="bg-aubergine text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logos/wp-monogram-white.png"
              alt="We Present monogram"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="mt-4 max-w-[220px] text-sm text-soft-lilac">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <p className="kicker text-gold">{dict.footer.explore}</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li><Link href={href(locale, "/about")} className="hover:text-ivory">{dict.nav.about}</Link></li>
              <li><Link href={href(locale, "/tours")} className="hover:text-ivory">{dict.nav.tours}</Link></li>
              <li><Link href={href(locale, "/#resorts")} className="hover:text-ivory">{dict.nav.resorts}</Link></li>
              <li><Link href={href(locale, "/partners")} className="hover:text-ivory">{dict.nav.partners}</Link></li>
              <li><Link href={href(locale, "/how-it-was")} className="hover:text-ivory">{dict.nav.howItWas}</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker text-gold">{dict.footer.contact}</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li>{dict.footer.email}</li>
              <li className="text-soft-lilac/70">{dict.footer.phoneTbc}</li>
              <li className="text-soft-lilac/70">{dict.footer.officeTbc}</li>
            </ul>
          </div>

          <div>
            <p className="kicker text-gold">{dict.footer.follow}</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li className="text-soft-lilac/70">{dict.footer.instagramTbc}</li>
            </ul>
            <p className="kicker mt-8 text-gold">{dict.footer.parentBrand}</p>
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
