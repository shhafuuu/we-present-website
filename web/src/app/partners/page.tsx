import Image from "next/image";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { resorts } from "@/lib/resorts";

export default function PartnersPage() {
  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">Partners</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              The resorts and events behind the programme
            </h1>
            <p className="mt-6 text-ivory/70">
              We Present exists because of the resort partners who host each
              tour and the trade events that bring the industry together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Kicker>Resort Partners</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Four islands, one tour
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {resorts.map((resort, i) => (
              <Reveal key={resort.slug} delay={i * 0.08}>
                <div className="flex gap-6 rounded-2xl bg-lavender-mist/40 p-6">
                  <div
                    className={`flex h-20 w-32 shrink-0 items-center justify-center rounded-xl p-4 ${
                      resort.logoBg === "dark" ? "bg-aubergine" : "bg-ivory"
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
                  <div>
                    <h3 className="font-display text-lg text-aubergine">
                      {resort.name}
                    </h3>
                    <p className="kicker mt-1 text-amethyst/60">{resort.atoll}</p>
                    <p className="mt-2 text-sm text-ink/60">{resort.tagline}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker>Associated Partners</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Travel Trade Maldives
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-2xl bg-ivory p-10">
              <p className="kicker text-gold">TTM Maldives · 10th Edition</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Travel Trade Maldives (TTM) is the destination&rsquo;s leading
                trade event. Tour 2 combines TTM 2026 attendance — including
                the Awards &amp; Gala Night — with the partner-resort tour
                that follows. TTM branding will appear here once the
                partnership&rsquo;s visual assets are provided.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker>For Hotels</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Interested in partnering with We Present?
            </h2>
            <p className="mt-6 text-ink/70">
              Resorts interested in joining a future edition can request
              partnership — including images and brochures for review.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
