import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMeta";
import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { INCLUDED_ICONS, TicketIcon } from "@/components/IncludedIcons";
import { tours, hasDetailPage, isWorkshop, t } from "@/lib/tours";
import { getToursSettings } from "@/lib/settings";
import { href, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

const byYear = tours.reduce<Record<string, typeof tours>>((acc, tour) => {
  acc[tour.year] = [...(acc[tour.year] ?? []), tour];
  return acc;
}, {});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/tours", {
    title: dict.toursPage.banner.title,
    description: dict.toursPage.banner.body,
  });
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const toursSettings = getToursSettings();

  return (
    <>
      <PageBanner
        kicker={dict.toursPage.banner.kicker}
        title={dict.toursPage.banner.title}
        intro={dict.toursPage.banner.body}
        width="5xl"
      />

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-16">
          {Object.entries(byYear).map(([year, yearTours]) => (
            <div key={year}>
              <Reveal>
                <h2 className="font-display text-2xl text-amethyst">{year}</h2>
              </Reveal>
              <div className="mt-6 space-y-4">
                {yearTours.map((tour, i) => {
                  const card = (
                    <div
                      className={`flex flex-col gap-3 rounded-2xl border border-amethyst/10 bg-ivory/80 p-6 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${
                        hasDetailPage(tour) ? "hover:-translate-y-1 hover:shadow-md" : ""
                      }`}
                    >
                      <div>
                        {/* Quiet differentiator so a workshop does not read as a
                            destination tour. A category label, not a NEW badge. */}
                        {isWorkshop(tour) ? (
                          <p className="kicker mb-1 text-[0.6rem] text-amethyst">
                            {dict.tourDetail.workshopLabel}
                            {tour.location ? ` · ${t(tour.location, locale)}` : ""}
                          </p>
                        ) : null}
                        <h3 className="font-display text-xl text-aubergine sm:text-2xl">
                          {t(tour.name, locale)}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm text-ink/70">
                          {t(tour.summary, locale)}
                        </p>
                      </div>
                      <span
                        className={`kicker inline-block shrink-0 rounded-full px-4 py-1.5 text-[0.65rem] ${
                          tour.status === "confirmed"
                            ? "bg-amethyst/10 text-amethyst"
                            : "bg-gold/15 text-amethyst"
                        }`}
                      >
                        {t(tour.dates, locale)}
                      </span>
                    </div>
                  );

                  return (
                    <Reveal key={tour.slug} delay={i * 0.08}>
                      {hasDetailPage(tour) ? (
                        <Link href={href(locale, `/tours/${tour.slug}`)} className="block">
                          {card}
                        </Link>
                      ) : (
                        card
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <Reveal>
              <h2 className="font-display text-2xl text-amethyst">2027</h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-6">
              <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-amethyst/15 bg-ivory/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h3 className="font-display text-xl text-aubergine sm:text-2xl">
                    {dict.toursPage.comingSoon2027.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">
                    {dict.toursPage.comingSoon2027.body}
                  </p>
                </div>
                <span className="kicker inline-block shrink-0 rounded-full bg-gold/15 px-4 py-1.5 text-[0.65rem] text-amethyst">
                  {dict.toursPage.comingSoon2027.badge}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker>{dict.tourDetail.includedKicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.tourDetail.includedTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {toursSettings.included.items.map((item, i) => {
              const Icon = INCLUDED_ICONS[item.icon] ?? TicketIcon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex flex-col items-center gap-3">
                    <Icon className="h-8 w-8 text-amethyst" />
                    <p className="text-sm text-ink/70">{t(item.label, locale)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-ink/70">
              {t(toursSettings.included.notes, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hairline-ruled list, not cards (v2.1 §4.2): six equal cards each carrying the
          same sparkle read as six separate things and stacked very tall on mobile. The
          chrome and the repeated icon are gone so the block reads as one unit; the
          section's single accent is the Kicker's own sparkle. */}
      <section className="bg-soft-lilac/40 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <Kicker>{dict.tourDetail.onSiteKicker}</Kicker>
            <h2 className="font-display mt-4 text-3xl text-aubergine sm:text-4xl">
              {t(toursSettings.onSiteProgram.title, locale)}
            </h2>
          </Reveal>
          <ul className="mt-8 text-left">
            {toursSettings.onSiteProgram.items.map((item, i) => (
              <li key={i} className="border-t border-amethyst/15 last:border-b">
                <Reveal delay={i * 0.06} y={16}>
                  <p className="py-3.5 text-sm leading-relaxed text-ink/70">
                    {t(item, locale)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
