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
import { BlogListJsonLd } from "@/components/BlogListJsonLd";
import { Eyebrow } from "@/components/marketing/MarketingPrimitives";

const ALL_TAGS: BlogTag[] = [
  "Infrastructure",
  "How-to",
  "Deep Dive",
  "Security",
  "Use Case",
  "Product",
];

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
    <div className="marketing-page marketing-blog-page">
      <Seo {...seoCopy.blog} canonicalPath="/blog" />
      <BlogListJsonLd
        posts={orderedPosts}
        description={seoCopy.blog.description}
      />

      <header className="marketing-blog-header">
        <div className="marketing-container">
          <Eyebrow>Field notes</Eyebrow>
          <h1>Ideas for operating AI beyond the prototype.</h1>
          <p>
            Engineering notes, production patterns, and guidance for building
            with AI agents.
          </p>

          <div
            className="marketing-blog-filters"
            aria-label="Filter posts by topic"
          >
            <button
              onClick={() => setActiveTag(null)}
              className="marketing-blog-filter"
              data-active={activeTag === null}
              type="button"
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className="marketing-blog-filter"
                data-active={activeTag === tag}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="marketing-container marketing-blog-content">
        {filtered.length === 0 && (
          <p className="marketing-blog-empty">No posts in this category yet.</p>
        )}

        {hero && (
          <Link
            to={`/blog/${hero.slug}`}
            className="marketing-blog-featured"
          >
            {hero.coverImage && (
              <BlogCoverImage
                coverImage={hero.coverImage}
                alt={hero.title}
                variant="hero"
                className="marketing-blog-featured-image"
                fetchPriority="high"
              />
            )}
            <div className="marketing-blog-featured-body">
              <div className="marketing-blog-meta">
                {showStartHere && isFeaturedBlogSlug(hero.slug) ? (
                  <span className="marketing-blog-tag" data-accent="true">
                    Featured
                  </span>
                ) : null}
                {hero.tags?.map((tag) => (
                  <span className="marketing-blog-tag" key={tag}>
                    {tag}
                  </span>
                ))}
                <span>
                  {format(
                    new Date(hero.publishedAt + "T12:00:00"),
                    "MMMM d, yyyy",
                  )}
                </span>
                <span>·</span>
                <span>{readTime(hero.content)}</span>
              </div>
              <h2>{hero.title}</h2>
              <p>{hero.description}</p>
              <span className="marketing-blog-read-link">
                Read post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {showStartHere && startHerePosts.length > 0 && (
          <section className="marketing-blog-start-here">
            <div className="marketing-section-label">Start here</div>
            <h2>Build the production foundation first.</h2>
            <p>
              Essential reading for production AI agents and workflows.
            </p>
            <FeaturedBlogLinks posts={startHerePosts} variant="start-here" />
          </section>
        )}

        {rest.length > 0 && (
          <section className="marketing-blog-library">
            <div className="marketing-section-label">
              {activeTag ? `${activeTag} notes` : "Latest notes"}
            </div>
            <div className="marketing-blog-grid">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="marketing-blog-card"
                >
                  {post.coverImage && (
                    <BlogCoverImage
                      coverImage={post.coverImage}
                      alt={post.title}
                      variant="grid"
                      className="marketing-blog-card-image"
                      loading="lazy"
                    />
                  )}
                  <div className="marketing-blog-card-body">
                    <div className="marketing-blog-meta">
                      {post.tags?.map((tag) => (
                        <span className="marketing-blog-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <div className="marketing-blog-card-footer">
                      <span>
                        {format(
                          new Date(post.publishedAt + "T12:00:00"),
                          "MMM d, yyyy",
                        )}
                      </span>
                      <span className="marketing-blog-read-link">
                        Read{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blog;
