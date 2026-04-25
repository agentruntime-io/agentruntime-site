import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { BLOG_POSTS, getPostBySlug } from "@/blog/posts";
import { extractHeadings } from "@/legal/utils";
import { Seo } from "@/components/Seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={post.title}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <nav className="space-y-1" aria-label="All posts">
              {BLOG_POSTS.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    p.slug === post.slug
                      ? "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-2">
              {format(new Date(post.publishedAt + "T12:00:00"), "MMMM d, yyyy")}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{post.title}</h1>

            {headings.length > 0 && (
              <div className="mb-8 p-4 rounded-lg bg-muted/50 border border-border">
                <h2 className="text-sm font-semibold text-foreground mb-3">Table of contents</h2>
                <ul className="list-none space-y-2 text-sm text-muted-foreground">
                  {headings
                    .filter((h) => h.level <= 2)
                    .map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="hover:text-primary transition-colors">
                          {h.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown rehypePlugins={[rehypeSlug]}>{post.content}</ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
