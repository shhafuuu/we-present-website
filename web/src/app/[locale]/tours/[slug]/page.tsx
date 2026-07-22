import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { getTour, tours, t } from "@/lib/tours";
import { href, isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function generateStaticParams() {
  const confirmedTours = tours.filter((tour) => tour.status === "confirmed");
  return locales.flatMap((locale) =>
    confirmedTours.map((tour) => ({ locale, slug: tour.slug }))
  );
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const tour = getTour(slug);

  if (!tour || tour.status !== "confirmed") {
    notFound();
  }

  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker tone="ivory">{t(tour.destination, locale)}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {t(tour.name, locale)}
            </h1>
            <p className="mt-4 text-sm text-ivory/60">{t(tour.dates, locale)}</p>
            <p className="mt-6 text-ivory/70">{t(tour.summary, locale)}</p>
          </Reveal>
        </div>
      </section>

      {tour.ttmOverview && (
        <section className="bg-soft-lilac/40 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="sr-only">{dict.tourDetail.ttmKicker}</h2>
              <Kicker>{dict.tourDetail.ttmKicker}</Kicker>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                {t(tour.ttmOverview, locale)}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Kicker>{dict.tourDetail.itineraryKicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.tourDetail.itineraryTitle}
            </h2>
          </Reveal>

          <div className="mt-14 space-y-10 border-l border-amethyst/15 pl-8">
            {tour.stops.map((stop, i) => (
              <Reveal key={i} delay={i * 0.08} className="relative">
                <span className="absolute -left-[2.55rem] top-1.5 h-3 w-3 rounded-full bg-gold" />
                <p className="kicker text-amethyst">{t(stop.dates, locale)}</p>
                <h3 className="font-display mt-2 text-xl text-aubergine">
                  {stop.resortSlug ? (
                    <Link
                      href={href(locale, `/resorts/${stop.resortSlug}`)}
                      className="hover:text-amethyst"
                    >
                      {stop.label}
                    </Link>
                  ) : (
                    stop.label
                  )}
                </h3>
                <p className="mt-1 text-sm text-ink/70">{t(stop.note, locale)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-amethyst/10 bg-ivory px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href={href(locale, "/tours")}
            className="inline-flex min-h-11 items-center text-sm text-amethyst hover:text-aubergine"
          >
            {dict.tourDetail.backToAll}
          </Link>
        </div>
      </section>
    </>
  );
}
