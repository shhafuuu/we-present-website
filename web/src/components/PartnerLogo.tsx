import Image from "next/image";
import type { Resort } from "@/lib/resorts";

/**
 * Optical normalisation for the partner logo row.
 *
 * Sizing every logo to the same bounding box is what made the row look mismatched:
 * the partner logos range from a stacked emblem (Fushifaru, aspect 0.75) to a
 * single-line wordmark (SO/ Maldives, aspect 9.40). At equal box height the wordmark
 * carries roughly twelve times the ink area of the emblems and swamps the row.
 *
 * 0.5 is equal bounding-box area: height scales as 1/sqrt(aspect), so the wordmark and
 * the emblems occupy the same visual real estate. An intermediate 0.35 was tried first
 * and still left SO/ Maldives at ~2.6x the area of the others on the rendered page.
 *
 * Normalised against a square reference rather than against the widest logo in the
 * current set, so adding a partner never silently resizes the existing four.
 */
const OPTICAL_EXPONENT = 0.5;

export function opticalScale(aspect: number) {
  return Math.min(1, Math.pow(1 / aspect, OPTICAL_EXPONENT));
}

/**
 * Renders one partner logo at its optically-normalised size. The row sets the base
 * height via the `--logo-base` custom property so the same component serves the
 * homepage strip and the partners page at different scales.
 */
export function PartnerLogo({
  resort,
  className = "",
  imageClassName = "",
  alt = "",
}: {
  resort: Resort;
  className?: string;
  imageClassName?: string;
  /** Leave empty where the partner's name is already announced by a wrapping link or an adjacent heading. */
  alt?: string;
}) {
  const scale = opticalScale(resort.logoAspect);

  // Width is capped by --logo-max-w where the caller sets one (the partners cards give
  // the logo a fixed-width column so every card's text starts at the same x). Height is
  // derived from the capped width rather than set independently, so a logo that hits
  // the cap shrinks rather than sitting letterboxed inside an oversized box.
  // The fallback must be a length, not 100%: on the homepage strip the logo's parent is
  // sized by the logo itself, so a percentage resolves circularly and collapses to zero.
  const width = `min(calc(var(--logo-base) * ${(scale * resort.logoAspect).toFixed(3)}), var(--logo-max-w, 9999px))`;
  const height = `calc(${width} / ${resort.logoAspect})`;

  return (
    <div
      style={{ height, width }}
      className={`relative shrink-0 ${
        resort.logoBg === "dark" ? "rounded-xl bg-aubergine p-3" : ""
      } ${className}`}
    >
      <Image
        src={resort.logo}
        alt={alt}
        fill
        sizes={`${Math.round(96 * scale * resort.logoAspect)}px`}
        className={`object-contain ${imageClassName}`}
      />
    </div>
  );
}
