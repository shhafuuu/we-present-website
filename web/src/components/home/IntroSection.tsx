import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import { getHomeSettings, t } from "@/lib/settings";

export function IntroSection({ locale }: { locale: Locale }) {
  const settings = getHomeSettings();

  return (
    <section className="border-t border-amethyst/10 bg-lavender-mist px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>{t(settings.intro.kicker, locale)}</Kicker>
          <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
            {t(settings.intro.body, locale)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
