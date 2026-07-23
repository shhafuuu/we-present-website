import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Sparkle } from "@/components/Sparkle";
import {
  destinations,
  getDestination,
  getResortsForDestination,
  getToursForDestination,
  t as td,
} from "@/lib/destinations";
import { t as tr } from "@/lib/resorts";
import { t as tt } from "@/lib/tours";
import { href, isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function generateStaticParams() {
  const activeDestinations = destinations.filter((d) => d.status === "active");
  return locales.flatMap((locale) =>
    activeDestinations.map((destination) => ({ locale, slug: destination.slug }))
  );
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const destination = getDestination(slug);

  if (!destination || destination.status !== "active" || !destination.heroImage || !destination.intro) {
    notFound();
  }

  const destResorts = getResortsForDestination(destination.slug);
  const destTours = getToursForDestination(destination);

  return (
    <>
      <section className="relative flex h-[60vh] min-h-[440px] w-full items-end overflow-hidden">
        <Image
          src={destination.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/95 via-aubergine/50 to-aubergine/15" />
        {/* Same fixed-header protection as the resort hero template — the main
            gradient's own top opacity isn't reliable across different destination
            photos (confirmed live: nav measured 3.46:1 on the current Maldives
            photo despite the kicker passing comfortably). */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-aubergine/85 via-aubergine/35 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <Reveal>
            <p className="kicker inline-flex items-center gap-2.5 text-ivory [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
              <span className="h-px w-5 bg-ivory/60" />
              <Sparkle className="h-2.5 w-2.5 shrink-0" />
              {td(destination.intro.kicker, locale)}
            </p>
            <h1 className="font-display mt-4 text-5xl text-ivory sm:text-6xl">
              {td(destination.name, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80">
              {td(destination.intro.body, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      {destResorts.length > 0 && (
        <section className="bg-ivory px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <Kicker>{dict.destinationsPage.resortsHeading}</Kicker>
              <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
                {dict.destinationsPage.resortsTitle}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {destResorts.map((resort, i) => (
                <Reveal key={resort.slug} delay={i * 0.08}>
                  <Link
                    href={href(locale, `/resorts/${resort.slug}`)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amethyst/10 bg-soft-lilac/50 shadow-card transition-transform duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={resort.cardImage}
                        alt={resort.cardImageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aubergine/50 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="kicker text-amethyst">{tr(resort.atoll, locale)}</p>
                      <h3 className="font-display mt-2 text-xl text-aubergine">{resort.name}</h3>
                      <p className="mt-2 flex-1 text-sm text-ink/70">{tr(resort.tagline, locale)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {destTours.length > 0 && (
        <section className="bg-lavender-mist px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal className="text-center">
              <Kicker>{dict.destinationsPage.programmesHeading}</Kicker>
              <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
                {dict.destinationsPage.programmesTitle}
              </h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {destTours.map((tour, i) => {
                const card = (
                  <div
                    className={`flex flex-col gap-3 rounded-2xl border border-amethyst/10 bg-ivory/80 p-6 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${
                      tour.status === "confirmed" ? "hover:-translate-y-1 hover:shadow-md" : ""
                    }`}
                  >
                    <div>
                      <h3 className="font-display text-xl text-aubergine sm:text-2xl">
                        {tt(tour.name, locale)}
                      </h3>
                      <p className="mt-1 max-w-xl text-sm text-ink/70">{tt(tour.summary, locale)}</p>
                    </div>
                    <span
                      className={`kicker inline-block shrink-0 rounded-full px-4 py-1.5 text-[0.65rem] ${
                        tour.status === "confirmed" ? "bg-amethyst/10 text-amethyst" : "bg-gold/15 text-amethyst"
                      }`}
                    >
                      {tt(tour.dates, locale)}
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
        </section>
      )}

      <section className="border-t border-amethyst/10 bg-ivory px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href={href(locale, "/destinations")}
            className="kicker inline-flex min-h-11 items-center text-ink/70 hover:text-amethyst"
          >
            {dict.destinationsPage.backToAll}
          </Link>
        </div>
      </section>
    </>
  );
}
