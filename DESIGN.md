---
name: We Present by COATI
description: A B2B familiarization-tour platform for the RU/CIS travel trade, spanning the Maldives, Oman, and Kenya
colors:
  aubergine: "#3e2c55"
  amethyst: "#6e4fa3"
  gold: "#c9a24b"
  soft-gold: "#ebdcb4"
  ivory: "#fcfaf6"
  lavender-mist: "#f3ecfb"
  soft-lilac: "#dcc9f0"
  lilac: "#c3a5e6"
  ink: "#2b2338"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.22em"
rounded:
  input: "8px"
  card: "16px"
  panel: "24px"
  full: "9999px"
spacing:
  section-x: "24px"
  section-x-lg: "40px"
  section-y-sm: "64px"
  section-y-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.aubergine}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.soft-gold}"
    textColor: "{colors.aubergine}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.amethyst}"
    rounded: "{rounded.full}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "10px 16px"
---

# Design System: We Present by COATI

## Overview

**Creative North Star: "The Curated Crossing"**

We Present's visual system is a selective, hand-picked passage between destinations and the RU/CIS travel professionals invited to cross into them. It carries the formal warmth of the aubergine-and-gold palette and serif display type, but holds that warmth with restraint: one decisive photograph per section rather than busy compositions, generous negative space, near-flat surfaces. Confidence comes from composure, not density or noise.

The system rejects two easy failure modes: cold corporate B2B (it isn't — the palette is warm, the type is serif and humanist, photography carries real weight) and loud travel-marketing maximalism (it isn't that either — no stacked gradients, no crowded grids, no shouting CTAs). It sits in between: a quietly confident, editorially restrained invitation.

**Key Characteristics:**
- Deep aubergine and warm gold carry the brand identity; amethyst and soft-lilac tints do the connective/structural work
- Playfair Display serif for all headings, Manrope sans for everything else, no third family
- Cards and panels are nearly flat at rest (shadow-card is barely visible); depth comes from color/tint layering, not shadow
- One full-bleed, decisive photograph leads most sections rather than photo grids or stock-collage treatments
- Motion is a single consistent fade-and-rise reveal, staggered per section, plus a small vocabulary of hover lifts and spring-based icon micro-interactions — never more than one animation idea competing for attention at once

## Colors

A warm, restrained palette built around one deep primary and one warm accent; violet tints do the section-to-section structural work instead of gray.

### Primary
- **Twilight Aubergine** (`#3e2c55`): the anchor color. Headline text on light backgrounds, dark section fills (page banners, the "Results" stage panel, the footer, the scrolled/dark header state), and the base tone every gradient banner resolves into.

### Secondary
- **Vivid Amethyst** (`#6e4fa3`): the connective accent. Kickers, nav-link states, card borders (almost always at 10–20% opacity, never solid), link text, mid-tone gradient stops.

### Tertiary
- **Antique Gold** (`#c9a24b`): the call-to-action and moment-of-delight color. Primary buttons, the header's "Register Interest" CTA, hover-state glows, small accent dots and underlines. Deliberately rare — reserved for actions and accents, never body text at small sizes (fails contrast).
- **Soft Gold** (`#ebdcb4`): gold's quiet hover state, not a standalone brand color.

### Neutral
- **Ivory** (`#fcfaf6`): the default page/card background — a true near-white, not a warm cream drift.
- **Ink** (`#2b2338`): body text color, a deep violet-black rather than pure gray, so text never feels disconnected from the palette.
- **Lavender Mist** (`#f3ecfb`): the palest structural tint, used to alternate section backgrounds without introducing a second hue.
- **Soft Lilac** (`#dcc9f0`) / **Lilac** (`#c3a5e6`): mid-tint violets used at partial opacity (`/40`, `/50`) for card and panel fills that need to sit a step above ivory without competing with amethyst-bordered cards; `lilac` alone is also the `::selection` color.

### Named Rules
**The Rare Gold Rule.** Gold is a spotlight, not a base color. It appears on primary CTAs, small accent marks, and hover glows — never as a large fill, never as small body text (contrast failure below ~4.5:1 at that size).

**The Tinted-Neutral Rule.** Section backgrounds alternate between ivory and lavender-mist/soft-lilac rather than white and gray — every neutral in this system carries the brand's own violet hue, never a true gray.

## Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** Manrope (with system sans-serif fallback)
**Label Font:** Manrope, distinguished by treatment (uppercase, wide tracking) rather than a separate family

**Character:** A classic serif/humanist-sans pairing carrying the formal-invitation register — Playfair's contrast and elegance for anything that announces, Manrope's warmth and clarity for anything that explains. Both subsets include Cyrillic, since RU is the primary-market locale, not an afterthought.

