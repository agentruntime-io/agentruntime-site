# SEO & performance findings (consolidated)

This document merges **SEOmator** (`@seomator/seo-audit`) results and **Google PageSpeed Insights** (Lighthouse lab) for **AgentRuntime** marketing site. Use it as a single checklist; verify on production after changes.

**URLs referenced**

- SEOmator single-page: `https://www.agentruntime.io/`
- SEOmator crawl: same origin, **18 pages** discovered/audited (cap was 50; `--no-cwv`).
- PageSpeed: analysis id `5do3dtavqj`, URL input `https://agentruntime.io/` (lab run **Apr 20, 2026**).

---

## 1. SEOmator — single-page audit (www homepage)

**Command (representative):** `seomator audit https://www.agentruntime.io/ --format json --no-cwv`  
**Overall score:** **95/100**

### 1.1 Failed rules

| Rule | Issue |
|------|--------|
| `technical-404-page` | Random non-existent path returns **HTTP 200** (SPA fallback / soft 404). Probe URL pattern: `.../seo-audit-test-nonexistent-page-...`. |
| `security-x-frame-options` | No `X-Frame-Options` and no CSP `frame-ancestors` (clickjacking note). |
| `security-x-content-type-options` | Missing `X-Content-Type-Options: nosniff`. |
| `content-text-html-ratio` | Very low text-to-HTML ratio (**~6.1%**); tool flags heavy markup vs visible text. |
| `content-description-pixel-width` | Meta description estimated **~1020px** wide in SERP vs **~920px** guideline (truncation risk). |
| `geo-schema-drift` | JSON-LD **`name`** (`AgentRuntime Labs LLC`) not found in visible page text; align schema with on-page copy. |

### 1.2 Notable warnings

| Rule | Issue |
|------|--------|
| `core-canonical-loop` | **www** page; canonical is **apex** `https://agentruntime.io/`. Tool warns to verify no reciprocal canonical loop (consolidation is intentional; confirm apex page canonical). |
| `geo-llms-txt` | No `<link rel="llms" href="/llms.txt">` in HTML (recommendation for AI discoverability). |
| `geo-semantic-html` / `geo-content-structure` | Suggests **`main`**, **`article`**, **`header`** / main landmark. |
| `images-background-seo` | **Four** section backgrounds as CSS `background-image` (hero, support, workflow, CTA); not indexable; tool suggests `<img>` + **alt** for important visuals. |
| `security-csp` | CSP header absent (XSS hardening recommendation). |
| `security-permissions-policy` | Header absent. |
| `security-referrer-policy` | Header absent. |
| `perf-font-loading` | Warning around Google Fonts / `display=swap` heuristics (verify in UI; may be partially false positive on link variants). |
| Core Web Vitals | Not measured when using `--no-cwv`; separate run needed for real CWV numbers. |
| `a11y-touch-targets` | Some links flagged **small touch targets** (e.g. 16px / 20px / 24px dimensions). |

---

## 2. SEOmator — multi-page crawl (max 50 pages)

**Command (representative):** `seomator audit https://www.agentruntime.io/ --crawl --max-pages 50 --format html --no-cwv`  
**Pages audited:** **18** (not 50 — crawler only reached that many URLs).  
**Artifact:** `agentruntime-site/seo-audit-crawl50.html`

### 2.1 Patterns across the crawl (from CLI summary)

- **Technical:** Repeated **`technical-404-page`** failure (soft 404 on unknown paths) on audited URLs.
- **Security:** Same **frame** + **nosniff** failures on pages checked.
- **Content:** Mix of **`content-text-html-ratio`** / **`content-description-pixel-width`** (and related) failures or warnings depending on page.
- **Accessibility:** Some inner pages showed **additional failures** vs homepage (scores varied ~79–89 in logs).
- **Structured data:** More **warnings** on inner pages (e.g. **88** category score with **5 warnings** in segments).
- **AI/GEO:** Mixed — sometimes **`geo-schema-drift`** fail, sometimes only warnings; **`geo-llms-txt`** style warnings recur.
- **Core:** Occasional extra canonical/title uniqueness warnings when multiple pages compared (e.g. **2 warnings** on some passes).

Use the HTML report for **per-URL** rule breakdown.

---

## 3. PageSpeed Insights — Lighthouse (lab)

