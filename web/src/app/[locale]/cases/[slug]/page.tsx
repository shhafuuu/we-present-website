import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { casesWithDetail, getCase, t } from "@/lib/cases";
import { getCasesSettings } from "@/lib/settings";
import { href, isLocale, defaultLocale, locales, localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

/** Only cases carrying detail copy get a page. The index does not link the others, so
 *  a half-written case never ships a dead route. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    casesWithDetail.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return { alternates: localeAlternates(locale, `/cases/${slug}`) };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const item = getCase(slug);

  if (!item || !item.description) notFound();

  const settings = getCasesSettings();

  return (
    <>
      <PageBanner
        kicker={dict.about.cases.filters[item.category]}
        title={t(item.partner, locale)}
        meta={item.headlineMetric ? item.headlineMetric.value : undefined}
        intro={t(item.summary, locale)}
        width="4xl"
      />

      <section className="bg-ivory px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-base leading-relaxed text-ink/70">
              {t(item.description, locale)}
            </p>
          </Reveal>

          {item.activities?.length ? (
            <div className="mt-16">
              <Reveal>
                <Kicker>{dict.casePage.activities}</Kicker>
              </Reveal>
              <ul className="mt-6">
                {item.activities.map((a, i) => (
                  <li key={i} className="border-t border-amethyst/15 last:border-b">
                    <Reveal delay={i * 0.06} y={14}>
                      <p className="py-3.5 text-sm leading-relaxed text-ink/70">
                        {t(a, locale)}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {item.results?.length ? (
            <div className="mt-16">
              <Reveal>
                <Kicker>{dict.casePage.results}</Kicker>
              </Reveal>
              <ul className="mt-6">
                {item.results.map((r, i) => (
                  <li key={i} className="border-t border-amethyst/15 last:border-b">
                    <Reveal delay={i * 0.06} y={14}>
                      <p className="py-3.5 text-sm leading-relaxed text-aubergine">
                        {t(r, locale)}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {item.quote ? (
            <Reveal delay={0.1}>
              {/* Paraphrased, never quoted verbatim: the source is private partner
                  correspondence. The attribution says so explicitly. */}
              <figure className="mt-16 border-l-2 border-gold pl-6">
                <blockquote className="font-display text-lg italic leading-relaxed text-aubergine sm:text-xl">
                  {t(item.quote.text, locale)}
                </blockquote>
                <figcaption className="kicker mt-4 text-ink/70">
                  {t(item.quote.attribution, locale)}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}

          <Reveal delay={0.15}>
            <p className="mt-16 border-t border-amethyst/15 pt-8 text-sm text-ink/70">
              {settings.attribution[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            {/* Back-link returns to the index with this case's category preselected. */}
            <Link
              href={href(locale, `/about?case=${item.category}#cases`)}
              className="kicker text-amethyst underline-offset-4 transition-colors hover:text-aubergine hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amethyst"
            >
              &larr; {dict.casePage.back}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl text-aubergine sm:text-3xl">
              {dict.casePage.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Button href={href(locale, "/register")} variant="primary">
              {dict.casePage.cta}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
