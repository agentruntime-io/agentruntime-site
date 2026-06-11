import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { BLOG_POSTS } from "@/blog/posts";
import { FEATURED_BLOG_SLUGS, getFeaturedPosts, isFeaturedBlogSlug } from "@/blog/featuredPosts";
import { FeaturedBlogLinks } from "@/components/blog/FeaturedBlogLinks";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { type BlogTag } from "@/blog/types";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";
import { Badge } from "@/components/ui/badge";
import { BlogListJsonLd } from "@/components/BlogListJsonLd";

const TAG_COLORS: Record<BlogTag, string> = {
  Infrastructure: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "How-to":       "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Deep Dive":    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Security:       "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Use Case":     "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Product:        "bg-primary/10 text-primary border-primary/20",
};

const ALL_TAGS = Object.keys(TAG_COLORS) as BlogTag[];

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

const Blog = () => {
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);

  const filtered = activeTag
    ? BLOG_POSTS.filter((p) => p.tags?.includes(activeTag))
    : BLOG_POSTS;

  const showStartHere = activeTag === null;
  const curatedFeatured = showStartHere ? getFeaturedPosts() : [];
  const startHerePosts = curatedFeatured.slice(1);
  const featuredSlugs = new Set(FEATURED_BLOG_SLUGS);

  const hero = (showStartHere ? curatedFeatured[0] : undefined) ?? filtered[0];

  const rest = filtered.filter((p) => {
    if (p.slug === hero?.slug) {
      return false;
    }
    if (showStartHere && featuredSlugs.has(p.slug)) {
      return false;
    }
    return true;
  });

  const orderedPosts = [
    ...(hero ? [hero] : []),
    ...(showStartHere ? startHerePosts : []),
    ...rest,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo {...seoCopy.blog} canonicalPath="/blog" />
      <BlogListJsonLd posts={orderedPosts} description={seoCopy.blog.description} />

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground max-w-xl">
            Engineering notes, production patterns, and guidance for building with AI agents.
          </p>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                activeTag === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : `bg-transparent border-border hover:border-primary/40 ${TAG_COLORS[tag]}`
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-16">No posts in this category yet.</p>
        )}

        {/* Featured post — largest card */}
        {hero && (
          <Link
            to={`/blog/${hero.slug}`}
            className="group block mb-10 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {/* Cover image — only rendered when present */}
            {hero.coverImage && (
              <BlogCoverImage
                coverImage={hero.coverImage}
                alt={hero.title}
                variant="hero"
                className="w-full h-56 md:h-72 object-cover"
                fetchPriority="high"
              />
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {showStartHere && isFeaturedBlogSlug(hero.slug) ? (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                ) : null}
                {hero.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${TAG_COLORS[tag]}`}
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground">
                  {format(new Date(hero.publishedAt + "T12:00:00"), "MMMM d, yyyy")}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{readTime(hero.content)}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                {hero.title}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4 max-w-2xl">
                {hero.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* Start here — curated guides */}
        {showStartHere && startHerePosts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-1">Start here</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Essential reading for production AI agents and workflows.
            </p>
            <FeaturedBlogLinks posts={startHerePosts} variant="start-here" />
          </div>
        )}

        {/* Remaining posts — 2-column grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Cover image — only rendered when present */}
                {post.coverImage && (
                  <BlogCoverImage
                    coverImage={post.coverImage}
                    alt={post.title}
                    variant="grid"
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${TAG_COLORS[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                    <span>{format(new Date(post.publishedAt + "T12:00:00"), "MMM d, yyyy")}</span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
