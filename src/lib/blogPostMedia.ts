import type { BlogPost } from "@/blog/types";
import { getBlogCoverOgPath } from "@/lib/blogCoverImage";

/** Card / hero thumbnail: cover image, else PNG poster frame, else SVG poster. */
export function getBlogPostPreviewImage(post: BlogPost): string | undefined {
  return post.coverImage ?? post.videoPoster ?? post.videoPosterSvg;
}

/** og:image path for article pages. */
export function getBlogPostOgImagePath(post: BlogPost): string | undefined {
  if (post.coverImage) {
    return getBlogCoverOgPath(post.coverImage);
  }
  return post.videoPoster;
}
