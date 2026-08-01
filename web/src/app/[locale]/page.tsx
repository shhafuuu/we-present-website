import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { DifferenceSection } from "@/components/home/DifferenceSection";
import { ToursTimeline } from "@/components/home/ToursTimeline";
import { ResortsGrid } from "@/components/home/ResortsGrid";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { HowItWas } from "@/components/home/HowItWas";
import { RegisterBand } from "@/components/home/RegisterBand";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <Hero locale={locale} />
      <IntroSection locale={locale} />
      <ConceptSection locale={locale} />
      <DifferenceSection locale={locale} />
      <ToursTimeline locale={locale} />
      <ResortsGrid locale={locale} />
      <HowItWas locale={locale} />
      <PartnersStrip locale={locale} />
      <RegisterBand locale={locale} />
    </>
  );
}
