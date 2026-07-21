import Image from "next/image";
import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { resorts, t } from "@/lib/resorts";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function ResortsGrid({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="resorts" className="border-t border-amethyst/10 bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <Kicker>{dict.home.resorts.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            {dict.home.resorts.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {resorts.map((resort, i) => {
            const card = (
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amethyst/10 bg-soft-lilac/50 shadow-[0_1px_2px_rgba(62,44,85,0.06)] transition-transform duration-500 hover:-translate-y-2">
                <div className="relative h-64 w-full overflow-hidden">
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
                  <p className="kicker text-amethyst">{t(resort.atoll, locale)}</p>
                  <h3 className="font-display mt-2 text-xl text-aubergine">
                    {resort.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink/70">
                    {t(resort.tagline, locale)}
                  </p>
                  <span
                    className={`kicker mt-5 inline-flex items-center gap-2 text-[0.7rem] ${
                      resort.built
                        ? "text-amethyst"
                        : "text-ink/70"
                    }`}
                  >
                    {resort.built ? dict.home.resorts.explore : dict.home.resorts.comingSoon}
                  </span>
                </div>
              </div>
            );

            return (
              <Reveal key={resort.slug} delay={i * 0.08}>
                {resort.built ? (
                  <Link href={href(locale, `/resorts/${resort.slug}`)} className="block h-full">
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
  );
}
