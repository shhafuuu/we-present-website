import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export function ConceptSection() {
  return (
    <section id="concept" className="bg-ivory px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-display text-2xl italic leading-relaxed text-amethyst sm:text-3xl">
            &ldquo;We Present is Coati Travel&rsquo;s invitation to the
            partners who sell the Maldives every day &mdash; a chance to
            experience it themselves.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-base leading-relaxed text-ink/70">
            Selection is merit-based, driven by agency production. Each
            edition brings a confirmed group of agency representatives to a
            destination to experience its resorts first-hand and, where
            relevant, attend the destination&rsquo;s leading travel-trade
            event &mdash; a polished, ongoing programme rather than a single
            one-off trip.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10 flex justify-center">
          <span className="h-px w-16 bg-gold" />
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button href="/#tours" variant="ghost">
            Explore the Programme
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
