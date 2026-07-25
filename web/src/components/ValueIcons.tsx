/**
 * Thin line icons for the About page "Value" journey (one per pillar), hand-drawn
 * to match this site's minimal stroke-based aesthetic (see IncludedIcons.tsx)
 * rather than generic clip-art glyphs.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BeaconIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21s-6-5.7-6-10.2a6 6 0 1 1 12 0c0 4.5-6 10.2-6 10.2z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M3.5 8.5a9 9 0 0 1 1-3.3" />
      <path d="M19.5 8.5a9 9 0 0 0-1-3.3" />
    </svg>
  );
}

export function BroadcastIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="5" width="12.5" height="10" rx="2" />
      <path d="M8.2 8v4l3.5-2z" fill="currentColor" stroke="none" />
      <path d="M17.3 6.2a5 5 0 0 1 0 7" />
      <path d="M19.8 4.3a8 8 0 0 1 0 10.8" />
    </svg>
  );
}

export function NetworkIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5.5" cy="17" r="2" />
      <circle cx="18.5" cy="17" r="2" />
      <path d="M10.6 6.7 6.9 15.3" />
      <path d="M13.4 6.7l3.7 8.6" />
      <path d="M7.7 17h8.6" />
    </svg>
  );
}

export function LinkIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.5 14.5 14.5 9.5a3.2 3.2 0 0 1 4.5 4.5l-2 2" />
      <path d="M14.5 9.5 9.5 14.5a3.2 3.2 0 0 1-4.5-4.5l2-2" />
    </svg>
  );
}

export function GrowthIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.5 17 9 11.5l3.5 3 6-7" />
      <path d="M14.5 6.8h4.2V11" />
    </svg>
  );
}

export function TargetIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M9.2 12.3 11 14.1l3.6-4.4" />
    </svg>
  );
}

export const VALUE_ICONS = [
  BeaconIcon,
  BroadcastIcon,
  NetworkIcon,
  LinkIcon,
  GrowthIcon,
  TargetIcon,
];
