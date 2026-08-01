import type { ReactNode } from "react";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";

/** Tailwind needs literal class strings, so the width variants are a lookup rather
 *  than an interpolated `max-w-${width}`. */
const WIDTHS = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
} as const;

/**
 * The gradient page banner shared by every non-home page.
 *
 * Extracted per v2.1 / WO-03. The gradient had already regressed to a flat
 * `bg-aubergine` once and been restored by hand across eight pages; keeping the
 * treatment inline is what let it drift in the first place. It lives here now so
 * there is exactly one place to change it.
 *
 * Deliberately NOT used by: the mid-About accent band, the footer's flat
 * `bg-aubergine`, and the image-overlay gradients on the hero and resort cards.
 * Those are different treatments that happen to share a colour.
 *
 * `trigger="mount"` because the banner is always above the fold, where waiting on
 * an IntersectionObserver just delays the first paint of content already in view.
 */
export function PageBanner({
  kicker,
  title,
  meta,
  intro,
  width = "3xl",
  children,
}: {
  kicker: ReactNode;
  title: ReactNode;
  /** Small line between title and intro, e.g. a tour's dates. */
  meta?: ReactNode;
  intro?: ReactNode;
  width?: keyof typeof WIDTHS;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-soft-lilac via-amethyst to-aubergine px-6 pb-20 pt-40 lg:px-10">
      <div className={`mx-auto ${WIDTHS[width]} text-center`}>
        <Reveal trigger="mount">
          <Kicker tone="ivory">{kicker}</Kicker>
          <h1 className="font-display mt-5 text-4xl text-ivory break-words sm:text-5xl">
            {title}
          </h1>
          {meta ? <p className="mt-4 text-sm text-ivory/75">{meta}</p> : null}
          {intro ? <p className="mt-6 text-ivory/75">{intro}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
