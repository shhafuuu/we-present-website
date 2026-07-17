import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

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
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">{dict.howItWasPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              {dict.howItWasPage.banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{dict.howItWasPage.banner.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="rounded-3xl border border-dashed border-amethyst/20 bg-lavender-mist/30 px-8 py-16">
              <p className="font-display text-xl italic text-amethyst sm:text-2xl">
                {dict.howItWasPage.comingSoon.title}
              </p>
              <p className="mt-4 text-sm text-ink/60">
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
                <div className="rounded-2xl border border-dashed border-amethyst/20 bg-ivory/60 p-8">
                  <h2 className="font-display text-xl text-aubergine">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
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
