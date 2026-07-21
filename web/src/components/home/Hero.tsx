import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Sparkle } from "@/components/Sparkle";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden">
      <Image
        src="/images/home/hero-so-aerial.jpg"
        alt="Aerial view of an overwater villa in the Maldives"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-aubergine/20 to-aubergine/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-aubergine/30 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
        <Reveal>
          <p className="kicker inline-flex items-center gap-2.5 text-ivory [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
            <span className="h-px w-5 bg-ivory/60" />
            <Sparkle className="h-2.5 w-2.5 shrink-0" />
            {dict.home.hero.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            {dict.home.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            {dict.home.hero.lead}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href={href(locale, "/#register")} variant="primary">
              {dict.home.hero.ctaPrimary}
            </Button>
            <Button href={href(locale, "/#tours")} variant="ghost-light">
              {dict.home.hero.ctaSecondary}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="kicker mt-12 text-ivory/60">{dict.home.hero.nextTour}</p>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center motion-safe:animate-bounce">
        <div className="flex flex-col items-center gap-1.5 text-ivory/60">
          <Sparkle className="h-3 w-3" />
          <span className="h-8 w-px bg-ivory/40" />
        </div>
      </div>
    </section>
  );
}
