/**
 * Blog post shape: metadata in the manifest, body in Markdown (imported ?raw).
 */

export type BlogTag = "Infrastructure" | "How-to" | "Deep Dive" | "Security" | "Use Case" | "Product";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 date (YYYY-MM-DD) */
  publishedAt: string;
  content: string;
  tags?: BlogTag[];
  /**
   * Optional cover image path (relative to /public, e.g. "/blog/my-post.jpg").
   * When absent the layout renders text-only — never use a placeholder.
   */
  coverImage?: string;
}
