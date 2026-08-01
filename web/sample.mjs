import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "fs";

const OUT = "/private/tmp/claude-501/-Users-test/1032630b-4297-492e-8048-e56b6de70196/scratchpad";
const name = process.env.NAME;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/en", { waitUntil: "networkidle" });
await page.waitForTimeout(1800);

// Bounding box of the h1 so we sample the pixels the headline actually sits on.
const box = await page.locator("h1").first().boundingBox();

// Keep a real screenshot for eyeballing, then hide the hero text and shoot again:
// sampling the visible frame would just read the ivory glyphs, not what is behind
// them. Only the second image is measured.
await page.screenshot({ path: `${OUT}/${name}.png` });
await page.evaluate(() => {
  document.querySelectorAll("section:first-of-type .relative.z-10, section:first-of-type h1")
    .forEach((el) => (el.style.visibility = "hidden"));
});
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT}/${name}-bg.png` });

const png = PNG.sync.read(fs.readFileSync(`${OUT}/${name}-bg.png`));

function lum({ r, g, b }) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

// Sample the background band behind the headline, skipping the glyphs themselves
// by taking the brightest pixels (worst case for ivory text).
const px = [];
for (let y = Math.round(box.y); y < Math.round(box.y + box.height); y += 2) {
  for (let x = Math.round(box.x); x < Math.round(box.x + box.width); x += 2) {
    const i = (png.width * y + x) << 2;
    px.push({ r: png.data[i], g: png.data[i + 1], b: png.data[i + 2] });
  }
}
px.sort((a, b) => lum(b) - lum(a));
const worst = px.slice(0, Math.max(1, Math.floor(px.length * 0.02)));
const avg = worst.reduce(
  (a, p) => ({ r: a.r + p.r / worst.length, g: a.g + p.g / worst.length, b: a.b + p.b / worst.length }),
  { r: 0, g: 0, b: 0 }
);

const ivory = { r: 0xfc, g: 0xfa, b: 0xf6 };
const L1 = lum(ivory) + 0.05;
const L2 = lum(avg) + 0.05;
const ratio = Math.max(L1, L2) / Math.min(L1, L2);

console.log(`${name}: brightest-2% behind h1 = rgb(${Math.round(avg.r)}, ${Math.round(avg.g)}, ${Math.round(avg.b)})`);
console.log(`${name}: ivory-on-that contrast = ${ratio.toFixed(2)}:1`);

await browser.close();
