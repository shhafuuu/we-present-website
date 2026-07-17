export type Resort = {
  slug: string;
  name: string;
  atoll: string;
  tagline: string;
  cardImage: string;
  logo: string;
  logoBg: "light" | "dark";
  built: boolean;
};

export const resorts: Resort[] = [
  {
    slug: "so-maldives",
    name: "SO/ Maldives",
    atoll: "Emboodhu Finolhu, South Male Atoll",
    tagline: "Fashion-forward playfulness, one lagoon from the capital.",
    cardImage: "/images/resorts/so-maldives/card.jpg",
    logo: "/images/logos/so-maldives.png",
    logoBg: "light",
    built: false,
  },
  {
    slug: "fushifaru",
    name: "Fushifaru Maldives",
    atoll: "Lhaviyani Atoll",
    tagline: "An intimate reef-fringed island built for slow mornings.",
    cardImage: "/images/resorts/fushifaru/card.jpg",
    logo: "/images/logos/fushifaru.png",
    logoBg: "light",
    built: true,
  },
  {
    slug: "meyyafushi",
    name: "Meyyafushi Maldives",
    atoll: "Raa Atoll",
    tagline: "Barefoot elegance on one of the Maldives' newest islands.",
    cardImage: "/images/resorts/meyyafushi/card.jpg",
    logo: "/images/logos/meyyafushi.png",
    logoBg: "light",
    built: false,
  },
  {
    slug: "madifushi",
    name: "Madifushi Private Island",
    atoll: "Thaa Atoll",
    tagline: "A private-island retreat for the final, unhurried leg.",
    cardImage: "/images/resorts/madifushi/card.jpg",
    logo: "/images/logos/madifushi.png",
    logoBg: "dark",
    built: false,
  },
];

export const getResort = (slug: string) =>
  resorts.find((resort) => resort.slug === slug);
