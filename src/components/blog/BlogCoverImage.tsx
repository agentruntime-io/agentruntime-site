import {
  buildBlogCoverSrcSet,
  getBlogCoverSizes,
  type BlogCoverVariant,
} from "@/lib/blogCoverImage";

type BlogCoverImageProps = {
  coverImage: string;
  alt: string;
  variant: BlogCoverVariant;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export function BlogCoverImage({
  coverImage,
  alt,
  variant,
  className,
  loading,
  fetchPriority,
}: BlogCoverImageProps) {
  const sizes = getBlogCoverSizes(variant);

  return (
    <picture>
      <source type="image/avif" srcSet={buildBlogCoverSrcSet(coverImage, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={buildBlogCoverSrcSet(coverImage, "webp")} sizes={sizes} />
      <img
        src={coverImage}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
