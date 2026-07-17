import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { AlternatingBlock } from "@/components/about/AlternatingBlock";
import { Button } from "@/components/Button";

const STEPS = [
  {
    number: "01",
    title: "Production is tracked",
    body: "Coati Travel tracks room-nights delivered by each partner agency across the Russia/CIS market throughout the year.",
  },
  {
    number: "02",
    title: "Selection is merit-based",
    body: "Top-producing agencies are invited to nominate a representative for the upcoming edition — no application process, no lobbying.",
  },
  {
    number: "03",
    title: "The group is confirmed",
    body: "Once confirmed, the itinerary, resorts and event attendance are locked in, and the group experiences the destination together.",
  },
];

const BENEFITS = [
  "First-hand knowledge of the resorts you sell — not a brochure, the actual villa, the actual reef.",
  "Direct access to resort partners and, where relevant, the destination's leading travel-trade event.",
  "A recognised marker of production within the Coati Travel partner network.",
  "A curated, hosted experience — flights, transfers and the itinerary are handled end-to-end.",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">About We Present</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              An invitation to the partners who sell the Maldives every day
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <AlternatingBlock
          kicker="The Concept"
          title="A B2B programme, not a marketing event"
          paragraphs={[
            "We Present is a B2B initiative by Coati Travel, an agency specialising in the Russia and CIS outbound market. The programme organises curated familiarization trips that bring selected travel-agency representatives to a destination to experience its resorts first-hand.",
            "Rather than a single event, We Present runs an ongoing series of tours. The 2026 launch season includes two Maldives tours in August — one combined with Travel Trade Maldives (TTM) 2026 — followed by an Oman tour in December, with further destinations planned for 2027.",
          ]}
          image="/images/resorts/fushifaru/lifestyle.jpg"
          imageAlt="Fushifaru beach deck at sunset"
        />
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <AlternatingBlock
          kicker="How It Works"
          title="The group is already confirmed"
          paragraphs={[
            "For each edition, the participating group is already confirmed before the site goes live — the website is not a tool to recruit attendees for a given tour. Its role is to give the programme a polished, professional online presence.",
            "That means showcasing the concept, the tours, the resorts and the partners; keeping the calendar current; and supporting inquiries and forward interest from agents, clients and hotels alike.",
          ]}
          image="/images/resorts/so-maldives/lifestyle.jpg"
          imageAlt="Kayaking at SO/ Maldives"
          reverse
        />
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Kicker>Selection Model</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Merit-based, driven by room-nights
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="rounded-2xl bg-soft-lilac/40 p-8 text-left">
                  <p className="font-display text-3xl text-gold">{step.number}</p>
                  <h3 className="font-display mt-4 text-xl text-aubergine">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aubergine px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker tone="ivory">Benefits for Agents</Kicker>
            <p className="font-display mt-6 text-2xl italic text-ivory/90 sm:text-3xl">
              &ldquo;A chance to sell what you&rsquo;ve actually seen.&rdquo;
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 text-left sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-ivory/10 p-6">
                  <span className="h-px w-6 shrink-0 translate-y-3 bg-gold" />
                  <p className="text-sm leading-relaxed text-ivory/75">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-14">
            <Button href="/#register" variant="primary">
              Register Interest
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
