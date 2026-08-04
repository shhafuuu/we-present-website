import { chromium } from "playwright";
import { PNG } from "pngjs";

const PATHS = [
  "", "/about", "/tours", "/tours/maldives-tour-1", "/tours/maldives-ttm-tour-2",
  "/tours/we-present-workshop-2026", "/destinations", "/destinations/maldives",
  "/resorts/fushifaru", "/partners", "/contact", "/register", "/become-a-partner",
  "/how-it-was", "/legal", "/cases/cinnamon-maldives",
];

const lum = (c) => {
  const f = (u) => { u /= 255; return u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};
const ratio = (a, b) => {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
const dist = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);

const IN_PAGE = () => {
  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = 1;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  const resolve = (str) => {
    if (cache.has(str)) return cache.get(str);
    let out = null;
    try {
      const read = (base) => {
        ctx.globalCompositeOperation = "copy";
        ctx.fillStyle = base; ctx.fillRect(0, 0, 1, 1);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = str; ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
      };
      const w = read("#fff"), b = read("#000");
      const a = 1 - (w[0] - b[0]) / 255;
      out = a <= 0.002 ? { r: 0, g: 0, b: 0, a: 0 } : { r: b[0] / a, g: b[1] / a, b: b[2] / a, a };
    } catch { out = null; }
    cache.set(str, out); return out;
  };
  const over = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a), a: 1,
  });
  // Effective ground of an element, starting from its own background.
  const ground = (el, includeSelf) => {
    const layers = [];
    let node = includeSelf ? el : el.parentElement;
    while (node) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
      const c = resolve(cs.backgroundColor);
      if (c && c.a > 0.002) { layers.push(c); if (c.a >= 0.999) break; }
      node = node.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  };
  const edge = (cs) => {
    const w = parseFloat(cs.borderTopWidth) || 0;
    if (w <= 0) return false;
    const c = resolve(cs.borderTopColor);
    return !!c && c.a > 0.04;
  };

  // --- Section boundaries, resolved analytically ---
  const boundaries = [];
  const secs = [...document.querySelectorAll("section, footer")]
    .filter((s) => s.getBoundingClientRect().width > innerWidth * 0.9)
    .filter((s) => !s.parentElement.closest("section"));
  for (let i = 0; i < secs.length - 1; i++) {
    const A = secs[i], B = secs[i + 1];
    const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
    if (Math.abs(ra.bottom - rb.top) > 2) continue;
    const ga = ground(A, true), gb = ground(B, true);
    if (!ga || !gb) continue;
    const csB = getComputedStyle(B), csA = getComputedStyle(A);
    boundaries.push({
      d: Math.hypot(ga.r - gb.r, ga.g - gb.g, ga.b - gb.b),
      hasRule: edge(csB) || (parseFloat(csA.borderBottomWidth) > 0),
      a: (A.className || "").toString().slice(0, 62),
      b: (B.className || "").toString().slice(0, 62),
      ca: `rgb(${ga.r.toFixed(0)},${ga.g.toFixed(0)},${ga.b.toFixed(0)})`,
      cb: `rgb(${gb.r.toFixed(0)},${gb.g.toFixed(0)},${gb.b.toFixed(0)})`,
    });
  }

  // --- Cards on their ground ---
  const cards = [];
  for (const el of document.querySelectorAll("[class*='rounded-']")) {
    const cs = getComputedStyle(el);
    const own = resolve(cs.backgroundColor);
    if (!own || own.a < 0.03) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 90 || r.height < 44) continue;
    const gCard = ground(el, true), gParent = ground(el, false);
    if (!gCard || !gParent) continue;
    const anyBorder = ["Top", "Right", "Bottom", "Left"].some((s) => {
      const w = parseFloat(cs[`border${s}Width`]) || 0;
      if (w <= 0) return false;
      const c = resolve(cs[`border${s}Color`]);
      return !!c && c.a > 0.04;
    });
    const shadow = cs.boxShadow && cs.boxShadow !== "none";
    cards.push({
      d: Math.hypot(gCard.r - gParent.r, gCard.g - gParent.g, gCard.b - gParent.b),
      anyBorder, shadow,
      cls: (el.className || "").toString().slice(0, 78),
      card: `rgb(${gCard.r.toFixed(0)},${gCard.g.toFixed(0)},${gCard.b.toFixed(0)})`,
      grd: `rgb(${gParent.r.toFixed(0)},${gParent.g.toFixed(0)},${gParent.b.toFixed(0)})`,
    });
  }

  // --- Text over media, for pixel sampling ---
  const overMedia = [];
  for (const el of document.querySelectorAll("body *")) {
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim()).join(" ").trim();
    if (!own) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    if (r.bottom < 4 || r.top > innerHeight - 4) continue;
    if (ground(el, true) !== null) continue; // solid ground handled analytically
    const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10) || 400;
    overMedia.push({
      text: own.slice(0, 46), size,
      large: size >= 24 || (size >= 18.66 && weight >= 700),
      fg: resolve(cs.color),
      rect: { x: r.left, y: r.top, w: r.width, h: r.height },
      cls: (el.className || "").toString().slice(0, 70),
    });
  }
  return { boundaries, cards, overMedia };
};

const browser = await chromium.launch();
const boundaryWeak = new Map(), cardWeak = new Map(), textFails = new Map();

