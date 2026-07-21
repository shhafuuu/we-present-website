import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Sparkle } from "@/components/Sparkle";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function ConceptSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="concept" className="relative overflow-hidden border-t border-amethyst/10 bg-ivory px-6 py-28 lg:px-10">
      <Sparkle className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-amethyst/10" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="sr-only">{dict.home.concept.sectionLabel}</h2>
        <Reveal>
          <p className="font-display text-2xl italic leading-relaxed text-amethyst sm:text-3xl">
            {dict.home.concept.quote}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-base leading-relaxed text-ink/70">
            {dict.home.concept.body}
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10 flex justify-center">
          <Sparkle className="h-4 w-4 text-gold" />
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button href={href(locale, "/about")} variant="ghost">
            {dict.home.concept.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
