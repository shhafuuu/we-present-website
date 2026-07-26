"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  trigger = "scroll",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
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

  return (
    <motion.div
      data-reveal
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      {...animateProps}
      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
