/** Responsive widths emitted by `scripts/optimize-blog-images.mjs`. */
export const BLOG_COVER_WIDTHS = [400, 800, 1200] as const;

export type BlogCoverVariant = "grid" | "hero" | "article" | "card";

export function blogCoverBasename(coverPath: string): string {
  const filename = coverPath.split("/").pop() ?? coverPath;
  return filename.replace(/\.(png|jpe?g)$/i, "");
}

export function blogCoverVariantPath(
  coverPath: string,
  width: number,
  ext: "webp" | "avif",
): string {
  return `/blog/${blogCoverBasename(coverPath)}-${width}.${ext}`;
}

/** Largest WebP for og:image and JSON-LD. */
export function getBlogCoverOgPath(coverPath: string): string {
  return blogCoverVariantPath(coverPath, 1200, "webp");
}

export function buildBlogCoverSrcSet(
  coverPath: string,
  ext: "webp" | "avif",
  widths: readonly number[] = BLOG_COVER_WIDTHS,
): string {
  return widths.map((w) => `${blogCoverVariantPath(coverPath, w, ext)} ${w}w`).join(", ");
}

export function getBlogCoverSizes(variant: BlogCoverVariant): string {
  switch (variant) {
    case "grid":
      return "(min-width: 640px) 50vw, 100vw";
    case "hero":
      return "100vw";
    case "card":
      return "(min-width: 768px) 33vw, 100vw";
    case "article":
      return "(min-width: 1024px) 896px, 100vw";
  }
}
