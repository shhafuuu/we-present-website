import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };
type LocalizedList = { en: string[]; ru: string[] };

export type Resort = {
  slug: string;
  name: string;
  atoll: LocalizedString;
  tagline: LocalizedString;
  cardImage: string;
  heroImage: string;
  logo: string;
  logoBg: "light" | "dark";
  built: boolean;
  stayDates: LocalizedString;
  story: LocalizedList;
  keyFacts: {
    location: LocalizedString;
    villas: LocalizedString;
    facilities: LocalizedString;
  };
  gallery: { src: string; alt: string }[];
};

export const resorts: Resort[] = [
  {
    slug: "so-maldives",
    name: "SO/ Maldives",
    atoll: { en: "Emboodhu Finolhu, South Male Atoll", ru: "Эмбooду Финолху, Южный Мале Атолл" },
    tagline: {
      en: "Fashion-forward playfulness, one lagoon from the capital.",
      ru: "Модная, игривая эстетика в одной лагуне от столицы.",
    },
    cardImage: "/images/resorts/so-maldives/card.jpg",
    heroImage: "/images/resorts/so-maldives/hero.jpg",
    logo: "/images/logos/so-maldives.png",
    logoBg: "light",
    built: true,
    stayDates: {
      en: "17–19 Aug 2026 · Tour 1, stop 1 (2 nights)",
      ru: "17–19 августа 2026 · Тур 1, остановка 1 (2 ночи)",
    },
    story: {
      en: [
        "A short boat transfer from Male brings you to a lagoon where fashion-forward design meets barefoot ease. SO/ Maldives wears its playful, couture-inspired identity everywhere — from the Lazuli Beach Club to the sculptural Arrival Pavilion — without losing sight of the reef just beyond the villas.",
        "For the We Present tour, SO/ is the opening or closing stop: two nights to test the Nest & the Zone activity spaces, dine at the Citronelle Club, and see first-hand why the property reads as one of the most distinctive addresses in South Male Atoll.",
      ],
      ru: [
        "Короткий трансфер на лодке от Мале приводит в лагуну, где модный дизайн сочетается с непринуждённой простотой. SO/ Maldives выражает свою игривую, вдохновлённую кутюром идентичность повсюду — от Lazuli Beach Club до скульптурного павильона прибытия — не теряя из виду риф прямо за виллами.",
        "В туре We Present SO/ становится первой или последней остановкой: две ночи, чтобы опробовать зоны The Nest & The Zone, поужинать в Citronelle Club и лично увидеть, почему этот отель считается одним из самых узнаваемых адресов Южного Мале Атолла.",
      ],
    },
    keyFacts: {
      location: {
        en: "South Male Atoll, Maldives — 35 min speedboat from Male",
        ru: "Южный Мале Атолл, Мальдивы — 35 минут на скоростном катере от Мале",
      },
      villas: {
        en: "Beach Pool Villa Collection & Water Pool Villa Collection",
        ru: "Коллекция Beach Pool Villa и коллекция Water Pool Villa",
      },
      facilities: {
        en: "Lazuli Beach Club, Citronelle Club, The Nest & The Zone, Wellness Camp spa",
        ru: "Lazuli Beach Club, Citronelle Club, The Nest & The Zone, спа Wellness Camp",
      },
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
    atoll: { en: "Lhaviyani Atoll", ru: "Атолл Лавияни" },
    tagline: {
      en: "An intimate reef-fringed island built for slow mornings.",
      ru: "Уединённый остров у рифа, созданный для неспешных утр.",
    },
    cardImage: "/images/resorts/fushifaru/card.jpg",
    heroImage: "/images/resorts/fushifaru/hero.jpg",
    logo: "/images/logos/fushifaru.png",
    logoBg: "light",
    built: true,
    stayDates: {
      en: "19–21 Aug 2026 · Tour 1, stop 2 (2 nights)",
      ru: "19–21 августа 2026 · Тур 1, остановка 2 (2 ночи)",
    },
    story: {
      en: [
        "Fushifaru sits on its own private reef, a short seaplane hop from Male, where mornings begin with the tide and the days slow to the pace of the lagoon. Overwater and beach villas face an uninterrupted horizon; the house reef, reachable by a short swim from most villas, is among the most accessible in the atoll.",
        "For the We Present tour, Fushifaru is the second stop — two nights to dive the house reef, unwind at Heylhi Spa, and experience the island’s understated, barefoot-luxury hospitality first-hand.",
      ],
      ru: [
        "Fushifaru расположен на собственном рифе, в нескольких минutах на гидросамолёте от Мале, где утро начинается с приливом, а дни текут в ритме лагуны. Виллы над водой и на пляже смотрят на безграничный горизонт; домашний риф, до которого от большинства вилл можно доплыть за пару минут, — один из самых доступных в атолле.",
        "В туре We Present Fushifaru становится второй остановкой: две ночи, чтобы понырять у домашнего рифа, отдохнуть в Heylhi Spa и лично познакомиться со сдержанным, но роскошным гостеприимством острова.",
      ],
    },
    keyFacts: {
      location: {
        en: "Lhaviyani Atoll, Maldives — 35 min seaplane from Male",
        ru: "Атолл Лавияни, Мальдивы — 35 минут на гидросамолёте от Мале",
      },
      villas: {
        en: "Beach Villas, Water Villas & Sunset Water Villas",
        ru: "Пляжные виллы, виллы над водой и виллы Sunset Water Villa",
      },
      facilities: {
        en: "Heylhi Spa, PADI dive centre, Greenfushi sustainability hub, kids club",
        ru: "Heylhi Spa, дайв-центр PADI, эко-центр Greenfushi, детский клуб",
      },
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
    atoll: { en: "Raa Atoll", ru: "Атолл Раа" },
    tagline: {
      en: "Barefoot elegance on one of the Maldives' newest islands.",
      ru: "Непринуждённая элегантность на одном из новейших островов Мальдив.",
    },
    cardImage: "/images/resorts/meyyafushi/card.jpg",
    heroImage: "/images/resorts/meyyafushi/hero.jpg",
    logo: "/images/logos/meyyafushi.png",
    logoBg: "light",
    built: true,
    stayDates: {
      en: "21–23 Aug 2026 · Tour 1, stop 3 (2 nights)",
      ru: "21–23 августа 2026 · Тур 1, остановка 3 (2 ночи)",
    },
    story: {
      en: [
        "One of the newest additions to Raa Atoll, Meyyafushi pairs a still-fresh design language with an unusually deep list of overwater firsts — an overwater fitness centre, an overwater wine cellar, a 24-hour cafe — set against a genuinely quiet, barefoot island.",
        "As the closing stop on Tour 1, Meyyafushi gives the group two nights to see how a brand-new property balances its sustainability programme with the kind of polish agents will want to describe to their own clients.",
      ],
      ru: [
        "Один из новейших отелей атолла Раа, Meyyafushi сочетает свежий дизайн с необычно длинным списком решений «впервые над водой» — фитнес-центр, винный погреб, кафе, работающее круглые сутки — на фоне по-настоящему тихого острова.",
        "Как заключительная остановка Тура 1, Meyyafushi даёт группе две ночи, чтобы увидеть, как совершенно новый отель сочетает программу устойчивого развития с тем уровнем подачи, который агенты захотят описывать своим клиентам.",
      ],
    },
    keyFacts: {
      location: {
        en: "Raa Atoll, Maldives — seaplane from Male",
        ru: "Атолл Раа, Мальдивы — гидросамолёт от Мале",
      },
      villas: {
        en: "Beach Pool Villas & Two-Bedroom Semi-Ocean Pool Villas",
        ru: "Beach Pool Villa и двухспальные Semi-Ocean Pool Villa",
      },
      facilities: {
        en: "Overwater fitness centre, overwater wine cellar, Kokko Kids Club, Baa main bar",
        ru: "Фитнес-центр над водой, винный погреб над водой, детский клуб Kokko, главный бар Baa",
      },
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
    atoll: { en: "Thaa Atoll", ru: "Атолл Тхаа" },
    tagline: {
      en: "A private-island retreat for the final, unhurried leg.",
      ru: "Уединённый частный остров для финального, неспешного этапа тура.",
    },
    cardImage: "/images/resorts/madifushi/card.jpg",
    heroImage: "/images/resorts/madifushi/hero.jpg",
    logo: "/images/logos/madifushi.png",
    logoBg: "dark",
    built: true,
    stayDates: {
      en: "Tour 2 · dates to be confirmed",
      ru: "Тур 2 · даты уточняются",
    },
    story: {
      en: [
        "Madifushi Private Island sits further south in Thaa Atoll, less visited than the capital-adjacent atolls and quieter for it. The property leans into that privacy — Serene Pool Villas, a Mandara Spa outpost, and a dolphin-cruise programme that takes advantage of the atoll's open water.",
        "Madifushi was the fourth stop on the original Tour 2 itinerary; whether it remains within the shorter revised window is still being confirmed with the client (see the Technical Specification, Section 3.3).",
      ],
      ru: [
        "Madifushi Private Island расположен южнее, в атолле Тхаа — менее посещаемом, чем атоллы рядом со столицей, и потому более тихом. Отель делает ставку на уединённость: виллы Serene Pool Villa, спа Mandara и программа круизов с дельфинами, использующая открытую воду атолла.",
        "Madifushi был четвёртой остановкой в первоначальном маршруте Тура 2; сохранится ли она в сокращённом графике, пока уточняется с клиентом (см. Техническое задание, раздел 3.3).",
      ],
    },
    keyFacts: {
      location: {
        en: "Thaa Atoll, Maldives — domestic flight + speedboat from Male",
        ru: "Атолл Тхаа, Мальдивы — внутренний рейс и скоростной катер от Мале",
      },
      villas: { en: "Serene Pool Villas", ru: "Виллы Serene Pool Villa" },
      facilities: {
        en: "Mandara Spa, Bella Six restaurant, Kokko Learning Studio, dolphin cruises",
        ru: "Спа Mandara, ресторан Bella Six, учебная студия Kokko, круизы с дельфинами",
      },
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

export const t = (value: LocalizedString, locale: Locale) => value[locale];
export const tl = (value: LocalizedList, locale: Locale) => value[locale];