**Reports:** [Mobile](https://pagespeed.web.dev/analysis/https-agentruntime-io/5do3dtavqj?utm_source=search_console&form_factor=mobile&hl=en) · [Desktop](https://pagespeed.web.dev/analysis/https-agentruntime-io/5do3dtavqj?utm_source=search_console&form_factor=desktop&hl=en)

### 3.1 Category scores

| Category | Mobile | Desktop |
|----------|--------|---------|
| Performance | **77** | **97** |
| Accessibility | **91** | **96** |
| Best Practices | **100** | **100** |
| SEO | **92** | **92** |

### 3.2 Performance — opportunities (both unless noted)

- **Render-blocking requests** — ~**1,060 ms** estimated savings (mobile); ~**280 ms** (desktop). Involves main CSS bundle, Google Fonts CSS, main JS chunk.
- **Reduce unused JavaScript** — ~**99 KiB** (main bundle).
- **Reduce unused CSS** — ~**12 KiB** (main CSS).
- **Image elements without explicit `width` / `height`** — **`/agentruntime-logo.svg`** (listed twice → likely two instances).
- **Long main-thread tasks** — **4** long tasks.
- **Network payload** — **~747 KiB** total (diagnostic).
- **Other diagnostics** (expand in PSI): layout shift culprits, document request latency, cache lifetimes, duplicated JavaScript, font-display, forced reflow, improve image delivery, INP breakdown, legacy JavaScript, minify CSS/JS.
- **Mobile:** **“Optimize viewport for mobile”** (mentions **~300 ms** delay class of issues in the audit copy).

**Note:** “Discover what your real users are experiencing” (CrUX / field data) was not captured in automated exports; re-check in the live PSI UI for real-user LCP/INP/CLS.

### 3.3 Accessibility

- **Insufficient color contrast** (foreground/background) — mobile **and** desktop.
- **Buttons do not have an accessible name** — flagged on **mobile** in the captured snapshot (confirm exact control in PSI).
- **Touch targets** — PSI includes related audits; aligns with SEOmator touch-target warnings on small controls.

### 3.4 SEO (Lighthouse)

- **Links do not have descriptive text** — **1** link targeting **`/features`** (generic anchor text).

---

## 4. Cross-cutting themes (both tools)

1. **Hosting / headers:** Security headers (**framing**, **nosniff**, optional **CSP**, **Referrer-Policy**, **Permissions-Policy**) — configure at **Vercel** / edge, not only in React.
2. **www vs apex:** Canonical points **apex** while users may land on **www**; ensure redirects, sitemap, and Search Console property alignment; verify no canonical loop.
3. **Soft 404:** Unknown routes return **200** + SPA shell — consider **404 status** for unknown paths (or prerender + server rules) if you want a clean technical-SEO signal.
4. **Structured data vs visible copy:** **`AgentRuntime Labs LLC`** in JSON-LD vs branding on page — fix drift for **`geo-schema-drift`** and trust.
5. **Meta description length** in characters **and** pixel width — shorten or rephrase for SERP.
6. **Performance:** Mobile gap (**77** vs **97**) — render-blocking chain, fonts, JS weight, images/dimensions, main-thread work.
7. **Accessibility:** Contrast + control naming + link text (**/features**) + touch targets.
8. **Content images:** Hero/section art as CSS backgrounds — SEO tools prefer real **`<img>`** + **alt** where the image carries meaning.

---

## 5. Suggested follow-up actions (priority buckets)

**Quick / infrastructure**

- Add **`X-Frame-Options`** or CSP **`frame-ancestors`**, **`X-Content-Type-Options: nosniff`**, consider **CSP**, **Referrer-Policy**, **Permissions-Policy** on `vercel.json` or platform settings.
- Decide **404 behavior** for unknown paths on static hosting.

**Content & schema**

- Align **Organization** (or similar) **`name`** with visible brand text; keep **`/llms.txt`** discoverable if you publish it (link + host consistency **www** vs **apex**).

**Front-end**

- Fix **non-descriptive** link to **`/features`**; add **`width`/`height`** (or aspect-ratio) on logo SVG instances.
- Address **color contrast** and **unnamed** interactive elements; enlarge **touch targets** where flagged.
- Reduce **unused JS/CSS**, mitigate **render-blocking** (defer/split, font strategy, preload critical assets).

**Verification**

- Re-run **SEOmator** with `--crawl` and optionally **with** CWV (Playwright Chromium).
- Re-run **PageSpeed** after deploy; compare **mobile** performance first.

---

*Generated as a consolidation of chat findings; re-run tools after substantive changes.*
