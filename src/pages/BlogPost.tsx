import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BLOG_POSTS, getPostBySlug } from "@/blog/posts";
import { type BlogTag } from "@/blog/types";
import { extractHeadings } from "@/legal/utils";
import { Seo } from "@/components/Seo";

const TAG_COLORS: Record<BlogTag, string> = {
  Infrastructure: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "How-to":       "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Deep Dive":    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Security:       "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Use Case":     "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Product:        "bg-primary/10 text-primary border-primary/20",
};

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const headings = extractHeadings(post.content).filter((h) => h.level <= 2);
  const minutes = readTime(post.content);

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.tags?.some((t) => post.tags?.includes(t))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={post.title}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${TAG_COLORS[tag]}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span>{format(new Date(post.publishedAt + "T12:00:00"), "MMMM d, yyyy")}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {minutes}
              </span>
            </div>

            {/* Cover image — only rendered when present */}
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-xl object-cover mb-10 max-h-96"
              />
            )}

            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{post.content}</ReactMarkdown>
            </article>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">More from the blog</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${TAG_COLORS[tag]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {p.title}
                      </p>
                      <span className="mt-auto text-xs text-primary flex items-center gap-1 font-medium">
                        Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky TOC sidebar — only rendered when there are headings */}
          {headings.length > 1 && (
            <aside className="hidden lg:block lg:w-56 flex-shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  On this page
                </p>
                <nav className="space-y-1.5" aria-label="Table of contents">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-sm transition-colors hover:text-primary ${
                        h.level === 2
                          ? "text-muted-foreground pl-3"
                          : "text-muted-foreground/70 pl-5"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