### Hierarchy
- **Display** (400, `text-4xl` to `text-6xl` responsive, tight line-height ~1.1): page banners and hero H1s. Playfair only appears at this scale and above — it's never used for UI chrome or small labels.
- **Headline** (400, `text-3xl` to `text-4xl`): section H2s (e.g. "What the platform creates", "Four islands, one tour").
- **Title** (400/500, `text-lg` to `text-2xl`): card titles, H3s within a section.
- **Body** (400, `text-sm` to `text-base`, `text-ink/70` when muted): paragraph copy. Muted text never drops below `/70` opacity — a recurring, deliberately-enforced contrast floor across this project.
- **Label** (600, `0.65rem`–`0.75rem`, uppercase, `0.22em` letter-spacing — the `.kicker` utility class): section eyebrows, nav links, badges, stage markers. The single most distinctive typographic signature in the system.

### Named Rules
**The Kicker Rule.** Any small uppercase label in this system runs through the shared `.kicker` class (Manrope 600, 0.22em tracking, 0.75rem) — never a one-off `text-xs uppercase tracking-wide` improvisation. One label treatment, applied consistently, is the system's quiet signature.

## Layout

Centered max-width containers (`max-w-3xl` for prose-heavy sections up to `max-w-7xl` for wide grids) with consistent horizontal padding (`px-6`, `lg:px-10`) and a vertical rhythm that alternates tight (`py-16`) and generous (`py-24`–`py-28`) section spacing rather than a single flat value throughout. Grids are responsive without hard breakpoint proliferation: `sm:grid-cols-2 lg:grid-cols-3/4`, or `auto-fit`-style patterns for card rows. The primary nav collapses to a hamburger below a custom `1400px` breakpoint (not the default `lg`/`xl` steps) — a deliberate fix for Russian nav labels running wider than their English equivalents.

**Wide imagery, narrow text.** Measured against the reference hotel sites the client shared (Aman, Mandarin Oriental, Oberoi, Six Senses, Peninsula, Bulgari, St Regis, Ritz-Carlton, Banyan Tree, Alila, Waldorf Astoria) at 1440px, the distance from viewport edge to the nearest visual block runs 25px (Aman) to 99px (Mandarin), with Oberoi full-bleed. Our `max-w-6xl` containers were leaving **144px** unused either side, and 208px on `/tours`. But the same sites keep body copy *narrow*: Aman's median paragraph measures ~326px, Mandarin's ~368px. The rule that falls out is not "make everything wider" — it is that **imagery earns width and prose does not**. `.container-wide` (96rem, in `globals.css`) is for image- and card-led sections only: galleries, case grids, destination and partner grids. Reading sections keep `max-w-2xl`–`max-w-4xl`.

**Known divergence from the references, deliberate.** Those sites use square corners and no card chrome at all — image plus caption sitting directly on the page ground, no border, fill, radius or shadow. That accounts for much of why they read lighter than we do, arguably more than the palette does. We have not adopted it: applying it to one section would look like a defect, and applying it site-wide is a change to the visual identity, not a layout tweak. Record it as an open design question rather than drifting toward it piecemeal.

## Elevation & Depth

Left open by the user to evolve rather than fixed as a hard rule for this pass: today, the system is nearly flat at rest (`shadow-card` is `0 1px 2px rgba(62,44,85,0.06)`, barely perceptible), and depth is conveyed mostly through color/tint layering (ivory vs. lavender-mist vs. soft-lilac panels) and a hover lift (`-translate-y-1` to `-translate-y-2`) rather than shadow growth. Future work may introduce more pronounced shadow treatment; this isn't a named, enforced rule the way the color and typography rules are.

### Shadow Vocabulary
- **card** (`box-shadow: 0 1px 2px rgba(62,44,85,0.06)`): the only shadow token in active use. Applied to nearly every card/panel at rest; hover states add lift (translate), not shadow growth, except gold-button hover which adds a soft `shadow-gold/20` glow.

## Shapes

Three deliberate radius steps, no in-between values: `rounded-full` (9999px) for every interactive pill — buttons, badges, the mobile-menu toggle's implied circle — `rounded-2xl` (16px) for cards and standard panels, and `rounded-3xl` (24px) for the largest feature panels (e.g. the About page's Value-journey stage cards). Borders, where present, are thin and low-opacity (`border-amethyst/10` to `/20`), never a heavy stroke.

## Components

### Buttons
- **Shape:** fully rounded pill (`rounded-full`, 9999px)
- **Primary:** gold background, aubergine text, `px-8 py-3.5`, `text-sm tracking-wide`
- **Hover / Focus:** background shifts to soft-gold, adds a soft gold glow shadow (`shadow-lg shadow-gold/20`); 300ms transition
- **Ghost:** transparent background, amethyst border at 40% opacity and amethyst text; hover fills to `amethyst/5` and solidifies the border. A light variant swaps amethyst for ivory when placed over a dark/photographic background.

