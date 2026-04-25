/**
 * Blog post shape: metadata in the manifest, body in Markdown (imported ?raw).
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 date (YYYY-MM-DD) */
  publishedAt: string;
  content: string;
}
