import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ContactEnBlock } from "@/components/ContactEnBlock";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
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
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">{dict.contactPage.banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {dict.contactPage.banner.title}
            </h1>
            <p className="mt-6 text-ivory/70">{dict.contactPage.banner.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="sr-only">{dict.contactPage.details.kicker}</h2>
            <Kicker>{dict.contactPage.details.kicker}</Kicker>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.email}</dt>
                <dd className="mt-1 text-ink/70">hello@wepresent.org</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.phone}</dt>
                <dd className="mt-1 text-ink/70">{dict.contactPage.details.phoneTbc}</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.office}</dt>
                <dd className="mt-1 text-ink/70">{dict.contactPage.details.officeTbc}</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst">{dict.contactPage.details.instagram}</dt>
                <dd className="mt-1 text-ink/70">{dict.contactPage.details.instagramTbc}</dd>
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
