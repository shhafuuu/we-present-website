import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";

export function HowItWas() {
  return (
    <section id="how-it-was" className="bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>How It Was</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            Stories from the field
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 rounded-3xl border border-dashed border-amethyst/20 bg-lavender-mist/30 px-8 py-16">
            <p className="font-display text-xl italic text-amethyst sm:text-2xl">
              Our first journeys are coming this August.
            </p>
            <p className="mt-4 text-sm text-ink/60">
              Photos, trip reports and reviews from participating agents and
              hotel partners will appear here after each tour.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
