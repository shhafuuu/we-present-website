import type { Locale } from "@/i18n/config";

type LocalizedString = { en: string; ru: string };

export type TourStop = {
  label: string;
  dates: LocalizedString;
  note: LocalizedString;
  resortSlug?: string;
};

export type Tour = {
  slug: string;
  year: string;
  name: LocalizedString;
  destination: LocalizedString;
  dates: LocalizedString;
  status: "confirmed" | "pending";
  summary: LocalizedString;
  stops: TourStop[];
  ttmOverview?: LocalizedString;
};

export const tours: Tour[] = [
  {
    slug: "maldives-tour-1",
    year: "2026",
    name: { en: "Maldives · Tour 1", ru: "Мальдивы · Тур 1" },
    destination: { en: "Maldives", ru: "Мальдивы" },
    dates: { en: "17–23 August 2026", ru: "17–23 августа 2026" },
    status: "confirmed",
    summary: {
      en: "A three-resort familiarization tour across three atolls — the same concept as Tour 2, without the Madifushi stop and without TTM attendance.",
      ru: "Ознакомительный тур по трём курортам в трёх атоллах — та же концепция, что и Тур 2, но без остановки на Madifushi и без участия в TTM.",
    },
    stops: [
      {
        label: "SO/ Maldives",
        dates: { en: "17–19 Aug", ru: "17–19 авг" },
        note: { en: "Resort stop 1.", ru: "Остановка 1." },
        resortSlug: "so-maldives",
      },
      {
        label: "Fushifaru Maldives",
        dates: { en: "19–21 Aug", ru: "19–21 авг" },
        note: { en: "Resort stop 2.", ru: "Остановка 2." },
        resortSlug: "fushifaru",
      },
      {
        label: "Meyyafushi Maldives",
        dates: { en: "21–23 Aug", ru: "21–23 авг" },
        note: { en: "Resort stop 3; departure 23 Aug.", ru: "Остановка 3; вылет 23 авг." },
        resortSlug: "meyyafushi",
      },
    ],
  },
  {
    slug: "maldives-ttm-tour-2",
    year: "2026",
    name: { en: "Maldives + TTM · Tour 2", ru: "Мальдивы + TTM · Тур 2" },
    destination: { en: "Maldives", ru: "Мальдивы" },
    dates: { en: "28 August – 3 September 2026", ru: "28 августа – 3 сентября 2026" },
    status: "confirmed",
    summary: {
      en: "A Maldives tour combining attendance at Travel Trade Maldives (TTM) 2026 with a partner-resort tour. End date revised to 3 September per the client's calendar.",
      ru: "Тур по Мальдивам, совмещающий участие в Travel Trade Maldives (TTM) 2026 с туром по курортам-партнёрам. Дата окончания перенесена на 3 сентября по календарю клиента.",
    },
    ttmOverview: {
      en: "Travel Trade Maldives (TTM) 2026 is the destination's leading trade event, now in its 10th edition, with an Awards & Gala Night on 27 August. The We Present group attends TTM before moving on to the resort stops below.",
      ru: "Travel Trade Maldives (TTM) 2026 — ведущее торговое мероприятие направления, уже 10-й сезон, с гала-вечером и церемонией награждения 27 августа. Группа We Present посещает TTM перед тем, как отправиться по курортам, указанным ниже.",
    },
    stops: [
      {
        label: "TTM Maldives",
        dates: { en: "26–27 Aug", ru: "26–27 авг" },
        note: {
          en: "Travel Trade Maldives 2026 (10th edition); Awards & Gala Night 27 Aug.",
          ru: "Travel Trade Maldives 2026 (10-й сезон); гала-вечер и награждение 27 авг.",
        },
      },
      {
        label: "Fushifaru Maldives",
        dates: { en: "28–30 Aug", ru: "28–30 авг" },
        note: { en: "Resort stop 1.", ru: "Остановка 1." },
        resortSlug: "fushifaru",
      },
      {
        label: "Meyyafushi Maldives",
        dates: { en: "30 Aug–1 Sep", ru: "30 авг–1 сен" },
        note: { en: "Resort stop 2.", ru: "Остановка 2." },
        resortSlug: "meyyafushi",
      },
      {
        label: "SO/ Maldives",
        dates: { en: "1–3 Sep", ru: "1–3 сен" },
        note: { en: "Resort stop 3; departure 3 Sep.", ru: "Остановка 3; вылет 3 сен." },
        resortSlug: "so-maldives",
      },
      {
        label: "Madifushi Private Island",
        dates: { en: "To confirm", ru: "Уточняется" },
        note: {
          en: "Inclusion within the shorter window is being confirmed with the client.",
          ru: "Включение в сокращённый график уточняется с клиентом.",
        },
        resortSlug: "madifushi",
      },
    ],
  },
  {
    slug: "cinnamon-resorts-maldives",
    year: "2026",
    name: { en: "Cinnamon Resorts Maldives", ru: "Cinnamon Resorts Maldives" },
    destination: { en: "Maldives", ru: "Мальдивы" },
    dates: { en: "October 2026", ru: "Октябрь 2026" },
    status: "pending",
    summary: {
      en: "A separate Maldives familiarization fam with Cinnamon Resorts, in October 2026. Exact dates and resort line-up are not yet set; the tour appears on the calendar as \"coming soon\" and will be completed via the content portal once confirmed.",
      ru: "Отдельный ознакомительный тур по Мальдивам с Cinnamon Resorts в октябре 2026 года. Точные даты и список отелей пока не определены; в календаре тур отображается как «скоро» и будет дополнен через контент-портал после подтверждения.",
    },
    stops: [],
  },
  {
    slug: "oman",
    year: "2026",
    name: { en: "Oman", ru: "Оман" },
    destination: { en: "Oman", ru: "Оман" },
    dates: { en: "December 2026", ru: "Декабрь 2026" },
    status: "pending",
    summary: {
      en: 'An Oman familiarization tour in December 2026. Exact dates and resort line-up are not yet set; the tour appears on the calendar as "dates coming soon" and will be completed via the content portal once confirmed.',
      ru: "Ознакомительный тур в Оман в декабре 2026 года. Точные даты и список отелей пока не определены; в календаре тур отображается как «даты уточняются» и будет дополнен через контент-портал после подтверждения.",
    },
    stops: [],
  },
  {
    slug: "kenya",
    year: "2026 / 27",
    name: { en: "Kenya", ru: "Кения" },
    destination: { en: "Kenya", ru: "Кения" },
    dates: { en: "Dates to be confirmed", ru: "Даты уточняются" },
    status: "pending",
    summary: {
      en: "A Kenya familiarization tour; dates to be confirmed. The tour appears on the calendar as \"coming soon\" and will be completed via the content portal once confirmed.",
      ru: "Ознакомительный тур в Кению; даты уточняются. В календаре тур отображается как «скоро» и будет дополнен через контент-портал после подтверждения.",
    },
    stops: [],
  },
];

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);
export const t = (value: LocalizedString, locale: Locale) => value[locale];
