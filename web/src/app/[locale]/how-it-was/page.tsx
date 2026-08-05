import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMeta";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/how-it-was", {
    title: dict.howItWasPage.banner.title,
    description: dict.howItWasPage.banner.body,
  });
}

export default async function HowItWasPage({
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
        kicker={dict.howItWasPage.banner.kicker}
        title={dict.howItWasPage.banner.title}
        intro={dict.howItWasPage.banner.body}
      />

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="rounded-3xl border border-dashed border-amethyst/20 bg-soft-lilac/40 px-8 py-16">
              <p className="font-display text-xl italic text-amethyst sm:text-2xl">
                {dict.howItWasPage.comingSoon.title}
              </p>
              <p className="mt-4 text-sm text-ink/70">
                {dict.howItWasPage.comingSoon.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {dict.howItWasPage.sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-dashed border-amethyst/20 bg-ivory/80 p-8">
                  <h2 className="font-display text-xl text-aubergine">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
