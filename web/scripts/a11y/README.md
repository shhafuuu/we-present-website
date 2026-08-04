# Contrast audit (WO-52)

Two scripts. Both need `npm run dev` on :3000, and both must be run from `web/`
so they resolve `playwright` and `pngjs` from `web/node_modules`.

```bash
node scripts/a11y/text-contrast.mjs     # every text node vs its computed ground
node scripts/a11y/surface-contrast.mjs  # text over media, section seams, cards
```

`text-contrast.mjs` walks every text node on every page in both locales, composites
the ancestor background stack, and reports anything under WCAG AA (4.5:1, or 3:1 for
large text). Change the viewport in the file to re-run at 390px; two defects were
mobile-only.

`surface-contrast.mjs` covers what computed CSS cannot: text sitting over
photography or a gradient (pixel-sampled from a real screenshot), adjacent section
grounds, and cards against the ground behind them.

## Three traps, all of which produced false failures before being fixed

1. **Tailwind v4 emits `oklab()` for any colour with an alpha modifier.** A regex
   over `rgb()` silently drops every translucent layer, which made the whole header
   nav look like 1:1. Both scripts resolve colour by painting the string onto white
   and onto black through a canvas and solving for straight RGBA, so they do not
   care what syntax the browser used.

2. **Antialiasing halos are not background.** A glyph edge is a blend of text and
   ground, so it sits at an intermediate luminance and reads as a failure. It cannot
   be excluded by colour distance, because a halo is genuinely far from the text
   colour. It can be excluded by population: on one 99x18 kicker the two real
   background bins held 1024 and 510 pixels and the halo held 33. The scripts keep
   only colours holding at least 15% of the largest bin.

3. **An element's own background must be included.** Starting the ancestor walk at
   `parentElement` reports a gold button as unreadable, because the gold never
   enters the stack.

A finding from either script is a hypothesis. Confirm it by sampling the rendered
pixels and looking at a screenshot before changing anything: of the first 19
"failures" this pass produced, 16 were artifacts of the three traps above.
