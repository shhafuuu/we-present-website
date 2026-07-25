/**
 * Thin line icons for the "What's Included" row (spec v2.0 §7.1) — hand-drawn to
 * match this site's minimal aesthetic (stroke-based, currentColor) rather than the
 * spec's literal icon suggestions, which read as generic clip-art at this size.
 * Sparkle (the brand's own star glyph) is reused for the "person + star" icon
 * rather than inventing a sixth motif.
 */
import { Sparkle } from "@/components/Sparkle";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function TicketIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M14.5 6v12" strokeDasharray="1.6 2.4" />
      <circle cx="18" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BedIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 18v-6.5A1.5 1.5 0 0 1 4.5 10H19.5A1.5 1.5 0 0 1 21 11.5V18" />
      <path d="M3 15.5h18" />
      <path d="M6.5 10V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
      <path d="M3 18v1.5M21 18v1.5" />
    </svg>
  );
}

export function DiningIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 13.5a8 8 0 0 1 16 0" />
      <path d="M2.5 13.5h19" />
      <path d="M12 13V5.5" />
      <circle cx="12" cy="4.3" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TransferIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 16v-4.8a1 1 0 0 1 .3-.7l1.7-1.7A1.5 1.5 0 0 1 7 8.3h10a1.5 1.5 0 0 1 1 .5l1.7 1.7a1 1 0 0 1 .3.7V16" />
      <path d="M3.5 16h17" />
      <circle cx="7.5" cy="16" r="1.6" />
      <circle cx="16.5" cy="16" r="1.6" />
    </svg>
  );
}

export function ProgramIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <svg {...base} className="h-full w-full" aria-hidden="true">
        <circle cx="11" cy="7.5" r="3" />
        <path d="M5.5 19c0-3.6 2.5-6.3 5.5-6.3s5.5 2.7 5.5 6.3" />
      </svg>
      <Sparkle className="absolute -right-1 -top-1 h-3.5 w-3.5 text-gold" />
    </span>
  );
}

/** Maps the CMS's icon-name string (a select field) to the actual component. */
export const INCLUDED_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  ticket: TicketIcon,
  bed: BedIcon,
  dining: DiningIcon,
  transfer: TransferIcon,
  program: ProgramIcon,
};
