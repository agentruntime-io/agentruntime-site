import { Play } from "lucide-react";
import type { BlogPost } from "@/blog/types";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { getBlogPostPreviewImage } from "@/lib/blogPostMedia";
import type { BlogCoverVariant } from "@/lib/blogCoverImage";

type BlogPostPreviewImageProps = {
  post: BlogPost;
  alt: string;
  variant: BlogCoverVariant;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export function BlogPostPreviewImage({
  post,
  alt,
  variant,
  className,
  loading,
  fetchPriority,
}: BlogPostPreviewImageProps) {
  if (post.coverImage) {
    return (
      <BlogCoverImage
        coverImage={post.coverImage}
        alt={alt}
        variant={variant}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  }

  const preview = getBlogPostPreviewImage(post);
  if (!preview) {
    return null;
  }

  const showPlay = Boolean(post.videoSrc);

  return (
    <div className="relative h-full overflow-hidden">
      <img
        src={preview}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
      {showPlay ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10"
          aria-hidden="true"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg">
            <Play className="h-6 w-6 fill-current" />
          </span>
        </div>
      ) : null}
    </div>
  );
}
