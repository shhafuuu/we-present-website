import type { Metadata } from "next";
import { Kicker } from "@/components/Kicker";
import { PartnerLogo } from "@/components/PartnerLogo";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { resorts, t } from "@/lib/resorts";
import { href, isLocale, defaultLocale, localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return { alternates: localeAlternates(locale, "/partners") };
}

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
      <PageBanner
        kicker={dict.partnersPage.banner.kicker}
        title={dict.partnersPage.banner.title}
        intro={dict.partnersPage.banner.body}
      />

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="container-wide">
          <Reveal className="text-center">
            <Kicker>{dict.partnersPage.resortPartners.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.partnersPage.resortPartners.title}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 [--logo-base:72px] [--logo-max-w:240px] sm:grid-cols-2 sm:[--logo-base:88px] sm:[--logo-max-w:200px]">
            {resorts.map((resort, i) => {
              // Stacks on mobile: SO/ Maldives is a 9.4:1 wordmark, and beside it in a
              // row at 390px there is no usable width left for the card's text.
              const cardClassName =
                "flex h-full min-h-[240px] flex-col items-start gap-6 rounded-2xl border border-amethyst/10 bg-soft-lilac/50 p-6 shadow-card transition-transform duration-500 sm:min-h-0 sm:flex-row";
              const content = (
                <>
                  {/* Fixed-width, fixed-height column. The logos range from a stacked
                      emblem to a 9.4:1 wordmark, and sizing each to its own width made
                      every card's text start at a different x. */}
                  <div className="flex w-full shrink-0 items-center sm:h-[88px] sm:w-[200px]">
                    <PartnerLogo resort={resort} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-aubergine">
                      {resort.name}
                    </h3>
                    <p className="kicker mt-1 text-amethyst">{t(resort.atoll, locale)}</p>
                    <p className="mt-2 text-sm text-ink/70">{t(resort.tagline, locale)}</p>
                  </div>
                </>
              );

              return (
                <Reveal key={resort.slug} delay={i * 0.08}>
                  {resort.website ? (
                    <a
                      href={resort.website}
                      target="_blank"
                      rel="noreferrer"
                      className={`${cardClassName} hover:-translate-y-1`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={cardClassName}>{content}</div>
                  )}
                </Reveal>
              );
            })}
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
            <a
              href="https://www.traveltrademaldives.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-10 block rounded-2xl bg-ivory p-10 text-left transition-transform duration-500 hover:-translate-y-1"
            >
              <p className="kicker text-amethyst">{dict.partnersPage.associated.badge}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {dict.partnersPage.associated.body}
              </p>
            </a>
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
            <Button href={href(locale, "/become-a-partner")} variant="primary">
              {dict.partnersPage.forHotels.cta}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
