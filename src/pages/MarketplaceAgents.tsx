import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketplaceCatalogToolbar } from "@/components/marketing/MarketplaceCatalogToolbar";
import { usePublicAgentPackages } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import {
  agentPackageInstallUrl,
  marketplaceAgentPath,
} from "@/lib/marketplaceLinks";

export default function MarketplaceAgents() {
  const [query, setQuery] = useState("");
  const [connectorFilter, setConnectorFilter] = useState("");
  const { data: agents = [], isLoading, isError } = usePublicAgentPackages(
    connectorFilter || undefined,
  );
  const { data: connectors = [] } = usePublicConnectors();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return agents;
    }
    return agents.filter((agent) => {
      const haystack = [
        agent.display_name,
        agent.description,
        agent.package_id,
        ...(agent.connector_slugs ?? []),
        ...(agent.capability_groups ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [agents, query]);

  return (
    <div className="marketing-page">
      <Seo
        title="Agent Marketplace"
        description="Browse installable AgentRuntime agent packages with connector requirements and hire options."
        canonicalPath="/marketplace/agents"
      />
      <PageHero
        centered
        eyebrow={
          isLoading
            ? "Loading marketplace"
            : isError
              ? "Marketplace"
              : `${filtered.length} agent packages`
        }
        title="Hire governed agents with explicit tool boundaries."
        description="Discover platform and public agent packages, review connector requirements, and install or hire them in Console."
        primary={{ label: "Discuss a custom agent →", to: "/contact" }}
        secondary={{ label: "Browse workflows", to: "/marketplace/workflows" }}
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
            searchLabel="Search agents"
          />

          {isError ? (
            <p className="marketing-section-intro">
              Agent catalog is temporarily unavailable. Try again later or contact us for
              recommendations.
            </p>
          ) : null}

          <div className="marketing-grid-3">
            {filtered.map((agent) => (
              <article className="marketing-card" key={`${agent.package_id}:${agent.version}`}>
                <div className="marketing-card-number">{agent.visibility}</div>
                <h3>
                  <Link to={marketplaceAgentPath(agent.package_id)}>
                    {agent.display_name}
                  </Link>
                </h3>
                <p>{agent.description || "Published agent package."}</p>
                <div className="marketing-marketplace-card-meta">
                  {(agent.connector_slugs ?? []).map((slug) => (
                    <Link key={slug} to={`/integrations/${slug}`}>
                      {slug}
                    </Link>
                  ))}
                  {(agent.capability_groups ?? []).map((group) => (
                    <span key={group}>{group}</span>
                  ))}
                  {agent.hire_required ? <span>hire required</span> : null}
                  {agent.price_credits ? <span>{agent.price_credits} credits</span> : null}
                </div>
                <div className="marketing-marketplace-card-actions">
                  <Link className="marketing-inline-link" to={marketplaceAgentPath(agent.package_id)}>
                    View details →
                  </Link>
                  <a
                    className="marketing-inline-link"
                    href={agentPackageInstallUrl(agent.package_id, agent.version)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Console ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && !isError && filtered.length === 0 ? (
            <p className="marketing-section-intro">
              No public agent packages match your filters yet.
            </p>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Need an agent package for your workspace?"
        description="Publish from Console with platform or public visibility, or work with us to feature your governed agent on the marketing site."
        primary={{ label: "Contact the team →", to: "/contact" }}
        secondary={{ label: "Browse bundles", to: "/marketplace/bundles" }}
      />
    </div>
  );
}
