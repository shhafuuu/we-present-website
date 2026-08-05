import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMeta";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { PartnerForm } from "@/components/PartnerForm";
import { PartnerEnContactBlock } from "@/components/PartnerEnContactBlock";
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
  return pageMetadata(locale, "/become-a-partner", {
    title: dict.partnerPage.banner.title,
    description: dict.partnerPage.banner.body,
  });
}

export default async function BecomeAPartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  // Same RU-full-form/EN-contact-only split as /register and /contact (client
  // instruction) — see partnerPage.enContact in the dictionaries.
  const banner = locale === "ru" ? dict.partnerPage.banner : dict.partnerPage.enContact.banner;

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
              <PartnerForm locale={locale} />
            ) : (
              <PartnerEnContactBlock locale={locale} />
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
