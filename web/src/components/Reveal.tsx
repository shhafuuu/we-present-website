"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  trigger = "scroll",
  fade = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /**
   * Set `false` to slide in without fading. The element then starts fully opaque, which
   * means the browser paints it on first render instead of after hydration.
   *
   * This matters for whatever element is the page's Largest Contentful Paint. The home
   * hero's `<h1>` measured 4.7s LCP with 1209ms of "element render delay" against a
   * 14ms time to first byte: the text was there, but `opacity: 0` in the server HTML
   * meant it did not count as painted until the mount animation ran. Only worth using
   * above the fold — elsewhere the fade is free.
   */
  fade?: boolean;
  /** "scroll" (default) waits for the element to enter the viewport — for content
   * below the fold. "mount" animates in immediately — for above-the-fold content
   * (e.g. Hero) that's already in view on load, where waiting on an
   * IntersectionObserver callback during a busy initial page load just adds a
   * visible delay before anything appears. */
  trigger?: "scroll" | "mount";
}) {
  const reduced = Boolean(useReducedMotion());
  const animateProps =
    trigger === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px -10% 0px" },
        };

  const initial = reduced
    ? { opacity: 1, y: 0 }
    : { opacity: fade ? 0 : 1, y };

  return (
    <motion.div
      data-reveal
      initial={initial}
      {...animateProps}
      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
