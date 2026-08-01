"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Sparkle } from "@/components/Sparkle";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  // Next.js Link's client-side transition doesn't reliably hash-scroll on a
  // same-page navigation (confirmed: a fresh URL load with the hash works,
  // an in-app click did not) - scroll manually and sync the URL ourselves.
  const scrollToTours = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("tours");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}#tours`);
  };

  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden">
      {/* v2.1 section 7. The flat violet wash that used to sit here made the photo
          look unnatural, and the cause was hue, not opacity: the water is cyan and
          the wash was violet, near-opposites on the wheel, so layering them
          desaturated both into a muddy grey-blue. Lowering the opacity could not
          have fixed that.

          The photograph is colour-graded instead, so it belongs to the palette with
          nothing sitting on top of it: saturation down ~15%, hue pulled off pure
          cyan toward the aubergine end, shadows deepened, highlights warmed slightly
          toward ivory. Kept in CSS rather than baked into the file so it stays
          tunable.

          object-position favours the right of the frame, which is calm deep water;
          the left is busy white foam and that is where the headline sits.

          Do NOT reintroduce a scrim or gradient layer here to fix contrast. This
          project hit that bug twice and DESIGN.md now records the rule: fix contrast
          at the component that needs it. The headline carries its own text-shadow
          and the header has its own frosted panel. */}
      <Image
        src="/images/home/hero-open-ocean.jpg"
        alt="Aerial view of open ocean water"
        fill
        priority
        sizes="100vw"
        className="scale-[1.35] object-cover object-[88%_center] [filter:saturate(0.82)_contrast(1.04)_brightness(0.5)_hue-rotate(18deg)_sepia(0.08)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
        <Reveal trigger="mount">
          <p className="kicker inline-flex items-center gap-2.5 text-ivory [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
            <span className="h-px w-5 bg-ivory/60" />
            <Sparkle className="h-2.5 w-2.5 shrink-0" />
            {dict.home.hero.kicker}
          </p>
        </Reveal>
        <Reveal trigger="mount" delay={0.1}>
          {/* Text-shadow rather than a scrim: with the violet wash gone, contrast is
              fixed at the text that needs it. See the note on the Image above. */}
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] text-ivory [text-shadow:0_2px_12px_rgba(20,12,32,0.55)] sm:text-6xl lg:text-7xl">
            {dict.home.hero.title}
          </h1>
        </Reveal>
        <Reveal trigger="mount" delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/90 [text-shadow:0_1px_8px_rgba(20,12,32,0.6)] sm:text-lg">
            {dict.home.hero.lead}
          </p>
        </Reveal>
        <Reveal trigger="mount" delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href={href(locale, "/register")} variant="primary">
              {dict.home.hero.ctaPrimary}
            </Button>
            <Button
              href={href(locale, "/#tours")}
              variant="ghost-light"
              onClick={scrollToTours}
              scroll={false}
            >
              {dict.home.hero.ctaSecondary}
            </Button>
          </div>
        </Reveal>
        <Reveal trigger="mount" delay={0.4}>
          <p className="kicker mt-12 text-ivory/90 [text-shadow:0_1px_8px_rgba(20,12,32,0.6)]">
            {dict.home.hero.nextTour}
          </p>
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
