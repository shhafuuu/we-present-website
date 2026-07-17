"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ResortHeroMedia({
  heroVideo,
  heroImage,
  alt,
}: {
  heroVideo?: string;
  heroImage: string;
  alt: string;
}) {
  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (heroVideo && !prefersReducedMotion) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroImage}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image src={heroImage} alt={alt} fill priority className="object-cover" />
  );
}
