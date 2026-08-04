import { chromium } from "playwright";

const PATHS = [
  "", "/about", "/tours", "/tours/maldives-tour-1", "/tours/maldives-ttm-tour-2",
  "/tours/cinnamon-resorts-maldives", "/tours/we-present-workshop-2026",
  "/destinations", "/destinations/maldives", "/resorts/fushifaru", "/resorts/meyyafushi",
  "/partners", "/contact", "/register", "/become-a-partner", "/how-it-was", "/legal",
  "/cases/cinnamon-maldives", "/cases/fushifaru-maldives",
];

const MEASURE = () => {
  // Tailwind v4 emits oklab() for any colour with an alpha modifier, so a regex over
  // rgb() silently drops every translucent layer. Painting the string onto known
  // white and known black and solving for straight colour + alpha works for any
  // colour syntax the browser supports, and is exact.
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
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, 1, 1);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = str;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
      };
      const w = read("#fff"), b = read("#000");
      const a = 1 - (w[0] - b[0]) / 255;
      out = a <= 0.002
        ? { r: 0, g: 0, b: 0, a: 0 }
        : { r: b[0] / a, g: b[1] / a, b: b[2] / a, a };
    } catch { out = null; }
    cache.set(str, out);
    return out;
  };

  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (u) => { u /= 255; return u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };

  const effBg = (el) => {
    const layers = [];
    let node = el;
    while (node) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return { overImage: true };
      const c = resolve(cs.backgroundColor);
      if (c && c.a > 0.002) { layers.push(c); if (c.a >= 0.999) break; }
      node = node.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return { color: base, overImage: false };
  };

  const hasMediaBehind = (el) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight) return false;
    return document.elementsFromPoint(cx, cy).some(
      (n) => n !== el && !n.contains(el) && (n.tagName === "IMG" || n.tagName === "VIDEO")
    );
  };

  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const own = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
    if (!own) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (el.closest("[aria-hidden='true']")) continue;

    const fgRaw = resolve(cs.color);
    if (!fgRaw) continue;
    const bg = effBg(el);
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3.0 : 4.5;

    const record = {
      text: own.slice(0, 55),
      cls: (el.className || "").toString().slice(0, 110),
      tag: el.tagName.toLowerCase(),
      size: Math.round(size * 10) / 10,
      weight, large, need, color: cs.color,
    };

    if (bg.overImage || hasMediaBehind(el)) {
      out.push({ ...record, kind: "over-media", ratio: null });
      continue;
    }
    const solidFg = fgRaw.a < 1 ? over(fgRaw, bg.color) : fgRaw;
    const cr = ratio(solidFg, bg.color);
    out.push({
      ...record, kind: "solid", ratio: Math.round(cr * 100) / 100,
      bg: `rgb(${bg.color.r.toFixed(0)},${bg.color.g.toFixed(0)},${bg.color.b.toFixed(0)})`,
      pass: cr >= need,
    });
  }
  return out;
};

const browser = await chromium.launch();
const failures = new Map();
const marginal = new Map();
const overMedia = new Map();
let checked = 0;

for (const locale of ["ru", "en"]) {
  for (const path of PATHS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`http://localhost:3000/${locale}${path}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*{transition:none!important;animation:none!important}[data-reveal]{opacity:1!important;transform:none!important}" });
    await page.waitForTimeout(350);

    const rows = await page.evaluate(MEASURE);
    checked += rows.length;
    for (const r of rows) {
      const key = `${r.cls}|${r.color}|${r.bg ?? "media"}|${r.size}`;
      if (r.kind === "over-media") {
        if (!overMedia.has(key)) overMedia.set(key, { ...r, where: `${locale}${path}` });
      } else if (!r.pass) {
        if (!failures.has(key)) failures.set(key, { ...r, where: `${locale}${path}` });
      } else if (r.ratio < r.need * 1.15) {
        if (!marginal.has(key)) marginal.set(key, { ...r, where: `${locale}${path}` });
      }
    }
    await page.close();
  }
}

const show = (m, title) => {
  console.log(`\n=== ${title} : ${m.size} distinct ===`);
  [...m.values()].sort((a, b) => (a.ratio ?? 0) - (b.ratio ?? 0)).forEach((f) => {
    console.log(`\n  ${f.ratio ?? "n/a"}:1  (needs ${f.need})  ${f.size}px w${f.weight}${f.large ? " LARGE" : ""}`);
    console.log(`    "${f.text}"`);
    console.log(`    ${f.color} on ${f.bg}`);
    console.log(`    <${f.tag} class="${f.cls}">`);
    console.log(`    first seen: /${f.where}`);
  });
};

console.log(`Text nodes measured: ${checked} across ${PATHS.length * 2} page loads`);
show(failures, "FAILURES (below WCAG AA)");
show(marginal, "MARGINAL (passes, within 15% of the threshold)");
console.log(`\n=== OVER MEDIA (pixel-sampled separately) : ${overMedia.size} distinct ===`);
[...overMedia.values()].forEach((f) => console.log(`  ${f.size}px w${f.weight} "${f.text}" @ /${f.where}`));

await browser.close();
