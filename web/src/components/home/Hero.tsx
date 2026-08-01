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
      {/* v2.1 section 7. The client rejected the violet wash as unnatural, then the
          colour grade that replaced it for the same reason. The photograph now carries
          no filter at all: no tint, no grade, no darkening. It is the client's image as
          shot.

          That has a cost worth recording. Measured by pixel-sampling behind the
          headline, ivory text on the ungraded photo is 1.07:1, and even mirrored into
          the calmest water it only reaches 1.74:1, against a 3:1 floor for large text.
          The image holds both white foam and dark water, so no single text colour
          works across it.

          So contrast is fixed at the text, in the one way DESIGN.md allows: a panel on
          the component that needs it, exactly as the header solves its own nav
          legibility. It is deliberately a contained card, not a full-bleed scrim over
          the photograph, which is the bug this project hit twice.

          The image is mirrored so the calm deep water sits behind the copy and the
          busy foam falls to the right. It is an abstract aerial of open water with no
          orientation cue, so the flip is undetectable. */}
      <Image
        src="/images/home/hero-open-ocean.jpg"
        alt="Aerial view of open ocean water"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_60%] [transform:scaleX(-1.35)_scaleY(1.35)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
        {/* The panel, not the photograph, is what makes the copy legible. Contained to
            the text block so the image reads as itself either side of it. */}
        <div className="max-w-2xl rounded-3xl bg-aubergine/70 p-8 backdrop-blur-md sm:p-10">
        <Reveal trigger="mount">
          <p className="kicker inline-flex items-center gap-2.5 text-ivory">
            <span className="h-px w-5 bg-ivory/60" />
            <Sparkle className="h-2.5 w-2.5 shrink-0" />
            {dict.home.hero.kicker}
          </p>
        </Reveal>
        <Reveal trigger="mount" delay={0.1}>
          {/* Text-shadow rather than a scrim: with the violet wash gone, contrast is
              fixed at the text that needs it. See the note on the Image above. */}
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            {dict.home.hero.title}
          </h1>
        </Reveal>
        <Reveal trigger="mount" delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/90 sm:text-lg">
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
          <p className="kicker mt-12 text-ivory/90">
            {dict.home.hero.nextTour}
          </p>
        </Reveal>
        </div>
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
