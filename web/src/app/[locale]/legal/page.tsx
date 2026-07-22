import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function LegalPage({
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
            <Kicker tone="ivory">{dict.legalPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {dict.legalPage.banner.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-2xl border border-gold/40 bg-soft-gold/25 px-6 py-5 text-sm leading-relaxed text-ink/70">
              {dict.legalPage.draftNotice}
            </div>
          </Reveal>

          <div className="mt-14 space-y-12">
            {dict.legalPage.sections.map((section, i) => (
              <Reveal key={section.title} delay={Math.min(i * 0.05, 0.3)}>
                <h2 className="font-display text-2xl text-aubergine">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink/70">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
