/**
 * Blog manifest. Maps URL slugs to Markdown content and metadata.
 * Add new posts by adding a `.md` file under `posts/` and an entry here.
 */

import introducingRaw from "@/blog/posts/introducing-the-agentruntime-blog.md?raw";
import type { BlogPost } from "@/blog/types";

const postMap: Record<string, BlogPost> = {
  "introducing-the-agentruntime-blog": {
    slug: "introducing-the-agentruntime-blog",
    title: "Introducing the AgentRuntime blog",
    description:
      "Product updates, engineering notes, and practical guidance for running AI agents in production on AgentRuntime.",
    publishedAt: "2026-04-20",
    content: introducingRaw,
  },
};

export const BLOG_POSTS: BlogPost[] = Object.values(postMap).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = postMap[slug];
  return post ? { ...post } : undefined;
}

export function getBlogSlugs(): string[] {
  return Object.keys(postMap);
}
