/**
 * Parse `src/blog/posts.ts` for RSS + sitemap without executing TypeScript.
 * Expects each post block: slug, title, description, publishedAt, tags, coverImage in that order.
 */
import { readFileSync } from "node:fs";

const BLOCK =
  /  "[^"]+": \{\s*\n    slug: "([^"]+)",\s*\n    title: "([^"]+)",\s*\n    description:\s*\n      "([^"]*)",\s*\n    publishedAt: "([^"]+)",\s*\n    tags: \[[^\]]*\],\s*\n    coverImage: "([^"]+)",/g;

/**
 * @param {string} postsTsPath
 * @returns {{ slug: string, title: string, description: string, publishedAt: string, coverImage: string }[]}
 */
export function parseBlogPosts(postsTsPath) {
  const src = readFileSync(postsTsPath, "utf8");
  const posts = [];
  for (const m of src.matchAll(BLOCK)) {
    posts.push({
      slug: m[1],
      title: m[2],
      description: m[3],
      publishedAt: m[4],
      coverImage: m[5],
    });
  }
  return posts;
}

/** `/blog/blog-foo.png` → `/blog/blog-foo-800.webp` */
export function coverImageWebp800Path(coverPath) {
  const filename = coverPath.split("/").pop().replace(/\.(png|jpe?g)$/i, "");
  return `/blog/${filename}-800.webp`;
}
