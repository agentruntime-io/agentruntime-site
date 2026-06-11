import { getPostBySlug } from "@/blog/posts";
import type { BlogPost } from "@/blog/types";

/** Curated posts for internal linking (home, nav, footer, blog index). Order = priority. */
export const FEATURED_BLOG_SLUGS = [
  "why-ai-agents-fail-in-production",
  "what-is-mcp-and-why-it-matters",
  "observability-for-ai-agents",
  "human-in-the-loop-ai-workflows",
  "simulate-before-you-deploy",
  "introducing-the-agentruntime-blog",
] as const;

export type FeaturedBlogSlug = (typeof FEATURED_BLOG_SLUGS)[number];

export const HOME_FEATURED_SLUGS = FEATURED_BLOG_SLUGS.slice(0, 3);
export const NAV_FEATURED_SLUGS = FEATURED_BLOG_SLUGS.slice(0, 4);
export const FOOTER_FEATURED_SLUGS = FEATURED_BLOG_SLUGS.slice(0, 4);

const featuredSlugSet = new Set<string>(FEATURED_BLOG_SLUGS);

export function isFeaturedBlogSlug(slug: string): slug is FeaturedBlogSlug {
  return featuredSlugSet.has(slug);
}

export function getFeaturedPosts(slugs: readonly string[] = FEATURED_BLOG_SLUGS): BlogPost[] {
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== undefined);
}
