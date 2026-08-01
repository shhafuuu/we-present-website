# Cases: source extract and provenance

Every figure published in the Cases section must trace to a slide in one of the three
COATI decks supplied on 1 August 2026. Those decks total 583MB (the company deck alone
is 571MB), so they are gitignored and live only on local disk at the repo's parent
directory. This file is the audit trail that survives without them.

Extracted 1 August 2026 by unzipping each `.pptx` and reading the `<a:t>` runs from
`ppt/slides/slideN.xml`.

| Deck | File | Slides |
| --- | --- | --- |
| Company | `Company Presentations/Сoati Final version (обновлена 10 июля 2026).pptx` | 30 |
| PR and media | `PR & Media opportunities presentations.pptx` | 39 |
| Sales and marketing | `Sales & Marketing opportunities presentations.pptx` | 50 |

---

## The publication filter

The decks mix delivered work with sales proposals. Only these are publishable:

- Slides headed **"Examples of our previous successful…"**
- The company deck's **"Real numbers speak louder than words"** (slides 16, 17) and
  **"Real facts speak louder than words"** (slides 18, 20, 21)

**Not publishable.** The PR deck is a template written around a sample client,
"Dharana at Shillim", who is named on slides 16, 17 and 36. Award packages (slides 2
and 3), influencer shortlists (slides 8 to 11), magazine barter terms (slides 16 to 18,
27 to 29) and the radio proposal (slide 36) are all pitches describing what COATI
*could* arrange, not what it has delivered.

Two further handling rules from the spec, both confirmed against the source:

- **Revenue is redacted.** The Sheraton email on company slide 16 literally reads
  "generating $\*\*\*\*\*\*\* in revenue". Publish room nights and percentages only.
- **Partner emails are paraphrased**, never quoted verbatim. Company slide 16 carries
  the Sheraton letter, slide 16 the Holiday Inn Kandooma report, slide 17 the Fushifaru
  letter.

---

## Tier 1: hard numbers, verified against source

| Partner | Published figure | Source | Verified |
| --- | --- | --- | --- |
| Cinnamon Maldives | 19,854 room nights across 4 hotels, Apr to Dec 2025, +20% vs 2024 | Company s16 | Exact |
| Sheraton Maldives Full Moon | 98% sales growth 2023 to 2025 (incl. +34% 2024 to 2025); 4,287 room nights in 2025 | Company s16 | Exact |
| Holiday Inn Resort Kandooma | 6,750 room nights; November 2025 delivered 1,315 room nights, 443 more than November 2024 | Company s16 | See note 1 |
| Fushifaru Maldives | +73% vs 2021 (RU), +28% vs 2024 (RU), +143% vs 2022 (KZ) | Company s17 | See note 2 |
| Walkers Tours, Sri Lanka | +60% growth in the first year of partnership, 2023 to 2024 | Company s17 | Exact |
| Happy Planet DMC, Mauritius | 7 new tour operator contracts signed, 2025 | Company s16 | Exact |
| Ministry of Heritage and Tourism of Oman | Appointed official representative, 2025 | Company s21 | See note 3 |
| Fashion Travel Awards 2026 | Best Representative Company in Russia | Company s10 | Exact |

**Note 1 — Kandooma.** The spec's table abbreviates this as "Nov 2025 +443 YoY", which
reads as a percentage. The source is an absolute increase: 1,315 room nights in
November 2025, "which is 443 more than in November last year". Published as the
absolute figure.

**Note 2 — Fushifaru baselines.** The source carries five figures with different
baselines: +143% vs 2022 (KZ), +73% vs 2021 (RU), +28% vs 2022 (RU), +23% vs 2023 (RU),
+28% vs 2024 (RU). The spec lists "+143% Kazakhstan" without its baseline year. Each
published percentage keeps its baseline so none of them is ambiguous.

**Note 3 — Oman, NOT YET PUBLISHABLE.** Appendix D lists as an open point "whether the
representation may be published as a case, and whether the ministry logo may be used".
The case ships with `published: false` until the client confirms. The related figure on
the same slide, +147% Russian arrivals to Oman in 2025, is held back with it.

---

## The "11 years in market" figure: traces, but check the arithmetic

Spec Appendix C.2 specifies three stat-rail figures: 19,854 room nights, 15,000+ agents,
and **11 years in market**. All three trace.

The third is easy to mis-audit, because the obvious candidates on the team slide do not
support it: COATI was founded in **2020** (6 years to 2026), and Regina Rudakova is
"backed by 19 years of expertise", leading operators "since 2006" (20 years). Neither
is 11.

It comes instead from the achievements slide, which states **"11 years of expertise"**,
and from "Successfully operating **since 2014** in tourism and since 2020 as a
representative office". 2014 to 2025 is 11 years, which is when the figure was written.

**Open point for the client.** On a 2014 basis the figure is 12 in 2026, not 11.
Published as 11 because that is the client's own current wording, but it wants
confirming, and it will need review again each January. Consider replacing it with the
founding year, which does not go stale.

---

## Tier 2: reach and media, all from "previous successful" slides

- **Print** (PR s19 to s26): Aeroflot and Kavkaz Air in-flight, Hello!, Flight Line,
  Redesign, Vash Azimuth, Travel Time, Moda Topical, FB. Source also shows SMISLI and
  Philosophy of Travel, which the spec's Appendix C omits.
- **Digital** (PR s30 to s35): Hello! including a GM interview, SNOB, Russian Traveller,
  TTG Russia, Top Hotels, Discovery, Moda Topical.
- **Radio** (PR s37): Business FM St Petersburg collaboration confirmed. The ~300,000
  weekly listener figure comes from the *proposal* slide 36 and is the station's own
  stated reach, not a COATI result. Treat as context, not as an outcome.
- **Influencers and celebrities** (PR s12 to s15): Regina Todorenko (7.7M), Katya Lel,
  Anna Semenovich, Anastasia Volochkova, Tatyana Chuprova (735K), momsmile (612K),
  Anastasia Tukmacheva, Irina Nagaets, Sasha Koshkina, Ekaterina Velichkina. Present as
  past collaborations, never as ongoing endorsements.
- **Awards attended** (PR s4 to s7): Fashion TV Channel Awards 2023, Moda Topical 2023
  and 2025, FB Award "People of the Year" 2024 and 2025, Fashion Destination Awards
  2025, Fashion Beauty Awards 2025, White Wedding 2025, Fashion Kids 2025.
- **Events** (Sales s18): 1,000+ agents reached annually, 100+ new partners after each
  roadshow, 90% of seminar attendees become more active sellers.
- **Network** (Sales s21, s36, s38, s39): 15,000+ agent database, Telegram 4.5K,
  Instagram 2.5K.
- **Digital and OTA** (Sales s41, s47): Yandex Travel held 28.85% of the Russian OTA
  market in 2025; Sletat.ru joint campaign, 500 branded offices, 2.5M tour searches
  daily.

---

## Additional verified facts the spec's table omits

Available if the client wants more cases. All from "Real facts" slides, all delivered
work, none currently published.

- Le Meridien Maldives Resort & Spa: +35% sales growth 2023 vs 2022 (s17)
- Appointed official representative for Sheraton Full Moon Maldives by Marriott
  International, 2024; performance led to the Marriott contract expanding to Dubai (s20)
- Cluster agreement extended with Cinnamon Hotels & Resorts (s20)
- Exclusive full-resort buy-outs of Oaga Art and Fushifaru Maldives, 2023 to 2024, for a
  major Russian media company, 150+ attendees (s18)
- +147% increase in Russian arrivals to Oman in 2025 (s21, held with the Oman case)
