import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { PartnerForm } from "@/components/PartnerForm";
import { PartnerEnContactBlock } from "@/components/PartnerEnContactBlock";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

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
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">{banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{banner.body}</p>
          </Reveal>
        </div>
      </section>

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
