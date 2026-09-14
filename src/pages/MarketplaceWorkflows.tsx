import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketplaceCatalogToolbar } from "@/components/marketing/MarketplaceCatalogToolbar";
import { usePublicWorkflowPackages } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import {
  marketplaceWorkflowPath,
  workflowPackageInstallUrl,
} from "@/lib/marketplaceLinks";

export default function MarketplaceWorkflows() {
  const [query, setQuery] = useState("");
  const [connectorFilter, setConnectorFilter] = useState("");
  const { data: workflows = [], isLoading, isError } = usePublicWorkflowPackages(
    connectorFilter || undefined,
  );
  const { data: connectors = [] } = usePublicConnectors();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return workflows;
    }
    return workflows.filter((workflow) => {
      const haystack = [
        workflow.display_name,
        workflow.description,
        workflow.package_id,
        ...(workflow.connector_slugs ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, workflows]);

  return (
    <div className="marketing-page">
      <Seo
        title="Workflow Marketplace"
        description="Browse installable AgentRuntime workflow packages with connector requirements, triggers, and governance signals."
        canonicalPath="/marketplace/workflows"
      />
      <PageHero
        centered
        eyebrow={
          isLoading
            ? "Loading marketplace"
            : isError
              ? "Marketplace"
              : `${filtered.length} workflow packages`
        }
        title="Installable workflows for production agent operations."
        description="Discover platform and public workflow packages, see which connectors they require, and install them in Console."
        primary={{ label: "Discuss a custom workflow →", to: "/contact" }}
        secondary={{ label: "Browse integrations", to: "/integrations" }}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <MarketplaceNav />
          <MarketplaceCatalogToolbar
            query={query}
            onQueryChange={setQuery}
            connectorFilter={connectorFilter}
            onConnectorFilterChange={setConnectorFilter}
            connectors={connectors}
            searchLabel="Search workflows"
          />

          {isError ? (
            <p className="marketing-section-intro">
              Marketplace catalog is temporarily unavailable. Try again later or contact us
              for package recommendations.
            </p>
          ) : null}

          <div className="marketing-grid-3">
            {filtered.map((workflow) => (
              <article className="marketing-card" key={`${workflow.package_id}:${workflow.version}`}>
                <div className="marketing-card-number">{workflow.visibility}</div>
                <h3>
                  <Link to={marketplaceWorkflowPath(workflow.package_id)}>
                    {workflow.display_name}
                  </Link>
                </h3>
                <p>{workflow.description || "Published workflow package."}</p>
                <div className="marketing-marketplace-card-meta">
                  {(workflow.connector_slugs ?? []).map((slug) => (
                    <Link key={slug} to={`/integrations/${slug}`}>
                      {slug}
                    </Link>
                  ))}
                  {workflow.trigger_kinds?.map((kind) => (
                    <span key={kind}>{kind}</span>
                  ))}
                  {workflow.has_human_task ? <span>human review</span> : null}
                </div>
                <div className="marketing-marketplace-card-actions">
                  <Link
                    className="marketing-inline-link"
                    to={marketplaceWorkflowPath(workflow.package_id)}
                  >
                    View details →
                  </Link>
                  <a
                    className="marketing-inline-link"
                    href={workflowPackageInstallUrl(workflow.package_id, workflow.version)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Install in Console ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && !isError && filtered.length === 0 ? (
            <p className="marketing-section-intro">
              No public workflow packages match your filters yet.
            </p>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Need a workflow package for your stack?"
        description="Publish from Studio with platform or public visibility, or work with us to feature your governed workflow on the marketing site."
        primary={{ label: "Contact the team →", to: "/contact" }}
        secondary={{ label: "Explore integrations", to: "/integrations" }}
      />
    </div>
  );
}
