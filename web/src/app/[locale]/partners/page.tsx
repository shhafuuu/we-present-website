import Image from "next/image";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { resorts, t } from "@/lib/resorts";
import { href, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function PartnersPage({
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
            <Kicker tone="ivory">{dict.partnersPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              {dict.partnersPage.banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{dict.partnersPage.banner.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Kicker>{dict.partnersPage.resortPartners.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.partnersPage.resortPartners.title}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {resorts.map((resort, i) => (
              <Reveal key={resort.slug} delay={i * 0.08}>
                <div className="flex gap-6 rounded-2xl bg-lavender-mist/40 p-6">
                  <div
                    className={`flex h-20 w-32 shrink-0 items-center justify-center rounded-xl p-4 ${
                      resort.logoBg === "dark" ? "bg-aubergine" : "bg-ivory"
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={resort.logo}
                        alt={resort.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-aubergine">
                      {resort.name}
                    </h3>
                    <p className="kicker mt-1 text-amethyst/60">{t(resort.atoll, locale)}</p>
                    <p className="mt-2 text-sm text-ink/60">{t(resort.tagline, locale)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker>{dict.partnersPage.associated.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.partnersPage.associated.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-2xl bg-ivory p-10">
              <p className="kicker text-gold">{dict.partnersPage.associated.badge}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {dict.partnersPage.associated.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker>{dict.partnersPage.forHotels.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.partnersPage.forHotels.title}
            </h2>
            <p className="mt-6 text-ink/70">{dict.partnersPage.forHotels.body}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Button href={href(locale, "/contact")} variant="primary">
              {dict.partnersPage.forHotels.cta}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
