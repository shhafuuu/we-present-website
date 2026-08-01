import { Reveal } from "@/components/Reveal";

type Row = { dimension: string; traditional: string; wePresent: string };

/**
 * Traditional FAM trip vs We Present, across five dimensions.
 *
 * Built on CSS grid with explicit ARIA table roles rather than a `<table>`
 * element. WO-21 requires this to reflow on mobile with no horizontal scroll,
 * and setting `display: block` on real table elements strips their semantics in
 * most browsers. The roles keep the row/column relationships intact at every
 * breakpoint.
 *
 * On mobile each row stacks and every cell carries its own column label; from
 * `sm` up those labels give way to a single header row.
 */
export function DifferenceTable({
  columns,
  rows,
}: {
  columns: { traditional: string; wePresent: string };
  rows: Row[];
}) {
  return (
    <div role="table" className="mt-12 w-full text-left">
      <div role="row" className="hidden sm:grid sm:grid-cols-[9rem_1fr_1fr] sm:gap-6">
        {/* Corner cell. The sr-only text sits in an inner span because sr-only is
            position:absolute, which would drop this cell out of the grid flow and
            shift both visible headers a column to the left. */}
        <span role="columnheader">
          <span className="sr-only">Comparison</span>
        </span>
        <span role="columnheader" className="kicker pb-3 text-ink/70">
          {columns.traditional}
        </span>
        <span role="columnheader" className="kicker pb-3 text-amethyst">
          {columns.wePresent}
        </span>
      </div>

      {rows.map((row, i) => (
        <Reveal key={row.dimension} delay={i * 0.08} y={16}>
          <div
            role="row"
            className="grid gap-2 border-t border-amethyst/15 py-5 sm:grid-cols-[9rem_1fr_1fr] sm:gap-6"
          >
            <span
              role="rowheader"
              className="font-display text-base text-aubergine sm:text-lg"
            >
              {row.dimension}
            </span>

            <span role="cell" className="text-sm leading-relaxed text-ink/70">
              <span className="kicker mb-1 block text-ink/60 sm:hidden">
                {columns.traditional}
              </span>
              {row.traditional}
            </span>

            <span role="cell" className="text-sm leading-relaxed text-aubergine">
              <span className="kicker mb-1 block text-amethyst sm:hidden">
                {columns.wePresent}
              </span>
              {row.wePresent}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
