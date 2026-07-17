import Image from "next/image";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { resorts } from "@/lib/resorts";

export function PartnersStrip() {
  return (
    <section id="partners" className="bg-soft-lilac/40 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <Kicker>Partners</Kicker>
          <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
            Alongside our resort partners &amp; TTM Maldives
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {resorts.map((resort) => (
              <div
                key={resort.slug}
                className={`flex h-28 w-44 items-center justify-center rounded-2xl p-6 shadow-sm ring-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${
                  resort.logoBg === "dark"
                    ? "bg-aubergine ring-aubergine/20"
                    : "bg-ivory ring-aubergine/5"
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={resort.logo}
                    alt={resort.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
