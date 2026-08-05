// WO-70 responsive sweep: every page, both locales, at 1440 / 1024 / 390.
//
// Crawls the running dev server from both locale roots rather than working off a
// hand-written route list, so a page that exists but is unreachable, or a link that
// points at nothing, shows up as a finding instead of being silently skipped.
//
// Run from web/ with the dev server up:
//   node scripts/responsive-sweep.mjs [outDir]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:3000";
const WIDTHS = [1440, 1024, 390];
const OUT = process.argv[2] ?? "/tmp/wo70";

const browser = await chromium.launch();

/**
 * Walk the site from both locale roots and return every reachable same-origin path.
 *
 * Plain HTTP, not a browser page: every route is statically generated, so the links
 * are all in the server HTML. Driving the crawl through Chromium meant loading each
 * resort page's autoplaying hero video 52 times, which stalled the navigation.
 */
async function crawl() {
  const seen = new Set();
  const queue = ["/ru", "/en"];
  const broken = [];

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);

    let html;
    try {
      const res = await fetch(ORIGIN + path, { redirect: "follow" });
      if (!res.ok) {
        broken.push({ path, status: res.status });
        continue;
      }
      html = await res.text();
    } catch (err) {
      broken.push({ path, status: `fetch failed: ${err.message}` });
      continue;
    }

    for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      const h = m[1];
      if (!h.startsWith("/") || h.startsWith("//")) continue;
      const clean = h.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      if (clean.startsWith("/admin") || clean.startsWith("/api")) continue;
      if (!seen.has(clean)) queue.push(clean);
    }
  }
  return { paths: [...seen].sort(), broken };
}

/** Load one path at one width and report layout defects. */
async function check(path, width) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  // Hero videos stall navigation and contribute nothing to layout — the <video>
  // element still occupies its box, so what we screenshot is the poster frame.
  const selfAborted = new Set();
  await page.route("**/*.{mp4,webm,mov}", (route) => {
    selfAborted.add(route.request().url());
    return route.abort();
  });

  const consoleErrors = [];
  page.on("console", (m) => {
    // "Failed to load resource" is the console's echo of a failed request, and the
    // only failing requests here are the videos this script aborts itself. Real
    // network failures are caught by the requestfailed handler below, which can see
    // the URL and tell ours apart.
    if (m.type() === "error" && !/Failed to load resource/.test(m.text())) {
      consoleErrors.push(m.text().slice(0, 200));
    }
  });
  page.on("requestfailed", (req) => {
    if (!selfAborted.has(req.url())) {
      consoleErrors.push(`request failed: ${req.url().slice(0, 120)}`);
    }
  });
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message.slice(0, 200)));

  await page.goto(ORIGIN + path, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(700);

  // Reveal animates on scroll — step through or below-fold sections never render.
  for (let y = 0; y < 20000; y += 300) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(40);
    const atEnd = await page.evaluate(
      () => window.scrollY + window.innerHeight >= document.body.scrollHeight - 4,
    );
    if (atEnd) break;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const findings = await page.evaluate((vw) => {
    const out = [];
    const doc = document.documentElement;

    if (doc.scrollWidth > vw + 1) {
      out.push({ kind: "page-h-scroll", detail: `scrollWidth ${doc.scrollWidth} > ${vw}` });
    }

    const describe = (el) => {
      const id = el.id ? `#${el.id}` : "";
      const cls = (el.className && typeof el.className === "string")
        ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
        : "";
      const text = (el.textContent || "").trim().slice(0, 40);
      return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` "${text}"` : ""}`;
    };

    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;

      // Sticks out past the right edge of the viewport. Only a finding if nothing
      // above it clips: a transform-scaled hero image inside an overflow-hidden
      // frame is a deliberate crop, not an overflow, and the page-h-scroll check
      // above is the authority on whether the document actually scrolls sideways.
      if (r.right > vw + 1 && cs.position !== "fixed") {
        let clippedByAncestor = false;
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
          if (getComputedStyle(a).overflowX !== "visible") {
            clippedByAncestor = true;
            break;
          }
        }
        if (!clippedByAncestor) {
          out.push({ kind: "overflow-right", detail: `${describe(el)} right=${Math.round(r.right)}` });
        }
      }

      // Content clipped by its own box (text cut off rather than wrapped).
      // sr-only text is *deliberately* clipped to a 1px box — excluded, or every
      // screen-reader heading on the site reports as a defect.
      const srOnly = el.closest(".sr-only") !== null || (r.width <= 1 && r.height <= 1);
      const clipped =
        !srOnly &&
        el.scrollWidth > el.clientWidth + 2 &&
        ["hidden", "clip"].includes(cs.overflowX) &&
        el.children.length === 0;
      if (clipped) {
        out.push({ kind: "text-clipped", detail: `${describe(el)} ${el.scrollWidth}>${el.clientWidth}` });
      }
    }

    // Touch targets, phone width only. WCAG 2.5.8 sets 24x24, but exempts a target
    // whose 24px-diameter circle doesn't touch any other target's circle — otherwise
    // every ordinary text link in a spaced footer list reports as a failure.
    if (vw <= 420) {
      const targets = [...document.querySelectorAll("a[href], button")]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter((t) => t.r.width > 0 && t.r.height > 0);

      for (const t of targets) {
        if (t.r.width >= 24 && t.r.height >= 24) continue;
        const cx = t.r.left + t.r.width / 2;
        const cy = t.r.top + t.r.height / 2;
        const crowded = targets.some((o) => {
          if (o.el === t.el) return false;
          const ox = o.r.left + o.r.width / 2;
          const oy = o.r.top + o.r.height / 2;
          return Math.hypot(cx - ox, cy - oy) < 24;
        });
        if (crowded) {
          out.push({
            kind: "small-tap-target",
            detail: `${describe(t.el)} ${Math.round(t.r.width)}x${Math.round(t.r.height)}, neighbour within 24px`,
          });
        }
      }
    }
    return out;
  }, width);

  mkdirSync(`${OUT}/${width}`, { recursive: true });
  const name = path.replace(/\//g, "_") || "_root";
  await page.screenshot({ path: `${OUT}/${width}/${name}.png`, fullPage: true });
  await page.close();

  return { path, width, findings, consoleErrors };
}

const { paths, broken } = await crawl();
console.log(`crawled ${paths.length} paths, ${broken.length} broken\n`);
if (broken.length) console.log("BROKEN:", broken, "\n");

const results = [];
for (const p of paths) {
  for (const w of WIDTHS) {
    let r;
    try {
      r = await check(p, w);
    } catch (err) {
      // One bad page must not abandon the remaining sweep.
      r = { path: p, width: w, findings: [{ kind: "check-failed", detail: err.message.split("\n")[0] }], consoleErrors: [] };
    }
    results.push(r);
    const n = r.findings.length + r.consoleErrors.length;
    if (n) {
      console.log(`${p} @${w}`);
      for (const f of r.findings) console.log(`   [${f.kind}] ${f.detail}`);
      for (const e of r.consoleErrors) console.log(`   [console] ${e}`);
    }
  }
}

writeFileSync(`${OUT}/report.json`, JSON.stringify({ paths, broken, results }, null, 2));
const clean = results.filter((r) => !r.findings.length && !r.consoleErrors.length).length;
console.log(`\n${clean}/${results.length} page-width combinations clean`);
console.log(`screenshots + report.json in ${OUT}`);

await browser.close();
