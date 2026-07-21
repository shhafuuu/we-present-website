import Image from "next/image";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { resorts } from "@/lib/resorts";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function PartnersStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="partners" className="border-t border-amethyst/10 bg-soft-lilac/60 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <Kicker>{dict.home.partners.kicker}</Kicker>
          <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
            {dict.home.partners.title}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {resorts.map((resort) => {
              const logo = (
                <div
                  className={`relative h-16 w-36 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 sm:h-20 sm:w-44 ${
                    resort.logoBg === "dark" ? "rounded-xl bg-aubergine p-3" : ""
                  }`}
                >
                  <Image
                    src={resort.logo}
                    alt={resort.name}
                    fill
                    sizes="176px"
                    className={`object-contain ${resort.logoBg === "none" ? "opacity-80 group-hover:opacity-100" : ""}`}
                  />
                </div>
              );

              return resort.website ? (
                <a
                  key={resort.slug}
                  href={resort.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                  aria-label={resort.name}
                >
                  {logo}
                </a>
              ) : (
                <div key={resort.slug} className="group">
                  {logo}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-14">
          <Button href={href(locale, "/partners")} variant="ghost">
            {dict.home.partners.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
