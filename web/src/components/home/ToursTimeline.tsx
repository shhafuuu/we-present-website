import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";

const TOURS = [
  {
    year: "2026",
    name: "Maldives · Tour 1",
    dates: "17–23 August 2026",
    note: "SO/ · Fushifaru · Meyyafushi",
    status: "confirmed" as const,
  },
  {
    year: "2026",
    name: "Maldives + TTM · Tour 2",
    dates: "28 August – 3 September 2026",
    note: "TTM Maldives 2026 · Fushifaru · Meyyafushi · SO/",
    status: "confirmed" as const,
  },
  {
    year: "2026",
    name: "Oman",
    dates: "December 2026",
    note: "Dates coming soon",
    status: "pending" as const,
  },
  {
    year: "2027",
    name: "Coming Soon",
    dates: "To be announced",
    note: "Further destinations planned",
    status: "pending" as const,
  },
];

export function ToursTimeline() {
  return (
    <section id="tours" className="bg-lavender-mist px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Kicker>Tours Calendar</Kicker>
          <h2 className="font-display mt-5 text-4xl text-aubergine sm:text-5xl">
            The 2026 season, at a glance
          </h2>
        </Reveal>

        <div className="mt-16 space-y-4">
          {TOURS.map((tour, i) => (
            <Reveal key={tour.name} delay={i * 0.08}>
              <div className="flex flex-col gap-3 rounded-2xl border border-amethyst/10 bg-ivory/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-5 sm:items-center">
                  <span className="font-display text-sm text-gold">
                    {tour.year}
                  </span>
                  <div className="h-10 w-px bg-amethyst/15" />
                  <div>
                    <h3 className="font-display text-xl text-aubergine sm:text-2xl">
                      {tour.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink/60">{tour.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-[3.25rem] sm:pl-0">
                  <span
                    className={`kicker rounded-full px-4 py-1.5 text-[0.65rem] ${
                      tour.status === "confirmed"
                        ? "bg-amethyst/10 text-amethyst"
                        : "bg-gold/15 text-gold"
                    }`}
                  >
                    {tour.dates}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-14 text-center">
          <Button href="/#resorts" variant="ghost">
            See the Resorts on Tour
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
