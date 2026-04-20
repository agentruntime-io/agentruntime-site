import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { LEGAL_POLICIES } from "@/legal/policies";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo {...seoCopy.legal} canonicalPath="/legal" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Legal
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Review our terms, policies, and agreements that govern your use of the AgentRuntime platform.
        </p>

        <div className="grid gap-4">
          {LEGAL_POLICIES.map((policy) => (
            <Link
              key={policy.slug}
              to={`/legal/${policy.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {policy.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  /legal/{policy.slug}
                </p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legal;
