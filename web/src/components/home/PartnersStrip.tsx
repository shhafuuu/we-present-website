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
    <section id="partners" className="bg-soft-lilac/40 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <Kicker>{dict.home.partners.kicker}</Kicker>
          <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
            {dict.home.partners.title}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {resorts.map((resort) => (
              <div
                key={resort.slug}
                className={`relative h-14 w-32 shrink-0 transition-transform duration-500 hover:-translate-y-1 sm:h-16 sm:w-36 ${
                  resort.logoBg === "dark" ? "rounded-xl bg-aubergine p-2" : ""
                }`}
              >
                <Image
                  src={resort.logo}
                  alt={resort.name}
                  fill
                  className={`object-contain ${resort.logoBg === "none" ? "opacity-80 hover:opacity-100" : ""}`}
                />
              </div>
            ))}
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
