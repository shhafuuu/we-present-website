import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { tours, t } from "@/lib/tours";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function ToursTimeline({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="tours" className="bg-lavender-mist px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Kicker>{dict.home.tours.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            {dict.home.tours.title}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-4">
          {tours.map((tour, i) => {
            const card = (
              <div className="flex flex-col gap-3 rounded-2xl border border-amethyst/10 bg-ivory/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-5 sm:items-center">
                  <span className="font-display text-sm text-amethyst">
                    {tour.year}
                  </span>
                  <div className="h-10 w-px bg-amethyst/15" />
                  <div>
                    <h3 className="font-display text-xl text-aubergine sm:text-2xl">
                      {t(tour.name, locale)}
                    </h3>
                    <p className="mt-1 text-sm text-ink/70">
                      {tour.stops.length > 0
                        ? tour.stops.map((s) => s.label).join(" · ")
                        : dict.home.tours.datesComingSoon}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-[3.25rem] sm:pl-0">
                  <span
                    className={`kicker rounded-full px-4 py-1.5 text-[0.65rem] ${
                      tour.status === "confirmed"
                        ? "bg-amethyst/10 text-amethyst"
                        : "bg-gold/15 text-gold"
                    }`}
                  >
                    {t(tour.dates, locale)}
                  </span>
                </div>
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

        <Reveal delay={0.3} className="mt-14 flex flex-wrap justify-center gap-4">
          <Button href={href(locale, "/tours")} variant="ghost">
            {dict.home.tours.ctaFull}
          </Button>
          <Button href={href(locale, "/#resorts")} variant="ghost">
            {dict.home.tours.ctaResorts}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
