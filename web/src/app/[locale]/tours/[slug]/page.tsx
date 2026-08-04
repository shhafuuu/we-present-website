import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { getTour, tours, hasDetailPage, groupByTier, t } from "@/lib/tours";
import { availableProgrammePdfs } from "@/lib/programmePdf";
import { ProgrammePdfGate } from "@/components/ProgrammePdfGate";
import { href, isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function generateStaticParams() {
  // Not just confirmed tours: a pending tour with a named line-up (Cinnamon) has
  // real content to show even though its dates are not set.
  const withPages = tours.filter(hasDetailPage);
  return locales.flatMap((locale) =>
    withPages.map((tour) => ({ locale, slug: tour.slug }))
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

  if (!tour || !hasDetailPage(tour)) {
    notFound();
  }

  // Localised on the server so the client gate ships plain strings.
  const pdfOptions = availableProgrammePdfs(tour).map((entry) => ({
    file: entry.file,
    label: t(entry.label, locale),
  }));

  return (
    <>
      <PageBanner
        kicker={t(tour.destination, locale)}
        title={t(tour.name, locale)}
        meta={t(tour.dates, locale)}
        intro={t(tour.summary, locale)}
        width="4xl"
      />

      {/* Deliberately outside the itinerary below. TTM is not part of the tour, and a
          row inside a dated sequence reads as included no matter what the copy says. */}
      {tour.ttmOverview && (
        <section className="bg-soft-lilac/40 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="sr-only">{dict.tourDetail.ttmKicker}</h2>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <Kicker>{dict.tourDetail.ttmKicker}</Kicker>
                <span className="kicker rounded-full bg-amethyst/10 px-3 py-1 text-[0.6rem] text-amethyst">
                  {dict.tourDetail.ttmOptional}
                </span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                {t(tour.ttmOverview, locale)}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Named line-up for a tour whose dates are not confirmed. Per the client's
          instruction the star ratings are two visually separate groups with their own
          subheadings, not one mixed grid. */}
      {tour.properties?.length ? (
        <section className="bg-ivory px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <Kicker>{dict.tourDetail.propertiesKicker}</Kicker>
              <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
                {dict.tourDetail.propertiesTitle}
              </h2>
            </Reveal>

            <div className="mt-14 space-y-12">
              {groupByTier(tour.properties).map((group) => (
                <div key={group.tier ?? "untiered"}>
                  {group.tier ? (
                    <Reveal>
                      <h3 className="kicker border-b border-amethyst/15 pb-3 text-amethyst">
                        {dict.tourDetail.tiers[group.tier] ?? group.tier}
                      </h3>
                    </Reveal>
                  ) : null}
                  <ul>
                    {group.items.map((property, i) => (
                      <li
                        key={property.name}
                        className="border-b border-amethyst/15 first:border-t-0"
                      >
                        <Reveal delay={i * 0.06} y={14}>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-4">
                            <p className="font-display text-lg text-aubergine">
                              {property.name}
                            </p>
                            {property.badge ? (
                              <span className="kicker rounded-full bg-amethyst/10 px-3 py-1 text-[0.6rem] text-amethyst">
                                {t(property.badge, locale)}
                              </span>
                            ) : null}
                          </div>
                          {/* Descriptions are written separately and added through the
                              portal. Guarded so an empty one renders nothing. */}
                          {property.description ? (
                            <p className="-mt-1 pb-4 text-sm leading-relaxed text-ink/70">
                              {t(property.description, locale)}
                            </p>
                          ) : null}
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {tour.stops.length > 0 && (
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
                {/* Guarded: a stop with no note renders nothing rather than an empty
                    paragraph. Lets content leave a note blank instead of filling it
                    with a placeholder, per the no-invented-content guardrail. */}
                {t(stop.note, locale).trim() && (
                  <p className="mt-1 text-sm text-ink/70">{t(stop.note, locale)}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* No PDF on disk, no block. A tour whose file has not arrived yet shows nothing
          rather than a form that would take an email and then fail. */}
      {pdfOptions.length > 0 && (
        <section className="bg-lavender-mist px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <ProgrammePdfGate
              locale={locale}
              tourSlug={tour.slug}
              options={pdfOptions}
            />
          </div>
        </section>
      )}

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
