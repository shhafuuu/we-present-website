import Image from "next/image";
import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Sparkle } from "@/components/Sparkle";
import { destinations, t } from "@/lib/destinations";
import { href, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function DestinationsPage({
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
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">{dict.destinationsPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {dict.destinationsPage.banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{dict.destinationsPage.banner.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, i) => {
              if (destination.status === "active" && destination.heroImage) {
                return (
                  <Reveal key={destination.slug} delay={i * 0.08}>
                    <Link
                      href={href(locale, `/destinations/${destination.slug}`)}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amethyst/10 bg-soft-lilac/50 shadow-card transition-transform duration-500 hover:-translate-y-2"
                    >
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={destination.heroImage}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/50 to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-display text-xl text-aubergine">
                          {t(destination.name, locale)}
                        </h2>
                        {destination.intro && (
                          <p className="mt-2 flex-1 text-sm text-ink/70">
                            {t(destination.intro.body, locale)}
                          </p>
                        )}
                        <span className="kicker mt-5 inline-flex items-center gap-2 text-[0.7rem] text-amethyst">
                          {dict.home.resorts.explore}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              }

              return (
                <Reveal key={destination.slug} delay={i * 0.08}>
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amethyst/15 bg-ivory/50 p-10 text-center">
                    <Sparkle className="h-4 w-4 text-gold" />
                    <h2 className="font-display text-xl text-aubergine">
                      {t(destination.name, locale)}
                    </h2>
                    <p className="text-sm text-ink/70">{dict.destinationsPage.comingSoon.body}</p>
                    <span className="kicker inline-block shrink-0 rounded-full bg-gold/15 px-4 py-1.5 text-[0.65rem] text-amethyst">
                      {dict.destinationsPage.comingSoon.badge}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
