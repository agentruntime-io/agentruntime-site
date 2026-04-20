/**
 * Post-build static prerender for agentruntime-site.
 *
 * 1. Expects `dist/` from a prior `vite build`.
 * 2. Starts `vite preview` on a local port.
 * 3. Visits each URL from `public/sitemap.xml` with Playwright and writes HTML
 *    as `dist/<path>/index.html` (root → `dist/index.html`).
 *
 * One-time setup: `npx playwright install chromium`
 *
 * Env:
 *   PRERENDER_PREVIEW_PORT — fixed port (optional; if unset, an ephemeral free port is used)
 *   PRERENDER_WAIT_MS — extra settle time after load (default 800)
 */

import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITEMAP = join(ROOT, "public", "sitemap.xml");

const EXTRA_WAIT_MS = Number(process.env.PRERENDER_WAIT_MS || "800") || 800;

/** Prefer PRERENDER_PREVIEW_PORT; otherwise bind port 0 and use a free port (avoids clashes with a running dev/preview). */
async function resolvePreviewPort() {
  const fromEnv = process.env.PRERENDER_PREVIEW_PORT;
  if (fromEnv !== undefined && fromEnv !== "") {
    const n = Number(fromEnv);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.listen(0, "127.0.0.1", () => {
      const addr = s.address();
      const port = typeof addr === "object" && addr ? addr.port : null;
      s.close(() => {
        if (port) resolve(port);
        else reject(new Error("Could not allocate preview port"));
      });
    });
    s.on("error", reject);
  });
}

function parseSitemapPaths(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const paths = [];
  const seen = new Set();
  for (const loc of locs) {
    let pathname;
    try {
      pathname = new URL(loc).pathname || "/";
    } catch {
      continue;
    }
    if (!pathname.startsWith("/")) pathname = `/${pathname}`;
    if (seen.has(pathname)) continue;
    seen.add(pathname);
    paths.push(pathname);
  }
  return paths;
}

function distHtmlPath(distDir, pathname) {
  if (pathname === "/" || pathname === "") {
    return join(distDir, "index.html");
  }
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  return join(distDir, ...segments, "index.html");
}

async function waitForPreview(url, attempts = 60, delayMs = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok || res.status === 304) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`Preview server did not respond at ${url}`);
}

function killPreview(proc) {
  if (!proc || proc.killed) return;
  try {
    proc.kill(process.platform === "win32" ? undefined : "SIGTERM");
  } catch {
    /* ignore */
  }
}

async function main() {
  let previewProc;
  const previewPort = await resolvePreviewPort();
  const previewOrigin = `http://127.0.0.1:${previewPort}`;

  try {
    await readFile(join(DIST, "index.html"), "utf8");
  } catch {
    console.error("prerender: dist/index.html not found. Run `npm run build` first.");
    process.exit(1);
  }

  const xml = await readFile(SITEMAP, "utf8");
  const paths = parseSitemapPaths(xml);
  if (paths.length === 0) {
    console.error("prerender: no <loc> entries in public/sitemap.xml");
    process.exit(1);
  }

  const viteCli = join(ROOT, "node_modules", "vite", "bin", "vite.js");

  console.log(`prerender: starting vite preview on port ${previewPort}…`);
  previewProc = spawn(
    process.execPath,
    [
      viteCli,
      "preview",
      "--port",
      String(previewPort),
      "--strictPort",
      "--host",
      "127.0.0.1",
    ],
    {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env },
    }
  );

  previewProc.stderr?.on("data", (data) => {
    const s = data.toString();
    if (s.trim()) process.stderr.write(s);
  });

  try {
    await waitForPreview(`${previewOrigin}/`);

    console.log(`prerender: capturing ${paths.length} routes with Playwright…`);

    const browser = await chromium.launch({ headless: true });

    try {
      const context = await browser.newContext();

      for (const pathname of paths) {
        const url = `${previewOrigin}${pathname === "/" ? "/" : pathname}`;
        const outPath = distHtmlPath(DIST, pathname);

        const page = await context.newPage();
        try {
          await page.goto(url, {
            waitUntil: "load",
            timeout: 90_000,
          });
          await page.waitForSelector("#root", { state: "attached", timeout: 30_000 });
          await new Promise((r) => setTimeout(r, EXTRA_WAIT_MS));
          const html = await page.content();
          await mkdir(dirname(outPath), { recursive: true });
          await writeFile(outPath, html, "utf8");
          const rel = outPath.slice(ROOT.length + 1);
          console.log(`prerender: ok ${pathname} → ${rel}`);
        } finally {
          await page.close();
        }
      }
    } finally {
      await browser.close();
    }

    console.log("prerender: done.");
  } finally {
    killPreview(previewProc);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
