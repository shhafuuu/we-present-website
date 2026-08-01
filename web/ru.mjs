import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/ru/about", { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const out = {};
  for (const el of [document.querySelector("h1"), document.querySelector("p")]) {
    if (!el) continue;
    const cs = getComputedStyle(el);
    out[el.tagName] = { family: cs.fontFamily.split(",")[0], text: el.textContent.slice(0, 28) };
  }
  // Cyrillic must not fall back: compare rendered width against a known-bad fallback
  return out;
});
console.log(JSON.stringify(r, null, 1));
await b.close();
