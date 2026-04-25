import { Link } from "react-router-dom";
import { ArrowLeft, Newspaper } from "lucide-react";
import { format } from "date-fns";
import { BLOG_POSTS } from "@/blog/posts";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo {...seoCopy.blog} canonicalPath="/blog" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Updates, engineering notes, and guidance for running agents in production.
        </p>

        <div className="grid gap-4">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Newspaper className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">
                  {format(new Date(post.publishedAt + "T12:00:00"), "MMMM d, yyyy")}
                </p>
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