for (const locale of ["ru", "en"]) {
  for (const path of PATHS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`http://localhost:3000/${locale}${path}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*{transition:none!important;animation:none!important}[data-reveal]{opacity:1!important;transform:none!important}" });
    await page.waitForTimeout(400);

    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 800) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(220);
      const data = await page.evaluate(IN_PAGE);

      for (const b of data.boundaries) {
        if (b.d >= 12 || b.hasRule) continue;
        const k = `${b.a}||${b.b}`;
        if (!boundaryWeak.has(k)) boundaryWeak.set(k, { ...b, where: `${locale}${path}` });
      }
      for (const c of data.cards) {
        if (c.d >= 12 || c.anyBorder || c.shadow) continue;
        if (!cardWeak.has(c.cls)) cardWeak.set(c.cls, { ...c, where: `${locale}${path}` });
      }

      if (data.overMedia.length) {
        const shot = PNG.sync.read(await page.screenshot());
        const px = (x, yy) => {
          x = Math.max(0, Math.min(shot.width - 1, Math.round(x)));
          yy = Math.max(0, Math.min(shot.height - 1, Math.round(yy)));
          const i = (shot.width * yy + x) << 2;
          return { r: shot.data[i], g: shot.data[i + 1], b: shot.data[i + 2] };
        };
        for (const t of data.overMedia) {
          if (!t.fg) continue;
          const { x, y: ty, w, h } = t.rect;
          // Background = modal colour of the box, quantised to kill antialiasing
          // halos. In a text box the true background dominates by pixel count;
          // a luminance percentile just picks the halo, which is what made the
          // first version of this script report every hero heading as failing.
          const bins = new Map();
          for (let sy = Math.max(0, ty); sy < Math.min(ty + h, 1000); sy += 1)
            for (let sx = Math.max(0, x); sx < x + w; sx += 1) {
              const p = px(sx, sy);
              const k = `${p.r >> 3}|${p.g >> 3}|${p.b >> 3}`;
              const e = bins.get(k) || { n: 0, r: 0, g: 0, b: 0 };
              e.n++; e.r += p.r; e.g += p.g; e.b += p.b; bins.set(k, e);
            }
          const all = [...bins.values()].sort((a, b2) => b2.n - a.n)
            .map((e) => ({ r: e.r / e.n, g: e.g / e.n, b: e.b / e.n, n: e.n }));
          if (!all.length) continue;
          // Keep only colours occupying a real share of the box. An antialiasing
          // halo is a blend of text and background, so it sits at an intermediate
          // luminance and reads as a contrast failure, but it is always a tiny
          // fraction of the pixels: on one 99x18 kicker the two true background
          // bins held 1024 and 510 pixels and the halo 33. A colour-distance
          // filter cannot separate them; a population filter can.
          const floor = all[0].n * 0.15;
          const cands = all.filter((c) => c.n >= floor && dist(c, t.fg) > 40);
          if (!cands.length) continue;
          // Text may itself be translucent (text-ivory/75), so composite it over
          // each candidate background before measuring.
          const solid = (bg) => t.fg.a >= 0.999 ? t.fg : {
            r: t.fg.r * t.fg.a + bg.r * (1 - t.fg.a),
            g: t.fg.g * t.fg.a + bg.g * (1 - t.fg.a),
            b: t.fg.b * t.fg.a + bg.b * (1 - t.fg.a),
          };
          let worst = cands[0], cr = ratio(solid(cands[0]), cands[0]);
          for (const c of cands) {
            const v = ratio(solid(c), c);
            if (v < cr) { cr = v; worst = c; }
          }
          const need = t.large ? 3.0 : 4.5;
          if (cr < need) {
            const k = t.cls + t.text;
            if (!textFails.has(k)) textFails.set(k, {
              where: `${locale}${path}`, text: t.text, size: t.size, cr: +cr.toFixed(2), need,
              cls: t.cls, bg: `rgb(${worst.r.toFixed(0)},${worst.g.toFixed(0)},${worst.b.toFixed(0)})`,
            });
          }
        }
      }
    }
    await page.close();
  }
}

console.log(`=== TEXT OVER MEDIA below AA : ${textFails.size} ===`);
[...textFails.values()].sort((a, b) => a.cr - b.cr).forEach((f) =>
  console.log(`  ${f.cr}:1 (needs ${f.need}) ${f.size}px "${f.text}"\n     on ${f.bg}  @ /${f.where}\n     ${f.cls}`));

console.log(`\n=== SECTION BOUNDARIES: near-identical grounds AND no rule : ${boundaryWeak.size} ===`);
[...boundaryWeak.values()].sort((a, b) => a.d - b.d).forEach((b) =>
  console.log(`  d=${b.d.toFixed(1)}  ${b.ca} -> ${b.cb}  @ /${b.where}\n     above: ${b.a}\n     below: ${b.b}`));

console.log(`\n=== CARDS: near-identical to ground, no border, no shadow : ${cardWeak.size} ===`);
[...cardWeak.values()].sort((a, b) => a.d - b.d).forEach((c) =>
  console.log(`  d=${c.d.toFixed(1)}  card ${c.card} on ${c.grd}  @ /${c.where}\n     ${c.cls}`));

await browser.close();
