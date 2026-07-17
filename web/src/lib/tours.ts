export type TourStop = {
  label: string;
  dates: string;
  note: string;
  resortSlug?: string;
};

export type Tour = {
  slug: string;
  year: string;
  name: string;
  destination: string;
  dates: string;
  status: "confirmed" | "pending";
  summary: string;
  stops: TourStop[];
  ttmOverview?: string;
};

export const tours: Tour[] = [
  {
    slug: "maldives-tour-1",
    year: "2026",
    name: "Maldives · Tour 1",
    destination: "Maldives",
    dates: "17–23 August 2026",
    status: "confirmed",
    summary:
      "A three-resort familiarization tour across three atolls — the same concept as Tour 2, without the Madifushi stop and without TTM attendance.",
    stops: [
      { label: "SO/ Maldives", dates: "17–19 Aug", note: "Resort stop 1.", resortSlug: "so-maldives" },
      { label: "Fushifaru Maldives", dates: "19–21 Aug", note: "Resort stop 2.", resortSlug: "fushifaru" },
      { label: "Meyyafushi Maldives", dates: "21–23 Aug", note: "Resort stop 3; departure 23 Aug.", resortSlug: "meyyafushi" },
    ],
  },
  {
    slug: "maldives-ttm-tour-2",
    year: "2026",
    name: "Maldives + TTM · Tour 2",
    destination: "Maldives",
    dates: "28 August – 3 September 2026",
    status: "confirmed",
    summary:
      "The original inaugural tour, combining attendance at Travel Trade Maldives (TTM) 2026 with a partner-resort tour. End date revised to 3 September per the client's calendar.",
    ttmOverview:
      "Travel Trade Maldives (TTM) 2026 is the destination's leading trade event, now in its 10th edition, with an Awards & Gala Night on 27 August. The We Present group attends TTM before moving on to the resort stops below.",
    stops: [
      { label: "TTM Maldives", dates: "26–27 Aug", note: "Travel Trade Maldives 2026 (10th edition); Awards & Gala Night 27 Aug." },
      { label: "Fushifaru Maldives", dates: "28–30 Aug", note: "Resort stop 1.", resortSlug: "fushifaru" },
      { label: "Meyyafushi Maldives", dates: "30 Aug–1 Sep", note: "Resort stop 2.", resortSlug: "meyyafushi" },
      { label: "SO/ Maldives", dates: "1–3 Sep", note: "Resort stop 3; departure 3 Sep.", resortSlug: "so-maldives" },
      { label: "Madifushi Private Island", dates: "To confirm", note: "Inclusion within the shorter window is being confirmed with the client.", resortSlug: "madifushi" },
    ],
  },
  {
    slug: "oman",
    year: "2026",
    name: "Oman",
    destination: "Oman",
    dates: "December 2026",
    status: "pending",
    summary:
      "An Oman familiarization tour in December 2026. Exact dates and resort line-up are not yet set; the tour appears on the calendar as \"dates coming soon\" and will be completed via the content portal once confirmed.",
    stops: [],
  },
];

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);
