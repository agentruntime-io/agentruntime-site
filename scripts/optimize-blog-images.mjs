/**
 * Generate responsive WebP + AVIF variants for blog cover images in `public/blog/`.
 * Run before `vite build` so Vite copies outputs into `dist/`.
 */
import { readdir, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "public", "blog");
const WIDTHS = [400, 800, 1200];
const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);
const FORMATS = [
  { ext: "webp", options: { quality: 80 } },
  { ext: "avif", options: { quality: 65 } },
];

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function isUpToDate(sourcePath, outputPath) {
  try {
    const [sourceStat, outputStat] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return outputStat.mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

async function optimizeImage(sourcePath, basename) {
  const sourceStat = await stat(sourcePath);
  let generatedBytes = 0;
  let skipped = 0;

  for (const width of WIDTHS) {
    for (const { ext, options } of FORMATS) {
      const outputPath = join(BLOG_DIR, `${basename}-${width}.${ext}`);
      if (await isUpToDate(sourcePath, outputPath)) {
        skipped += 1;
        continue;
      }

      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .toFormat(ext, options)
        .toFile(outputPath);

      const outStat = await stat(outputPath);
      generatedBytes += outStat.size;
    }
  }

  return { sourceBytes: sourceStat.size, generatedBytes, skipped };
}

async function main() {
  let entries;
  try {
    entries = await readdir(BLOG_DIR);
  } catch {
    console.log("[optimize-blog-images] public/blog/ not found — skipping");
    return;
  }

  const sources = entries.filter((name) => SOURCE_EXTS.has(extname(name).toLowerCase()));
  if (sources.length === 0) {
    console.log("[optimize-blog-images] no PNG/JPEG sources — skipping");
    return;
  }

  let totalSourceBytes = 0;
  let totalGeneratedBytes = 0;
  let totalSkipped = 0;

  for (const name of sources) {
    const sourcePath = join(BLOG_DIR, name);
    const basename = name.replace(/\.(png|jpe?g)$/i, "");
    const result = await optimizeImage(sourcePath, basename);
    totalSourceBytes += result.sourceBytes;
    totalGeneratedBytes += result.generatedBytes;
    totalSkipped += result.skipped;
    console.log(
      `[optimize-blog-images] ${name} (${formatKb(result.sourceBytes)}) → ${WIDTHS.length * FORMATS.length} variants`,
    );
  }

  console.log(
    `[optimize-blog-images] done: ${sources.length} sources, ${totalSkipped} variants up-to-date, ${formatKb(totalGeneratedBytes)} newly written (sources ${formatKb(totalSourceBytes)})`,
  );
}

main().catch((err) => {
  console.error("[optimize-blog-images] failed:", err);
  process.exit(1);
});
