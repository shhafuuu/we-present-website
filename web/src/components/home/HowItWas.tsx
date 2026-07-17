import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function HowItWas({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="how-it-was" className="bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>{dict.home.howItWas.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            {dict.home.howItWas.title}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 rounded-3xl border border-dashed border-amethyst/20 bg-lavender-mist/30 px-8 py-16">
            <p className="font-display text-xl italic text-amethyst sm:text-2xl">
              {dict.home.howItWas.quote}
            </p>
            <p className="mt-4 text-sm text-ink/60">{dict.home.howItWas.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
