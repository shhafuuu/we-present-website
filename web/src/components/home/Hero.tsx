import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-end overflow-hidden">
      <Image
        src="/images/home/hero-so-aerial.jpg"
        alt="Aerial view of an overwater villa in the Maldives"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-aubergine/20 to-aubergine/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-aubergine/30 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
        <Reveal>
          <p className="kicker text-gold">We Present &middot; By Coati Travel</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            A front-row seat to the Maldives&rsquo; finest resorts.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            Curated familiarization tours for travel-agency partners &mdash;
            an intimate, first-hand look at the properties you sell, hosted
            by Coati Travel across the 2026 season.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href="/#register" variant="primary">
              Register Interest
            </Button>
            <Button href="/#tours" variant="ghost-light">
              View Tours Calendar
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="kicker mt-12 text-ivory/60">
            Next tour &middot; 17&ndash;23 August 2026 &middot; Maldives
          </p>
        </Reveal>
      </div>
    </section>
  );
}
