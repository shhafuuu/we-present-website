import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { getTour, tours } from "@/lib/tours";

export function generateStaticParams() {
  return tours.filter((t) => t.status === "confirmed").map((t) => ({ slug: t.slug }));
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);

  if (!tour || tour.status !== "confirmed") {
    notFound();
  }

  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker tone="ivory">{tour.destination}</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              {tour.name}
            </h1>
            <p className="mt-4 text-sm text-ivory/60">{tour.dates}</p>
            <p className="mt-6 text-ivory/70">{tour.summary}</p>
          </Reveal>
        </div>
      </section>

      {tour.ttmOverview && (
        <section className="bg-soft-lilac/40 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Kicker>TTM Maldives 2026</Kicker>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                {tour.ttmOverview}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Kicker>Itinerary</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              The full itinerary
            </h2>
          </Reveal>

          <div className="mt-14 space-y-10 border-l border-amethyst/15 pl-8">
            {tour.stops.map((stop, i) => (
              <Reveal key={i} delay={i * 0.08} className="relative">
                <span className="absolute -left-[2.55rem] top-1.5 h-3 w-3 rounded-full bg-gold" />
                <p className="kicker text-gold">{stop.dates}</p>
                <h3 className="font-display mt-2 text-xl text-aubergine">
                  {stop.resortSlug ? (
                    <Link
                      href={`/resorts/${stop.resortSlug}`}
                      className="hover:text-amethyst"
                    >
                      {stop.label}
                    </Link>
                  ) : (
                    stop.label
                  )}
                </h3>
                <p className="mt-1 text-sm text-ink/60">{stop.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-amethyst/10 bg-ivory px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/tours" className="text-sm text-amethyst hover:text-aubergine">
            ← All Tours
          </Link>
        </div>
      </section>
    </>
  );
}
