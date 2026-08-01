import { chromium } from "playwright";

const browser = await chromium.launch();
for (const url of process.env.URLS.split(",")) {
  for (const width of [390, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: "networkidle" });
    const r = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    const bad = r.scrollW > r.clientW;
    console.log(`${bad ? "OVERFLOW" : "ok      "} ${width}px ${url}  (scroll ${r.scrollW} / client ${r.clientW})`);
    await page.close();
  }
}
await browser.close();
