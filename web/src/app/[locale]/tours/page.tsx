import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { tours, t } from "@/lib/tours";
import { href, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

const byYear = tours.reduce<Record<string, typeof tours>>((acc, tour) => {
  acc[tour.year] = [...(acc[tour.year] ?? []), tour];
  return acc;
}, {});

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Kicker tone="ivory">{dict.toursPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              {dict.toursPage.banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{dict.toursPage.banner.body}</p>
          </Reveal>
        </div>
      </section>

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
                        tour.status === "confirmed" ? "hover:-translate-y-1 hover:shadow-md" : ""
                      }`}
                    >
                      <div>
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
                      {tour.status === "confirmed" ? (
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
    </>
  );
}
