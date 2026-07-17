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

  const builtResorts = resorts.filter((r) => r.built);
  const index = builtResorts.findIndex((r) => r.slug === slug);
  const previous = builtResorts[(index - 1 + builtResorts.length) % builtResorts.length];
  const next = builtResorts[(index + 1) % builtResorts.length];

  return (
    <>
      <section className="relative flex h-[75vh] min-h-[560px] w-full items-end overflow-hidden">
        <Image
          src={resort.heroImage}
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
            <p className="mt-4 text-sm text-ivory/70">{resort.stayDates}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Kicker>The Story</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {resort.tagline}
            </h2>
            {resort.story.map((paragraph, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed text-ink/70 ${i === 0 ? "mt-6" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl bg-soft-lilac/40 p-8">
              <Kicker>Key Facts</Kicker>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="kicker text-amethyst/70">Location</dt>
                  <dd className="mt-1 text-ink/70">{resort.keyFacts.location}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst/70">Villas</dt>
                  <dd className="mt-1 text-ink/70">{resort.keyFacts.villas}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst/70">Facilities</dt>
                  <dd className="mt-1 text-ink/70">{resort.keyFacts.facilities}</dd>
                </div>
                <div>
                  <dt className="kicker text-amethyst/70">Official Website</dt>
                  <dd className="mt-1 text-ink/40">
                    To be confirmed by resort partner
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>Gallery</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              Life at {resort.name}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Gallery images={resort.gallery} />
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
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <Link
            href={`/resorts/${previous.slug}`}
            className="text-amethyst hover:text-aubergine"
          >
            ← {previous.name}
          </Link>
          <Link href="/#resorts" className="kicker text-ink/40 hover:text-amethyst">
            All Resorts
          </Link>
          <Link
            href={`/resorts/${next.slug}`}
            className="text-amethyst hover:text-aubergine"
          >
            {next.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
