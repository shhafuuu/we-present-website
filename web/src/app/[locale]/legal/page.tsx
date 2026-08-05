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
  return pageMetadata(locale, "/legal", { title: dict.legalPage.banner.title });
}

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
      <PageBanner
        kicker={dict.legalPage.banner.kicker}
        title={dict.legalPage.banner.title}
      />

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
