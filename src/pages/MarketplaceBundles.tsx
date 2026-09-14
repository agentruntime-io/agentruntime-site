import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketplaceCatalogToolbar } from "@/components/marketing/MarketplaceCatalogToolbar";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import { usePublicCatalogBundles } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import {
  catalogBundleInstallUrl,
  marketplaceBundlePath,
} from "@/lib/marketplaceLinks";

export default function MarketplaceBundles() {
  const [query, setQuery] = useState("");
  const [connectorFilter, setConnectorFilter] = useState("");
  const { data: bundles = [], isLoading, isError } = usePublicCatalogBundles(
    connectorFilter || undefined,
  );
  const { data: connectors = [] } = usePublicConnectors();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return bundles;
    }
    return bundles.filter((bundle) => {
      const haystack = [
        bundle.display_name,
        bundle.description,
        bundle.bundle_id,
        bundle.agent_package_id,
        ...(bundle.workflow_package_ids ?? []),
        ...(bundle.connector_slugs ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [bundles, query]);

  return (
    <div className="marketing-page">
      <Seo
        title="Bundle Marketplace"
        description="Browse AgentRuntime catalog bundles that combine agents and workflow packages for faster installs."
        canonicalPath="/marketplace/bundles"
      />
      <PageHero
        centered
        eyebrow={
          isError || isLoading
            ? "Marketplace"
            : `${filtered.length} catalog bundles`
        }
        title="Install agent + workflow packages together."
        description="Bundles wire a governed agent to the workflow packages it needs so teams can adopt a complete operating pattern in one step."
        primary={{ label: "Discuss a bundle →", to: "/contact" }}
        secondary={{ label: "Browse agents", to: "/marketplace/agents" }}
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
            searchLabel="Search bundles"
          />

          {isError ? (
            <p className="marketing-section-intro">
              Bundle catalog is temporarily unavailable. Try again later or contact us for
              recommendations.
            </p>
          ) : null}

          {isLoading ? (
            <MarketingLoadingGraphic variant="cards" count={6} />
          ) : (
          <div className="marketing-grid-3">
            {filtered.map((bundle) => (
              <article className="marketing-card" key={`${bundle.bundle_id}:${bundle.version}`}>
                <div className="marketing-card-number">{bundle.visibility}</div>
                <h3>
                  <Link to={marketplaceBundlePath(bundle.bundle_id)}>
                    {bundle.display_name}
                  </Link>
                </h3>
                <p>{bundle.description || "Published catalog bundle."}</p>
                <div className="marketing-marketplace-card-meta">
                  {(bundle.connector_slugs ?? []).map((slug) => (
                    <Link key={slug} to={`/integrations/${slug}`}>
                      {slug}
                    </Link>
                  ))}
                  {bundle.workflow_package_ids?.length ? (
                    <span>{bundle.workflow_package_ids.length} workflows</span>
                  ) : null}
                  {bundle.hire_required ? <span>hire required</span> : null}
                  {bundle.price_credits ? <span>{bundle.price_credits} credits</span> : null}
                </div>
                <div className="marketing-marketplace-card-actions">
                  <Link className="marketing-inline-link" to={marketplaceBundlePath(bundle.bundle_id)}>
                    View details →
                  </Link>
                  <a
                    className="marketing-inline-link"
                    href={catalogBundleInstallUrl(bundle.bundle_id, bundle.version)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Console ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
          )}

          {!isLoading && !isError && filtered.length === 0 ? (
            <p className="marketing-section-intro">
              No public catalog bundles match your filters yet.
            </p>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Need a bundle for your operating model?"
        description="Publish coordinated agent and workflow packages from Console, or work with us to feature a complete bundle on the marketing site."
        primary={{ label: "Contact the team →", to: "/contact" }}
        secondary={{ label: "Browse workflows", to: "/marketplace/workflows" }}
      />
    </div>
  );
}
