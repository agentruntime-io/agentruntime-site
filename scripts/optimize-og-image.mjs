/**
 * Optimize social preview assets from the source PNG in public/.
 * Outputs og-image.jpg (primary for crawlers) and og-image.png (fallback).
 */
import { existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const SOURCE_CANDIDATES = [
  join(PUBLIC, "agentruntime-og-image.png"),
  join(PUBLIC, "og-image.png"),
];

const OUT_JPG = join(PUBLIC, "og-image.jpg");
const OUT_PNG = join(PUBLIC, "og-image.png");
const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#f2efe8";

function resolveSource() {
  for (const candidate of SOURCE_CANDIDATES) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `Missing OG source image. Add public/agentruntime-og-image.png`,
  );
}

function isUpToDate(source, outputs) {
  const sourceTime = statSync(source).mtimeMs;
  return outputs.every(
    (output) => existsSync(output) && statSync(output).mtimeMs >= sourceTime,
  );
}

export async function optimizeOgImage({ force = false } = {}) {
  const source = resolveSource();
  const outputs = [OUT_JPG, OUT_PNG];

  if (!force && isUpToDate(source, outputs)) {
    console.log("optimize-og-image: up to date");
    return;
  }

  const base = await sharp(source)
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .flatten({ background: BACKGROUND })
    .toBuffer();

  await sharp(base).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT_JPG);
  await sharp(base).png({ compressionLevel: 9 }).toFile(OUT_PNG);

  const jpgKb = Math.round(statSync(OUT_JPG).size / 1024);
  const pngKb = Math.round(statSync(OUT_PNG).size / 1024);
  console.log(
    `optimize-og-image: wrote ${WIDTH}x${HEIGHT} -> og-image.jpg (${jpgKb}KB), og-image.png (${pngKb}KB)`,
  );
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isMain) {
  optimizeOgImage({ force: process.argv.includes("--force") }).catch((err) => {
    console.error("[optimize-og-image] failed:", err);
    process.exit(1);
  });
}
