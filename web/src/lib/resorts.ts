export type Resort = {
  slug: string;
  name: string;
  atoll: string;
  tagline: string;
  cardImage: string;
  heroImage: string;
  logo: string;
  logoBg: "light" | "dark";
  built: boolean;
  stayDates: string;
  story: string[];
  keyFacts: {
    location: string;
    villas: string;
    facilities: string;
  };
  gallery: { src: string; alt: string }[];
};

export const resorts: Resort[] = [
  {
    slug: "so-maldives",
    name: "SO/ Maldives",
    atoll: "Emboodhu Finolhu, South Male Atoll",
    tagline: "Fashion-forward playfulness, one lagoon from the capital.",
    cardImage: "/images/resorts/so-maldives/card.jpg",
    heroImage: "/images/resorts/so-maldives/hero.jpg",
    logo: "/images/logos/so-maldives.png",
    logoBg: "light",
    built: true,
    stayDates: "17–19 Aug 2026 · Tour 1, stop 1 (2 nights)",
    story: [
      "A short boat transfer from Male brings you to a lagoon where fashion-forward design meets barefoot ease. SO/ Maldives wears its playful, couture-inspired identity everywhere — from the Lazuli Beach Club to the sculptural Arrival Pavilion — without losing sight of the reef just beyond the villas.",
      "For the We Present tour, SO/ is the opening or closing stop: two nights to test the Nest & the Zone activity spaces, dine at the Citronelle Club, and see first-hand why the property reads as one of the most distinctive addresses in South Male Atoll.",
    ],
    keyFacts: {
      location: "South Male Atoll, Maldives — 35 min speedboat from Male",
      villas: "Beach Pool Villa Collection & Water Pool Villa Collection",
      facilities:
        "Lazuli Beach Club, Citronelle Club, The Nest & The Zone, Wellness Camp spa",
    },
    gallery: [
      { src: "/images/resorts/so-maldives/hero.jpg", alt: "Aerial view of SO/ Maldives overwater villas" },
      { src: "/images/resorts/so-maldives/villa.jpg", alt: "Beach Pool Villa Collection interior" },
      { src: "/images/resorts/so-maldives/dining.jpg", alt: "The Citronelle Club by day" },
      { src: "/images/resorts/so-maldives/spa.jpg", alt: "Aqua yoga at the Wellness Camp" },
      { src: "/images/resorts/so-maldives/reef.jpg", alt: "House reef at SO/ Maldives" },
      { src: "/images/resorts/so-maldives/arrival.jpg", alt: "Arrival Pavilion decoration" },
      { src: "/images/resorts/so-maldives/activity.jpg", alt: "Kids Club swing with family" },
      { src: "/images/resorts/so-maldives/lifestyle.jpg", alt: "Kayaking at SO/ Maldives" },
    ],
  },
  {
    slug: "fushifaru",
    name: "Fushifaru Maldives",
    atoll: "Lhaviyani Atoll",
    tagline: "An intimate reef-fringed island built for slow mornings.",
    cardImage: "/images/resorts/fushifaru/card.jpg",
    heroImage: "/images/resorts/fushifaru/hero.jpg",
    logo: "/images/logos/fushifaru.png",
    logoBg: "light",
    built: true,
    stayDates: "19–21 Aug 2026 · Tour 1, stop 2 (2 nights)",
    story: [
      "Fushifaru sits on its own private reef, a short seaplane hop from Male, where mornings begin with the tide and the days slow to the pace of the lagoon. Overwater and beach villas face an uninterrupted horizon; the house reef, reachable by a short swim from most villas, is among the most accessible in the atoll.",
      "For the We Present tour, Fushifaru is the second stop — two nights to dive the house reef, unwind at Heylhi Spa, and experience the island’s understated, barefoot-luxury hospitality first-hand.",
    ],
    keyFacts: {
      location: "Lhaviyani Atoll, Maldives — 35 min seaplane from Male",
      villas: "Beach Villas, Water Villas & Sunset Water Villas",
      facilities:
        "Heylhi Spa, PADI dive centre, Greenfushi sustainability hub, kids club",
    },
    gallery: [
      { src: "/images/resorts/fushifaru/lifestyle.jpg", alt: "Fushifaru beach deck at sunset" },
      { src: "/images/resorts/fushifaru/villa.jpg", alt: "Beach Villa Sunrise interior" },
      { src: "/images/resorts/fushifaru/dining.jpg", alt: "Dining at Fushifaru" },
      { src: "/images/resorts/fushifaru/spa.jpg", alt: "Heylhi Spa treatment room" },
      { src: "/images/resorts/fushifaru/sandbank.jpg", alt: "Fushifaru sandbank" },
      { src: "/images/resorts/fushifaru/dive.jpg", alt: "Diving with a sea turtle" },
      { src: "/images/resorts/fushifaru/island.jpg", alt: "Aerial view around the island" },
      { src: "/images/resorts/fushifaru/yoga.jpg", alt: "Yoga session at Fushifaru" },
    ],
  },
  {
    slug: "meyyafushi",
    name: "Meyyafushi Maldives",
    atoll: "Raa Atoll",
    tagline: "Barefoot elegance on one of the Maldives' newest islands.",
    cardImage: "/images/resorts/meyyafushi/card.jpg",
    heroImage: "/images/resorts/meyyafushi/hero.jpg",
    logo: "/images/logos/meyyafushi.png",
    logoBg: "light",
    built: true,
    stayDates: "21–23 Aug 2026 · Tour 1, stop 3 (2 nights)",
    story: [
      "One of the newest additions to Raa Atoll, Meyyafushi pairs a still-fresh design language with an unusually deep list of overwater firsts — an overwater fitness centre, an overwater wine cellar, a 24-hour cafe — set against a genuinely quiet, barefoot island.",
      "As the closing stop on Tour 1, Meyyafushi gives the group two nights to see how a brand-new property balances its sustainability programme with the kind of polish agents will want to describe to their own clients.",
    ],
    keyFacts: {
      location: "Raa Atoll, Maldives — seaplane from Male",
      villas: "Beach Pool Villas & Two-Bedroom Semi-Ocean Pool Villas",
      facilities:
        "Overwater fitness centre, overwater wine cellar, Kokko Kids Club, Baa main bar",
    },
    gallery: [
      { src: "/images/resorts/meyyafushi/hero.jpg", alt: "Aerial view of Meyyafushi Maldives" },
      { src: "/images/resorts/meyyafushi/villa.jpg", alt: "Beach Pool Villa bedroom" },
      { src: "/images/resorts/meyyafushi/dining.jpg", alt: "Baa main bar" },
      { src: "/images/resorts/meyyafushi/spa.jpg", alt: "Overwater fitness centre" },
      { src: "/images/resorts/meyyafushi/kids.jpg", alt: "Kokko Kids Club" },
      { src: "/images/resorts/meyyafushi/lifestyle.jpg", alt: "Overwater wine cellar" },
      { src: "/images/resorts/meyyafushi/sustainability.jpg", alt: "Solar panels at Meyyafushi" },
      { src: "/images/resorts/meyyafushi/aerial2.jpg", alt: "Island aerial view" },
    ],
  },
  {
    slug: "madifushi",
    name: "Madifushi Private Island",
    atoll: "Thaa Atoll",
    tagline: "A private-island retreat for the final, unhurried leg.",
    cardImage: "/images/resorts/madifushi/card.jpg",
    heroImage: "/images/resorts/madifushi/hero.jpg",
    logo: "/images/logos/madifushi.png",
    logoBg: "dark",
    built: true,
    stayDates: "Tour 2 · dates to be confirmed",
    story: [
      "Madifushi Private Island sits further south in Thaa Atoll, less visited than the capital-adjacent atolls and quieter for it. The property leans into that privacy — Serene Pool Villas, a Mandara Spa outpost, and a dolphin-cruise programme that takes advantage of the atoll's open water.",
      "Madifushi was the fourth stop on the original Tour 2 itinerary; whether it remains within the shorter revised window is still being confirmed with the client (see the Technical Specification, Section 3.3).",
    ],
    keyFacts: {
      location: "Thaa Atoll, Maldives — domestic flight + speedboat from Male",
      villas: "Serene Pool Villas",
      facilities: "Mandara Spa, Bella Six restaurant, Kokko Learning Studio, dolphin cruises",
    },
    gallery: [
      { src: "/images/resorts/madifushi/hero.jpg", alt: "Aerial view of Madifushi Private Island" },
      { src: "/images/resorts/madifushi/villa.jpg", alt: "Serene Pool Villa" },
      { src: "/images/resorts/madifushi/dining.jpg", alt: "Bella Six restaurant" },
      { src: "/images/resorts/madifushi/spa.jpg", alt: "Mandara Spa treatment room" },
      { src: "/images/resorts/madifushi/activity.jpg", alt: "Dolphin cruise" },
      { src: "/images/resorts/madifushi/kids.jpg", alt: "Kokko Learning Studio" },
      { src: "/images/resorts/madifushi/lifestyle.jpg", alt: "Life at Madifushi Private Island" },
    ],
  },
];

export const getResort = (slug: string) =>
  resorts.find((resort) => resort.slug === slug);
