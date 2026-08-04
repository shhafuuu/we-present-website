"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type CaseCard = {
  slug: string;
  category: string;
  categoryLabel: string;
  partner: string;
  metricValue?: string;
  metricLabel?: string;
  summary: string;
  featured?: boolean;
  hasDetail: boolean;
  detailHref: string;
};

type Filter = { key: string; label: string };

/**
 * The case index: filter row plus an asymmetric grid.
 *
 * The default pattern for a section like this is pills and equal cards, which reads
 * as a marketing page. The register here is editorial instead: numbers as display
 * typography, generous negative space, mixed card weights, and no boxes or icons
 * around figures. The filter and its cross-fade are where this section spends its
 * whole animation budget.
 *
 * Gold appears only as the sliding filter underline and on hover, per the Rare Gold
 * Rule. No gold fills.
 */
export function CasesIndex({
  cards,
  filters,
  emptyLabel,
}: {
  cards: CaseCard[];
  filters: Filter[];
  emptyLabel: string;
}) {
  const [active, setActive] = useState("all");
  const reduced = Boolean(useReducedMotion());

  const visible = active === "all" ? cards : cards.filter((c) => c.category === active);

  // Exactly one large card, per WO-31. Other featured cases still lead the order and
  // still get the dark fill, but a second double-width tile leaves a hole in the grid
  // and dilutes the focal point rather than doubling it.
  const featureSlug = active === "all" ? cards.find((c) => c.featured)?.slug : undefined;

  return (
    <div>
      <div
        role="tablist"
        aria-label={filters[0]?.label}
        className="flex flex-wrap justify-center gap-x-7 gap-y-3"
      >
        {filters.map((f) => {
          const isActive = f.key === active;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={`relative -mb-px pb-2 font-display text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amethyst sm:text-lg ${
                isActive ? "text-aubergine" : "text-ink/70 hover:text-amethyst"
              }`}
            >
              {f.label}
              {isActive && (
                // layoutId slides the rule between labels rather than fading one out
                // and another in.
                <motion.span
                  layoutId="case-filter-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  transition={
                    reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((card, i) => {
            // One large feature card, then smaller tiles in mixed weights. Equal cards
            // are what made the old value grid read flat.
            const isFeature = card.slug === featureSlug;
            const dark = isFeature || Boolean(card.featured) || i % 5 === 4;

            const body = (
              <div
                className={`flex h-full flex-col gap-5 rounded-2xl p-7 transition-all duration-500 ${
                  dark
                    ? "bg-aubergine text-ivory group-hover:shadow-lg"
                    : // Lilac, not ivory. The section ground is ivory, so an ivory card
                      // computed to exactly the same colour and only its hairline border
                      // separated it: the light cards washed out entirely.
                      "border border-amethyst/15 bg-soft-lilac/55 group-hover:border-gold/50 group-hover:shadow-md"
                } ${isFeature ? "lg:p-10" : ""}`}
              >
                <p className={`kicker ${dark ? "text-gold" : "text-amethyst"}`}>
                  {card.categoryLabel}
                </p>

                <div className="flex-1">
                  {card.metricValue ? (
                    <p
                      className={`font-display leading-none ${
                        dark ? "text-ivory" : "text-aubergine"
                      } ${isFeature ? "text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"}`}
                    >
                      {card.metricValue}
                    </p>
                  ) : null}
                  {card.metricLabel ? (
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        dark ? "text-ivory/75" : "text-ink/70"
                      }`}
                    >
                      {card.metricLabel}
                    </p>
                  ) : (
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        dark ? "text-ivory/75" : "text-ink/70"
                      }`}
                    >
                      {card.summary}
                    </p>
                  )}
                </div>

                <p
                  className={`font-display text-lg ${dark ? "text-ivory" : "text-aubergine"}`}
                >
                  {card.partner}
                </p>
              </div>
            );

            return (
              <motion.div
                key={card.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }
                }
                className={`group ${isFeature ? "sm:col-span-2" : ""}`}
              >
                {card.hasDetail ? (
                  <Link href={card.detailHref} className="block h-full">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-sm text-ink/70">{emptyLabel}</p>
      )}
    </div>
  );
}
