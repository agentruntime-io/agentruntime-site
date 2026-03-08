import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { getPolicyBySlug, LEGAL_POLICIES } from "@/legal/policies";
import { extractHeadings } from "@/legal/utils";

const LegalPolicy = () => {
  const { policyName } = useParams<{ policyName: string }>();
  const policy = policyName ? getPolicyBySlug(policyName) : undefined;

  if (!policy) {
    return <Navigate to="/legal" replace />;
  }

  const headings = extractHeadings(policy.content);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Legal navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <Link
              to="/legal"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Legal
            </Link>
            <nav className="space-y-1">
              {LEGAL_POLICIES.map((p) => (
                <Link
                  key={p.slug}
                  to={`/legal/${p.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    p.slug === policy.slug
                      ? "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {policy.title}
            </h1>

            {headings.length > 0 && (
              <div className="mb-8 p-4 rounded-lg bg-muted/50 border border-border">
                <h2 className="text-sm font-semibold text-foreground mb-3">
                  Table of contents
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  {headings
                    .filter((h) => h.level <= 2)
                    .map((h, i) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                </ol>
              </div>
            )}

            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                {policy.content}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;
