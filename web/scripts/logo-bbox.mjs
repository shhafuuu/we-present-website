// Measure the tight *visible* ink bounds of each partner logo SVG.
//
// getBBox() is not usable here: it reports geometry that clipPaths hide, so
// meyyafushi (whose artwork sits inside a full-canvas <g clip-path>) measures as
// filling 100% of its canvas when it does not. This scans rendered alpha instead.
//
// Run from web/: node scripts/logo-bbox.mjs
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const logos = ["fushifaru", "madifushi", "so-maldives"];
const RENDER = 1000; // px on the long edge
const ALPHA = 24; // ignore antialiasing haze below this

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<canvas id=c></canvas>");

const results = [];

for (const name of logos) {
  const svg = readFileSync(`public/images/logos/${name}.svg`, "utf8");
  const out = await page.evaluate(
    async ([markup, size, alphaFloor]) => {
      const url =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(markup)));
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = url;
      });

      const vb = markup.match(/viewBox="([\d.\s-]+)"/)[1].trim().split(/\s+/).map(Number);
      const [vx, vy, vw, vh] = vb;
      const scale = size / Math.max(vw, vh);
      const w = Math.round(vw * scale);
      const h = Math.round(vh * scale);

      const c = document.getElementById("c");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      let minX = w, minY = h, maxX = -1, maxY = -1;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] > alphaFloor) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < 0) return null;
      // Back to user units. Pixel offsets are relative to the viewBox origin, so
      // the origin has to be added back or a viewBox with a non-zero min-x/min-y
      // (madifushi) gets cropped to the wrong place.
      return {
        viewBox: [vw, vh],
        ink: [
          vx + minX / scale,
          vy + minY / scale,
          (maxX - minX + 1) / scale,
          (maxY - minY + 1) / scale,
        ],
      };
    },
    [svg, RENDER, ALPHA],
  );

  if (!out) {
    console.log(`${name.padEnd(12)} NO VISIBLE INK`);
    continue;
  }
  const [vw, vh] = out.viewBox;
  const [x, y, w, h] = out.ink;
  results.push({ name, vw, vh, x, y, w, h });
  console.log(
    `${name.padEnd(12)} viewBox ${round(vw)}x${round(vh)}` +
      `  ink ${round(w)}x${round(h)} at ${round(x)},${round(y)}` +
      `  fill ${Math.round((w / vw) * 100)}% x ${Math.round((h / vh) * 100)}%` +
      `  aspect ${(w / h).toFixed(2)}`,
  );
}

console.log("\ncropped viewBox values:");
for (const r of results) {
  console.log(
    `  ${r.name.padEnd(12)} viewBox="${round(r.x)} ${round(r.y)} ${round(r.w)} ${round(r.h)}"  aspect ${(r.w / r.h).toFixed(2)}`,
  );
}

function round(n) {
  return Math.round(n * 100) / 100;
}

await browser.close();
