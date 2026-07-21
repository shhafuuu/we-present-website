import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function IntroSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="border-t border-amethyst/10 bg-lavender-mist px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>{dict.home.intro.kicker}</Kicker>
          <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
            {dict.home.intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
