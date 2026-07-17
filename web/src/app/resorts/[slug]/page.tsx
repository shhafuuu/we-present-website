import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { InquiryForm } from "@/components/InquiryForm";
import { getResort, resorts } from "@/lib/resorts";

export function generateStaticParams() {
  return resorts.filter((r) => r.built).map((r) => ({ slug: r.slug }));
}

const GALLERY: Record<string, { src: string; alt: string }[]> = {
  fushifaru: [
    { src: "/images/resorts/fushifaru/lifestyle.jpg", alt: "Fushifaru beach deck at sunset" },
    { src: "/images/resorts/fushifaru/villa.jpg", alt: "Beach Villa Sunrise interior" },
    { src: "/images/resorts/fushifaru/dining.jpg", alt: "Dining at Fushifaru" },
    { src: "/images/resorts/fushifaru/spa.jpg", alt: "Heylhi Spa treatment room" },
    { src: "/images/resorts/fushifaru/sandbank.jpg", alt: "Fushifaru sandbank" },
    { src: "/images/resorts/fushifaru/dive.jpg", alt: "Diving with a sea turtle" },
    { src: "/images/resorts/fushifaru/island.jpg", alt: "Aerial view around the island" },
    { src: "/images/resorts/fushifaru/yoga.jpg", alt: "Yoga session at Fushifaru" },
  ],
};

const KEY_FACTS: Record<
  string,
  { location: string; villas: string; facilities: string; stayDates: string }
> = {
  fushifaru: {
    location: "Lhaviyani Atoll, Maldives — 35 min seaplane from Malé",
    villas: "Beach Villas, Water Villas & Sunset Water Villas",
    facilities: "Heylhi Spa, PADI dive centre, Greenfushi sustainability hub, kids club",
    stayDates: "19–21 Aug 2026 · Tour 1, stop 2 (2 nights)",
  },
};

export default async function ResortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resort = getResort(slug);

  if (!resort || !resort.built) {
    notFound();
  }

  const gallery = GALLERY[slug] ?? [];
  const facts = KEY_FACTS[slug];

  return (
    <>
      <section className="relative flex h-[75vh] min-h-[560px] w-full items-end overflow-hidden">
        <Image
          src="/images/resorts/fushifaru/hero.jpg"
          alt={resort.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-aubergine/15 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <Reveal>
            <p className="kicker text-gold">{resort.atoll}</p>
            <h1 className="font-display mt-4 text-5xl text-ivory sm:text-6xl">
              {resort.name}
            </h1>
            {facts && (
              <p className="mt-4 text-sm text-ivory/70">{facts.stayDates}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Kicker>The Story</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              An intimate reef island in Lhaviyani Atoll
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">
              Fushifaru sits on its own private reef, a short seaplane hop
              from Malé, where mornings begin with the tide and the days
              slow to the pace of the lagoon. Overwater and beach villas
              face an uninterrupted horizon; the house reef, reachable by a
              short swim from most villas, is among the most accessible in
              the atoll.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              For the We Present tour, Fushifaru is the second stop &mdash;
              two nights to dive the house reef, unwind at Heylhi Spa, and
              experience the island&rsquo;s understated, barefoot-luxury
              hospitality first-hand.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {facts && (
              <div className="rounded-2xl bg-soft-lilac/40 p-8">
                <Kicker>Key Facts</Kicker>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="kicker text-amethyst/70">Location</dt>
                    <dd className="mt-1 text-ink/70">{facts.location}</dd>
                  </div>
                  <div>
                    <dt className="kicker text-amethyst/70">Villas</dt>
                    <dd className="mt-1 text-ink/70">{facts.villas}</dd>
                  </div>
                  <div>
                    <dt className="kicker text-amethyst/70">Facilities</dt>
                    <dd className="mt-1 text-ink/70">{facts.facilities}</dd>
                  </div>
                  <div>
                    <dt className="kicker text-amethyst/70">
                      Official Website
                    </dt>
                    <dd className="mt-1 text-ink/40">
                      To be confirmed by resort partner
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>Gallery</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Life at Fushifaru
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Gallery images={gallery} />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <InquiryForm resortName={resort.name} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-amethyst/10 bg-ivory px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-6xl justify-between text-sm">
          <Link href="/#resorts" className="text-amethyst hover:text-aubergine">
            ← All Resorts
          </Link>
          <span className="text-ink/30">More resort pages coming soon</span>
        </div>
      </section>
    </>
  );
}
