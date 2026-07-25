"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import {
  BeaconIcon,
  NetworkIcon,
  BroadcastIcon,
  GrowthIcon,
  LinkIcon,
  TargetIcon,
} from "@/components/ValueIcons";

type ValueItem = { title: string; body: string };
type IconType = ComponentType<{ className?: string }>;

const ITEM_ICONS: IconType[] = [
  BeaconIcon,
  NetworkIcon,
  BroadcastIcon,
  GrowthIcon,
  LinkIcon,
  TargetIcon,
];

/** Groups the 6 flat value items into a 3-stage narrative: get seen, build ties, convert. */
const STAGE_ITEM_INDEXES = [
  [0, 2],
  [1, 4],
  [3, 5],
] as const;

const STAGE_PANEL_STYLE = [
  "bg-ivory text-ink",
  "bg-soft-lilac/40 text-ink",
  "bg-aubergine text-ivory",
] as const;

const STAGE_ICON_TONE = ["text-amethyst", "text-amethyst", "text-gold"] as const;
const STAGE_DIVIDER = ["border-amethyst/10", "border-amethyst/15", "border-ivory/15"] as const;
const STAGE_LABEL_TONE = ["text-amethyst", "text-amethyst", "text-gold"] as const;
const STAGE_TITLE_TONE = ["text-aubergine", "text-aubergine", "text-ivory"] as const;
const STAGE_BODY_TONE = ["text-ink/70", "text-ink/70", "text-ivory/75"] as const;

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function Connector({ toneClass, reduced }: { toneClass: string; reduced: boolean }) {
  return (
    <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className={toneClass}>
        <motion.path
          d="M1 8h32"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
        />
        <path d="M28 2.5 35.5 8 28 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function ValueJourney({ stages, items }: { stages: string[]; items: ValueItem[] }) {
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  return (
    <div className="mt-14 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {STAGE_ITEM_INDEXES.map((indexes, stageIndex) => (
        <div key={stageIndex} className="contents">
          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : stageIndex * 0.15, ease: easeOutExpo }}
            className={`flex flex-col gap-6 rounded-3xl p-8 text-left shadow-card ${STAGE_PANEL_STYLE[stageIndex]}`}
          >
            <p className={`kicker ${STAGE_LABEL_TONE[stageIndex]}`}>
              <span className="mr-2 font-display text-base">0{stageIndex + 1}</span>
              {stages[stageIndex]}
            </p>

            <div className="flex flex-1 flex-col gap-6">
              {indexes.map((itemIndex, rowIndex) => {
                const Icon = ITEM_ICONS[itemIndex];
                const item = items[itemIndex];
                return (
                  <motion.div
                    key={itemIndex}
                    className={`flex flex-col gap-3 ${
                      rowIndex > 0 ? `border-t pt-6 ${STAGE_DIVIDER[stageIndex]}` : ""
                    }`}
                    whileHover={reduced ? undefined : "hover"}
                    initial="rest"
                  >
                    <motion.span
                      variants={{
                        rest: { scale: 1, rotate: 0 },
                        hover: { scale: 1.12, rotate: -6 },
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                      className={`inline-flex ${STAGE_ICON_TONE[stageIndex]}`}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.span>
                    <h3 className={`font-display text-lg ${STAGE_TITLE_TONE[stageIndex]}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${STAGE_BODY_TONE[stageIndex]}`}>
                      {item.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {stageIndex < STAGE_ITEM_INDEXES.length - 1 && (
            <Connector toneClass={STAGE_LABEL_TONE[stageIndex]} reduced={reduced} />
          )}
        </div>
      ))}
    </div>
  );
}
