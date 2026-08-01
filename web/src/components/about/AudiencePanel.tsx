import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * One half of the audience split (v2.1 section 1.2 and 1.3).
 *
 * An audience toggle was considered and rejected: on a B2B site each audience
 * needs to see the other half of the proposition, because hotels invest when the
 * participants are qualified and participants come because the partners are
 * invested. A toggle hides the proof from whoever is reading. Both panels are
 * therefore always visible, separated by background tint rather than by
 * interaction.
 *
 * `tone` picks the tint. The two values are deliberately far enough apart to read
 * as a section boundary rather than as two near-identical neutrals.
 */
export function AudiencePanel({
  id,
  label,
  message,
  items,
  keyMessage,
  tone,
  children,
}: {
  id: string;
  label: string;
  message: string;
  items: string[];
  keyMessage: string;
  tone: "ivory" | "lilac";
  children?: ReactNode;
}) {
  const isIvory = tone === "ivory";

  return (
    /* The ivory/lavender-mist seam measures 1.107:1 (RGB distance 17.4), which is the
       "white and lilac look similar" problem the client raised in round 1. The fix
       established then was an explicit section-boundary rule rather than a heavier
       tint, so each panel carries a hairline top border to make the seam read. */
    <section
      id={id}
      className={`scroll-mt-24 border-t border-amethyst/10 px-6 py-20 lg:px-10 ${
        isIvory ? "bg-ivory" : "bg-lavender-mist"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="kicker text-amethyst">{label}</p>
          <h2 className="font-display mt-4 text-2xl leading-snug text-aubergine sm:text-3xl">
            {message}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={item}
              className={`border-t py-3.5 ${isIvory ? "border-amethyst/15" : "border-amethyst/20"}`}
            >
              <Reveal delay={Math.min(i * 0.06, 0.4)} y={14}>
                <p className="text-sm leading-relaxed text-ink/70">{item}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {children}

        <Reveal delay={0.2}>
          <p className="mt-12 border-l-2 border-gold pl-6 font-display text-lg italic leading-relaxed text-aubergine sm:text-xl">
            {keyMessage}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
