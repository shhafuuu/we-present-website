import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { RegisterForm } from "@/components/RegisterForm";
import { RegisterEnContactBlock } from "@/components/RegisterEnContactBlock";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

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

  return (
    <>
      <section className="bg-gradient-to-b from-soft-lilac via-amethyst to-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">{banner.kicker}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
              {banner.title}
            </h1>
            <p className="mt-6 text-ivory/75">{banner.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            {locale === "ru" ? (
              <RegisterForm locale={locale} />
            ) : (
              <RegisterEnContactBlock locale={locale} />
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
