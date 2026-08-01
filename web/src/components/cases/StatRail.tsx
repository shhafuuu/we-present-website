"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Stat = { value: string; label: string; animate?: boolean };

/** Splits "19,854" / "15,000+" / "+98%" into the parts around the digits, so the
 *  count-up animates the number while any prefix or suffix stays put. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return { prefix, suffix, target, grouped: digits.includes(",") };
}

function Figure({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const reduced = Boolean(useReducedMotion());
  // Memoised because it is an effect dependency: a fresh object each render would
  // restart the animation on every re-render, and since the animation itself sets
  // state, the count would reset forever and never reach the target.
  const parsed = useMemo(() => parse(stat.value), [stat.value]);
  // null means "not counting", and renders the real figure. That keeps the number
  // correct in the server-rendered HTML, without JS, under reduced motion, and if the
  // rail is never scrolled into view. Seeding to 0 instead would ship a page reading
  // "0 room nights delivered" in every one of those cases. It is also only ever
  // assigned from inside the animation frame, never synchronously in the effect body.
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    // Reduced motion gets the final number immediately: the count-up is decoration,
    // and the figure itself is the content.
    if (!parsed || reduced || !inView || stat.animate === false) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / duration, 1);
      // Same easing as the site's motion signature, so the count settles rather
      // than stopping dead.
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(parsed.target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, reduced, delay, stat.animate]);

  const shown =
    n !== null && parsed
      ? `${parsed.prefix}${parsed.grouped ? n.toLocaleString("en-US") : n}${parsed.suffix}`
      : stat.value;

  return (
    <div ref={ref} className="text-center sm:text-left">
      {/* Set as display type, not as a stat widget: no box, no icon, no progress ring. */}
      <p className="font-display text-5xl leading-none text-aubergine sm:text-6xl lg:text-7xl">
        <span aria-hidden="true">{shown}</span>
        <span className="sr-only">{stat.value}</span>
      </p>
      <p className="kicker mt-4 text-ink/70">{stat.label}</p>
    </div>
  );
}

export function StatRail({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
      {stats.map((stat, i) => (
        <Figure key={stat.label} stat={stat} delay={i * 0.12} />
      ))}
    </div>
  );
}
