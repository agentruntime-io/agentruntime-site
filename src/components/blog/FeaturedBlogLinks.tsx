import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/blog/types";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";

type FeaturedBlogLinksProps = {
  posts: BlogPost[];
  /** Home page: larger cards; compact: footer-style list */
  variant?: "home" | "compact" | "start-here";
};

export function FeaturedBlogLinks({ posts, variant = "home" }: FeaturedBlogLinksProps) {
  if (posts.length === 0) {
    return null;
  }

  if (variant === "compact") {
    return (
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text line-clamp-2"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "start-here") {
    return (
      <div className="marketing-blog-guide-grid">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="marketing-blog-guide"
          >
            <span className="marketing-blog-guide-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <span className="marketing-blog-read-link">
              Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
        >
          {post.coverImage ? (
            <BlogCoverImage
              coverImage={post.coverImage}
              alt=""
              variant="card"
              className="w-full h-36 object-cover rounded-lg mb-4"
              loading="lazy"
            />
          ) : null}
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">{post.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
            <span>{format(new Date(post.publishedAt + "T12:00:00"), "MMM d, yyyy")}</span>
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
