import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";

export function RegisterBand() {
  return (
    <section
      id="register"
      className="bg-gradient-to-b from-soft-lilac via-amethyst to-aubergine px-6 py-28 lg:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Kicker tone="ivory">We Present 2027</Kicker>
          <h2 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
            Register your interest for the next edition
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-ivory/75">
            Selection is merit-based and driven by agency production. Tell us
            about your agency and we&rsquo;ll be in touch as the 2027 calendar
            takes shape.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Button href="/register" variant="primary">
            Register Interest
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
