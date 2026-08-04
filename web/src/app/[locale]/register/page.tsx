import { Suspense } from "react";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { RegisterForm } from "@/components/RegisterForm";
import { RegisterEnContactBlock } from "@/components/RegisterEnContactBlock";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { tours, isWorkshop, t } from "@/lib/tours";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  // Spec §8.6 (round 2): RU keeps the full agent-registration form; EN shows a
  // simple contact block instead, since the EN audience is partner outreach,
  // not agent registration — see registerPage.enContact in the dictionaries.
  const banner = locale === "ru" ? dict.registerPage.banner : dict.registerPage.enContact.banner;

  // Every programme on the calendar is selectable, so a visitor who lands here directly
  // can still say what they are registering for.
  const events = tours.map((tour) => ({
    slug: tour.slug,
    label: t(tour.name, locale),
    isWorkshop: isWorkshop(tour),
  }));

  return (
    <>
      <PageBanner
        kicker={banner.kicker}
        title={banner.title}
        intro={banner.body}
      />

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            {locale === "ru" ? (
              // Suspense is required because the form reads ?event= via
              // useSearchParams; without it this route would opt out of static
              // generation entirely.
              <Suspense fallback={null}>
                <RegisterForm locale={locale} events={events} />
              </Suspense>
            ) : (
              <RegisterEnContactBlock locale={locale} />
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
