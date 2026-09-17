/**
 * Parse `src/blog/posts.ts` for RSS + sitemap without executing TypeScript.
 */
import { readFileSync } from "node:fs";

const BLOCK_RE = /  "([^"]+)": \{([\s\S]*?)\n  \},/g;

function readQuotedField(block, name) {
  const m = block.match(new RegExp(`${name}: "([^"]*)"`));
  return m ? m[1] : undefined;
}

/**
 * @param {string} postsTsPath
 * @returns {{ slug: string, title: string, description: string, publishedAt: string, coverImage?: string, videoPoster?: string }[]}
 */
export function parseBlogPosts(postsTsPath) {
  const src = readFileSync(postsTsPath, "utf8");
  const posts = [];
  for (const m of src.matchAll(BLOCK_RE)) {
    const block = m[2];
    const slug = readQuotedField(block, "slug");
    const title = readQuotedField(block, "title");
    const description = readQuotedField(block, "description");
    const publishedAt = readQuotedField(block, "publishedAt");
    if (!slug || !title || !publishedAt) {
      continue;
    }
    posts.push({
      slug,
      title,
      description: description ?? "",
      publishedAt,
      coverImage: readQuotedField(block, "coverImage"),
      videoPoster: readQuotedField(block, "videoPoster"),
    });
  }
  return posts;
}

/** `/blog/blog-foo.png` → `/blog/blog-foo-800.webp` */
export function coverImageWebp800Path(coverPath) {
  const filename = coverPath.split("/").pop().replace(/\.(png|jpe?g)$/i, "");
  return `/blog/${filename}-800.webp`;
}
