import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function ConceptSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="concept" className="border-t border-amethyst/10 bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
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
          <span className="h-px w-16 bg-gold" />
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
