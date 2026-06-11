import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NAV_FEATURED_SLUGS, getFeaturedPosts } from "@/blog/featuredPosts";

type NavBlogMenuProps = {
  active: boolean;
  linkClass: (active: boolean) => string;
  onNavigate?: () => void;
  /** Desktop: hover flyout; mobile: stacked links under Blog */
  layout: "desktop" | "mobile";
};

const featuredPosts = getFeaturedPosts(NAV_FEATURED_SLUGS);

export function NavBlogMenu({ active, linkClass, onNavigate, layout }: NavBlogMenuProps) {
  if (layout === "mobile") {
    return (
      <div>
        <Link
          to="/blog"
          className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
            active
              ? "text-primary bg-primary/10 dark:glow-text dark:bg-primary/20"
              : "text-muted-foreground hover:text-primary hover:bg-muted dark:hover:bg-primary/10 dark:hover:glow-text"
          }`}
          onClick={onNavigate}
        >
          Blog
        </Link>
        <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-primary rounded-md transition-colors"
              onClick={onNavigate}
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link to="/blog" className={`${linkClass(active)} inline-flex items-center gap-1`}>
        Blog
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" aria-hidden />
      </Link>
      <div className="absolute left-0 top-full z-50 pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
        <div className="w-80 rounded-xl border border-border bg-card shadow-lg py-2">
          <Link
            to="/blog"
            className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
          >
            All blog posts
          </Link>
          <div className="my-1 border-t border-border" />
          <p className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Popular guides
          </p>
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted/60 hover:text-primary transition-colors line-clamp-2"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
