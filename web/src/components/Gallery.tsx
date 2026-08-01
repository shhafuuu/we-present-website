"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* Every tile is square, including the feature. A 2x2 span in this grid is
          exactly square, so the old 4/3 on the feature could not fill its own cells
          and left a hole beside it.

          The feature only spans from sm up, which is what makes the grid pack with no
          trailing gap at either breakpoint: 12 images give 12 tiles over 2 columns on
          mobile (6 rows), and 15 cells over 3 columns above it (5 rows). Dense flow
          backfills anything a filtered or short gallery would otherwise leave behind. */}
      <div className="grid grid-cols-2 gap-4 [grid-auto-flow:dense] sm:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setActive(i)}
            className={`group relative aspect-square overflow-hidden rounded-xl ${
              i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={i === 0 ? "(min-width: 640px) 66vw, 50vw" : "(min-width: 640px) 33vw, 50vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-aubergine/0 transition-colors duration-300 group-hover:bg-aubergine/10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-aubergine/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] w-full max-w-4xl"
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={() => setActive(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center text-3xl font-light text-ivory/80 hover:text-ivory"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