### Cards / Containers
- **Corner Style:** `rounded-2xl` standard, `rounded-3xl` for large feature panels
- **Background:** ivory (on tinted section backgrounds) or soft-lilac/40–50% (on ivory section backgrounds) — always the opposite tone from its parent section, so cards read as a distinct surface
- **Shadow Strategy:** the near-invisible `shadow-card` token at rest; hover adds a translate-y lift (300–500ms), not shadow growth
- **Border:** thin amethyst border at 10% opacity, present on most cards as a quiet edge definition rather than a strong outline
- **Internal Padding:** generous, `p-6` to `p-10` depending on card size

### Inputs / Fields
- **Style:** `rounded-lg` (8px), ivory background, `border-amethyst/20`, `px-4 py-2.5`
- **Focus:** border shifts to gold, plus a soft `ring-2 ring-gold/30` glow — no color-only focus state, always a visible ring for accessibility
- **Labels:** sit above the field, `text-sm text-ink/70`, never inside as placeholder-only labeling

### Navigation
- **Style:** fixed header, frosted glass (`backdrop-blur-sm`) at all times. Two states: transparent-over-photo (`bg-aubergine/75`, ivory text/logo) before scroll, and solid (`bg-ivory/95`, aubergine text/logo, a hairline bottom shadow) after a 40px scroll threshold or when the mobile menu is open.
- **Link treatment:** kicker-style labels with an animated gold underline that draws in from 0 to full width on hover (`after:` pseudo-element, 300ms).
- **Mobile:** hamburger below 1400px, full-screen lavender-mist takeover panel with large Playfair links, fade-and-slide-down entrance (`y: -12 → 0`, 300ms).

### Value/Feature Panels (signature component)
Introduced in the About page's "Value" journey: instead of a flat grid of identical cards, panels progress through a color sequence (ivory → soft-lilac/40 → solid aubergine) so the final panel reads as a genuine focal point rather than one tile among equals. Numbered stage markers (`01`, `02`, `03`) are used deliberately here because the content *is* a real sequence — this doesn't license numbered eyebrows as default scaffolding elsewhere in the system.

## Do's and Don'ts

### Do:
- **Do** run every small uppercase label through the shared `.kicker` class — one label treatment system-wide.
- **Do** keep muted body text at `/70` opacity or higher against its background; this has been a recurring, actively-enforced contrast fix across this project.
- **Do** let one decisive photograph carry a section rather than a stock-photo collage; destination-neutral imagery (not single-resort amenity shots) where the copy itself is destination-neutral.
- **Do** use the `[0.22, 1, 0.36, 1]` custom ease-out curve with a 0.9s duration and per-item stagger for scroll reveals — the system's one consistent motion signature.
- **Do** reserve gold for actions and accents; let aubergine and amethyst carry structural/text weight.

### Don't:
- **Don't** use `text-gold` for small body text — it fails WCAG AA contrast at that size against light backgrounds; use `text-amethyst` or `text-ivory` (with a text-shadow over photographic hero imagery) instead.
- **Don't** stack multiple scrim/gradient treatments on a single hero photo to fix nav-contrast — this project hit that exact bug twice ("vignette" purple-hue complaints) before fixing it once, architecturally, at the Header component's own frosted-panel background. Fix contrast at the component that needs it, not by layering more gradients on the photo behind it.
- **Don't** lay a flat violet wash over cyan photography. Aubergine/amethyst sit near-opposite cyan on the wheel, so the two desaturate each other into a muddy grey-blue and the photo reads as fake — a colour problem, not an opacity one, and lowering the alpha never fixes it. The home hero instead carries a CSS `filter` grade (saturation down ~15%, hue pulled off pure cyan toward aubergine, shadows deepened, highlights warmed) so the image belongs to the palette with nothing sitting on top of it. Keep the grade in CSS, not baked into the file, so it stays tunable; give the type its own `text-shadow` for contrast.
- **Don't** put a card on a ground of its own colour. The Cases index shipped `bg-ivory` cards inside a `bg-ivory` section: a measured colour distance of **zero**, with only a hairline border implying a card at all, and they washed out completely. Light cards on ivory now use `bg-soft-lilac/55` (distance 32.6, comfortably past the 17.4 that marks a section seam here). Pixel-sample the pairing; do not trust that a border will carry it.
- **Don't** assume overlaid text can survive on an ungraded photograph. The home hero carries **no filter at all** at the client's request, and measured, ivory on it is 1.07:1 — 1.74:1 even mirrored into the calmest water, against a 3:1 floor. An image holding both white foam and dark water has no single text colour that works. Contrast is solved at the text instead, with a contained frosted panel (measured 6.29:1), the same move the header makes for its nav. A panel is legitimate; a full-bleed scrim over the photograph is the bug this project hit twice.
- **Don't** use near-identical adjacent tints (e.g. `bg-lavender-mist` next to `bg-soft-lilac/40`) for two sections that need a visible boundary — they compute to nearly the same RGB and the seam disappears. Verified by pixel-sampling, not assumption, more than once on this project.
- **Don't** default to numbered eyebrows (`01 / 02 / 03`) as section scaffolding — reserve numbering for content that is genuinely a sequence (like the Value journey's three real stages), not as a decorative habit.
