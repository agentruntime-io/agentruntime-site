/**
 * Parse `src/blog/posts.ts` for RSS + sitemap without executing TypeScript.
 * Expects each post block: slug, title, description (next line string), publishedAt in that order.
 */
import { readFileSync } from "node:fs";

const BLOCK =
  /  "[^"]+": \{\s*\n    slug: "([^"]+)",\s*\n    title: "([^"]+)",\s*\n    description:\s*\n      "([^"]*)",\s*\n    publishedAt: "([^"]+)"/g;

/**
 * @param {string} postsTsPath
 * @returns {{ slug: string, title: string, description: string, publishedAt: string }[]}
 */
export function parseBlogPosts(postsTsPath) {
  const src = readFileSync(postsTsPath, "utf8");
  const posts = [];
  for (const m of src.matchAll(BLOCK)) {
    posts.push({ slug: m[1], title: m[2], description: m[3], publishedAt: m[4] });
  }
  return posts;
}
