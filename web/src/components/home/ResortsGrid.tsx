import Image from "next/image";
import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { resorts } from "@/lib/resorts";

export function ResortsGrid() {
  return (
    <section id="resorts" className="bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <Kicker>The Resorts</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            Four islands, one tour
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {resorts.map((resort, i) => {
            const card = (
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-lavender-mist/40 transition-transform duration-500 hover:-translate-y-2">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={resort.cardImage}
                    alt={resort.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aubergine/50 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="kicker text-amethyst/70">{resort.atoll}</p>
                  <h3 className="font-display mt-2 text-xl text-aubergine">
                    {resort.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink/60">
                    {resort.tagline}
                  </p>
                  <span
                    className={`kicker mt-5 inline-flex items-center gap-2 text-[0.7rem] ${
                      resort.built
                        ? "text-gold"
                        : "text-ink/35"
                    }`}
                  >
                    {resort.built ? "Explore →" : "Coming Soon"}
                  </span>
                </div>
              </div>
            );

            return (
              <Reveal key={resort.slug} delay={i * 0.08}>
                {resort.built ? (
                  <Link href={`/resorts/${resort.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
