/**
 * Emit `public/sitemap.xml` and `public/blog/rss.xml` from static routes + `src/blog/posts.ts`.
 * Run before `vite build` (see package.json). Keep static route list aligned with App.tsx + featureFlags.
 */
import { writeFileSync, readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { coverImageWebp800Path, parseBlogPosts } from "./parse-blog-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_TS = join(ROOT, "src", "blog", "posts.ts");
const MARKETING_CATALOG_TS = join(ROOT, "src", "lib", "marketingCatalog.ts");
const WORKFLOW_BLUEPRINTS_TS = join(
  ROOT,
  "src",
  "lib",
  "workflowBlueprints.ts",
);
const SITEMAP_OUT = join(ROOT, "public", "sitemap.xml");
const RSS_OUT = join(ROOT, "public", "blog", "rss.xml");

/** Must stay aligned with src/config/site.ts */
const SITE = "https://www.agentruntime.io";
const SITE_NAME = "AgentRuntime";

/** Keep aligned with src/config/featureFlags.ts → showWaitlist */
const SHOW_WAITLIST = false;

function parseIntegrationSlugs(path) {
  const source = readFileSync(path, "utf8");
  const integrationsBlock = source.match(
    /export const integrations = \[([\s\S]*?)\]\s+satisfies readonly Integration\[\];/,
  );

  if (!integrationsBlock) {
    console.error(
      "generate-seo-assets: could not parse integrations from marketingCatalog.ts",
    );
    process.exit(1);
  }

  return [...integrationsBlock[1].matchAll(/\bslug:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );
}

function parseWorkflowBlueprintSlugs(path) {
  const source = readFileSync(path, "utf8");
  const blueprintsBlock = source.match(
    /export const workflowBlueprints = \[([\s\S]*?)\]\s+satisfies readonly WorkflowBlueprint\[\];/,
  );

  if (!blueprintsBlock) {
    console.error(
      "generate-seo-assets: could not parse workflow blueprints from workflowBlueprints.ts",
    );
    process.exit(1);
  }

  // Blueprint-level fields are indented four spaces by the repository formatter.
  // Matching at that level avoids nested integration slugs without coupling the
  // route parser to property order inside each blueprint.
  return [...blueprintsBlock[1].matchAll(/^ {4}slug:\s*"([^"]+)",?\s*$/gm)].map(
    (match) => match[1],
  );
}

const baseStaticEntries = [
  ["/", "weekly", "1"],
  ["/platform", "monthly", "0.9"],
  ["/solutions", "monthly", "0.9"],
  ["/integrations", "weekly", "0.9"],
  ["/developers", "monthly", "0.9"],
  ["/enterprise", "monthly", "0.8"],
  ["/company", "monthly", "0.7"],
  ["/blog", "weekly", "0.8"],
  ["/contact", "monthly", "0.8"],
  ["/legal", "monthly", "0.5"],
  ["/legal/terms-and-conditions", "yearly", "0.4"],
  ["/legal/privacy-policy", "yearly", "0.4"],
  ["/legal/acceptable-use-policy", "yearly", "0.4"],
  ["/legal/data-processing-agreement", "yearly", "0.4"],
  ["/legal/security-policy", "yearly", "0.4"],
  ["/legal/billing-and-credits-policy", "yearly", "0.4"],
  ["/legal/ai-usage-policy", "yearly", "0.4"],
  ["/legal/developer-platform-license", "yearly", "0.4"],
  ["/legal/service-level-agreement", "yearly", "0.4"],
];

const integrationSlugs = parseIntegrationSlugs(MARKETING_CATALOG_TS);
const integrationSlugSet = new Set(integrationSlugs);
const workflowBlueprintSlugs = parseWorkflowBlueprintSlugs(
  WORKFLOW_BLUEPRINTS_TS,
);
const workflowBlueprintSlugSet = new Set(workflowBlueprintSlugs);

if (
  integrationSlugs.length === 0 ||
  integrationSlugSet.size !== integrationSlugs.length
) {
  console.error(
    "generate-seo-assets: integration slugs are empty or contain duplicates",
  );
  process.exit(1);
}

if (
  workflowBlueprintSlugs.length === 0 ||
  workflowBlueprintSlugSet.size !== workflowBlueprintSlugs.length
) {
  console.error(
    "generate-seo-assets: workflow blueprint slugs are empty or contain duplicates",
  );
  process.exit(1);
}

const integrationEntries = integrationSlugs.map((slug) => [
  `/integrations/${slug}`,
  "monthly",
  "0.7",
]);
const workflowBlueprintEntries = workflowBlueprintSlugs.map((slug) => [
  `/solutions/${slug}`,
  "monthly",
  "0.8",
]);
const staticEntries = [
  ...baseStaticEntries,
  ...workflowBlueprintEntries,
  ...integrationEntries,
  ...(SHOW_WAITLIST ? [["/waitlist", "monthly", "0.8"]] : []),
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function sitemapEntry(path, changefreq, priority, lastmod) {
  const loc = `${SITE}${path}`;
  const lm = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `  <url><loc>${escapeXml(loc)}</loc>${lm}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

function escapeCdata(s) {
  return s.replace(/]]>/g, "]]]]><![CDATA[>");
}

function rfc822Date(isoDate) {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  return d.toUTCString();
}

/** Prefer build-time WebP cover; fall back to committed PNG for local `generate:sitemap` runs. */
function rssEnclosureForCover(coverPath) {
  const webpPath = coverImageWebp800Path(coverPath);
  const webpAbs = join(ROOT, "public", webpPath.slice(1));
  if (existsSync(webpAbs)) {
    return {
      url: `${SITE}${webpPath}`,
      length: statSync(webpAbs).size,
      type: "image/webp",
    };
  }

  const pngAbs = join(ROOT, "public", coverPath.slice(1));
  if (existsSync(pngAbs)) {
    return {
      url: `${SITE}${coverPath}`,
      length: statSync(pngAbs).size,
      type: "image/png",
    };
  }

  return null;
}

function enclosureXml(enclosure) {
  if (!enclosure) {
    return "";
  }
  return `      <enclosure url="${escapeXml(enclosure.url)}" length="${enclosure.length}" type="${escapeXml(enclosure.type)}"/>`;
}

const buildDay = new Date().toISOString().slice(0, 10);
const blogPosts = parseBlogPosts(POSTS_TS);

const blogIndexLastmod = blogPosts.reduce(
  (max, p) => (p.publishedAt > max ? p.publishedAt : max),
  blogPosts[0]?.publishedAt ?? buildDay
);

if (blogPosts.length === 0) {
  console.error("generate-seo-assets: no posts parsed — check scripts/parse-blog-posts.mjs against posts.ts format");
  process.exit(1);
}

const slugSet = new Set(blogPosts.map((p) => p.slug));
if (slugSet.size !== blogPosts.length) {
  console.error("generate-seo-assets: duplicate slugs detected in parsed posts");
  process.exit(1);
}

/** Sitemap */
const smLines = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
];
for (const [path, freq, pri] of staticEntries) {
  const lastmod = path === "/blog" ? blogIndexLastmod : buildDay;
  smLines.push(sitemapEntry(path, freq, pri, lastmod));
}
for (const p of blogPosts) {
  smLines.push(sitemapEntry(`/blog/${p.slug}`, "monthly", "0.7", p.publishedAt));
}
smLines.push(`</urlset>`);
writeFileSync(SITEMAP_OUT, `${smLines.join("\n")}\n`, "utf8");

/** RSS 2.0 — newest first */
const sorted = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
const lastBuild = new Date().toUTCString();
const channelDesc =
  "Product updates, engineering notes, and practical guidance for running AI agents in production on AgentRuntime.";

const itemsXml = sorted
  .map((p) => {
    const link = `${SITE}/blog/${p.slug}`;
    const pub = rfc822Date(p.publishedAt);
    const desc = escapeCdata(p.description || p.title);
    const enclosure = enclosureXml(rssEnclosureForCover(p.coverImage));
    return [
      `    <item>`,
      `      <title>${escapeXml(p.title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${pub}</pubDate>`,
      `      <description><![CDATA[${desc}]]></description>`,
      enclosure,
      `    </item>`,
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");

const rss = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
  `  <channel>`,
  `    <title>${escapeXml(SITE_NAME)} Blog</title>`,
  `    <link>${escapeXml(`${SITE}/blog`)}</link>`,
  `    <description>${escapeXml(channelDesc)}</description>`,
  `    <language>en-us</language>`,
  `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
  `    <atom:link href="${escapeXml(`${SITE}/blog/rss.xml`)}" rel="self" type="application/rss+xml"/>`,
  itemsXml,
  `  </channel>`,
  `</rss>`,
].join("\n");

writeFileSync(RSS_OUT, `${rss}\n`, "utf8");

console.log(
  `generate-seo-assets: sitemap ${smLines.length - 3} URLs (${workflowBlueprintSlugs.length} workflow blueprints, ${integrationSlugs.length} integrations, ${blogPosts.length} posts, lastmod on static=${buildDay}) -> ${SITEMAP_OUT}`
);
console.log(`generate-seo-assets: RSS ${sorted.length} items -> ${RSS_OUT}`);
