import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { InquiryForm } from "@/components/InquiryForm";
import { ResortHeroMedia } from "@/components/ResortHeroMedia";
import { getResort, resorts, t, tl } from "@/lib/resorts";
import { href, isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function generateStaticParams() {
  const builtResorts = resorts.filter((r) => r.built);
  return locales.flatMap((locale) =>
    builtResorts.map((resort) => ({ locale, slug: resort.slug }))
  );
}

export default async function ResortPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const resort = getResort(slug);

  if (!resort || !resort.built) {
    notFound();
  }

  const builtResorts = resorts.filter((r) => r.built);
  const index = builtResorts.findIndex((r) => r.slug === slug);
  const previous = builtResorts[(index - 1 + builtResorts.length) % builtResorts.length];
  const next = builtResorts[(index + 1) % builtResorts.length];

  return (
    <>
      <section className="relative flex h-[75vh] min-h-[560px] w-full items-end overflow-hidden">
        <ResortHeroMedia
          heroVideo={resort.heroVideo}
          heroImage={resort.heroImage}
          alt={resort.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-aubergine/15 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <Reveal>
            <p className="kicker text-ivory [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">{t(resort.atoll, locale)}</p>
            <h1 className="font-display mt-4 text-5xl text-ivory sm:text-6xl">
              {resort.name}
            </h1>
            <p className="mt-4 text-sm text-ivory/70">{t(resort.stayDates, locale)}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Kicker>{dict.resortPage.story}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {t(resort.tagline, locale)}
            </h2>
            {tl(resort.story, locale).map((paragraph, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed text-ink/70 ${i === 0 ? "mt-6" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl bg-soft-lilac/40 p-8">
              <h2 className="sr-only">{dict.resortPage.keyFacts}</h2>
              <Kicker>{dict.resortPage.keyFacts}</Kicker>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="kicker text-amethyst">{dict.resortPage.location}</dt>
                  <dd className="mt-1 text-ink/70">{t(resort.keyFacts.location, locale)}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst">{dict.resortPage.villas}</dt>
                  <dd className="mt-1 text-ink/70">{t(resort.keyFacts.villas, locale)}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst">{dict.resortPage.facilities}</dt>
                  <dd className="mt-1 text-ink/70">{t(resort.keyFacts.facilities, locale)}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst">{dict.resortPage.officialWebsite}</dt>
                  <dd className="mt-1 text-ink/70">{dict.resortPage.officialWebsiteTbc}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>{dict.resortPage.gallery}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.resortPage.lifeAt} {resort.name}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Gallery images={resort.gallery} />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <InquiryForm resortName={resort.name} locale={locale} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-amethyst/10 bg-ivory px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <Link
            href={href(locale, `/resorts/${previous.slug}`)}
            className="inline-flex min-h-11 items-center text-amethyst hover:text-aubergine"
          >
            ← {previous.name}
          </Link>
          <Link
            href={href(locale, "/#resorts")}
            className="kicker inline-flex min-h-11 items-center text-ink/70 hover:text-amethyst"
          >
            {dict.resortPage.allResorts}
          </Link>
          <Link
            href={href(locale, `/resorts/${next.slug}`)}
            className="inline-flex min-h-11 items-center text-amethyst hover:text-aubergine"
          >
            {next.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
