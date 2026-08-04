import { Kicker } from "@/components/Kicker";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ContactEnBlock } from "@/components/ContactEnBlock";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import {
  EMAIL,
  PHONE,
  PHONE_HREF,
  OFFICE_PHONE,
  OFFICE_PHONE_HREF,
  OFFICES,
  WHATSAPP_HREF,
  INSTAGRAM_HREF,
  LINKEDIN_HREF,
} from "@/lib/contact";
import { getDictionary } from "@/i18n/getDictionary";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  // Same RU-full-form/EN-contact-only split as /register (client instruction,
  // extended here from the register page to the general contact form).

  return (
    <>
      <PageBanner
        kicker={dict.contactPage.banner.kicker}
        title={dict.contactPage.banner.title}
        intro={dict.contactPage.banner.body}
      />

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="sr-only">{dict.contactPage.details.kicker}</h2>
            <Kicker>{dict.contactPage.details.kicker}</Kicker>
            <dl className="mt-6 space-y-6 text-sm">
              {/* Email is shown only once a production address exists. The
                  placeholder that used to sit here was never confirmed. */}
              {EMAIL ? (
                <div>
                  <dt className="kicker text-amethyst">{dict.contactPage.details.email}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${EMAIL}`} className="text-amethyst underline">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.phone}</dt>
                <dd className="mt-1 text-ink/70">
                  <a href={PHONE_HREF} className="text-amethyst underline">
                    {PHONE}
                  </a>
                  <span className="mx-2 text-ink/40">·</span>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amethyst underline"
                  >
                    {dict.footer.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">
                  {dict.contactPage.details.officePhone}
                </dt>
                <dd className="mt-1 text-ink/70">
                  <a href={OFFICE_PHONE_HREF} className="text-amethyst underline">
                    {OFFICE_PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.office}</dt>
                <dd className="mt-1 space-y-4 text-ink/70">
                  {OFFICES.map((office) => (
                    <div key={office.id}>
                      <p className="text-ink">{office.city[locale]}</p>
                      <p className="mt-0.5">{office.address[locale]}</p>
                    </div>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.instagram}</dt>
                <dd className="mt-1">
                  <a
                    href={INSTAGRAM_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amethyst underline"
                  >
                    {dict.contactPage.details.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.footer.linkedinLabel}</dt>
                <dd className="mt-1">
                  <a
                    href={LINKEDIN_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amethyst underline"
                  >
                    {dict.contactPage.details.linkedinHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.parentBrand}</dt>
                <dd className="mt-1">
                  <a
                    href="https://coatitravel.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amethyst underline"
                  >
                    coatitravel.ru
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            {locale === "ru" ? <ContactForm locale={locale} /> : <ContactEnBlock locale={locale} />}
          </Reveal>
        </div>
      </section>
    </>
  );
}
