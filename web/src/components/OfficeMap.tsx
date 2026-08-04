"use client";

import { useState } from "react";

/**
 * A map that loads only when a visitor asks for it.
 *
 * Yandex rather than Google: the whole hosting brief is that the site must work from
 * Russia without a VPN, and a map that fails to load is worse than no map.
 *
 * Click to load rather than automatic, for two reasons. The obvious one is that an
 * iframe on every page view costs a third-party round trip nobody asked for. The
 * stronger one is that an auto-loading embed sets third-party cookies before the
 * visitor has done anything, which the privacy policy would then have to cover for
 * every visitor rather than for the ones who opt in.
 */
export function OfficeMap({
  city,
  address,
  mapQuery,
  showMapLabel,
}: {
  city: string;
  address: string;
  /** Search string Yandex resolves. Held in Russian in lib/contact.ts. */
  mapQuery: string;
  showMapLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const src = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(
    mapQuery
  )}&z=16`;

  return (
    <div className="overflow-hidden rounded-2xl border border-amethyst/15 bg-soft-lilac/30">
      <div className="px-6 pt-5 pb-4">
        <p className="kicker text-amethyst">{city}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{address}</p>
      </div>

      <div className="relative h-64 border-t border-amethyst/10 sm:h-72">
        {loaded ? (
          <iframe
            src={src}
            title={`${showMapLabel}: ${city}`}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          /* Styled to the palette rather than left as a grey plate. A raw map-coloured
             rectangle against ivory and lilac reads as a broken element. */
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-soft-lilac/70 transition-colors hover:bg-soft-lilac"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aubergine/5 text-amethyst transition-colors group-hover:bg-gold/15 group-hover:text-aubergine">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M20 10c0 4.6-5.4 10-8 12-2.6-2-8-7.4-8-12a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.75" />
              </svg>
            </span>
            <span className="kicker text-aubergine">
              {showMapLabel}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
