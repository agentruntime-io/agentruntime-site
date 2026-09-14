import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import { usePublicAgentPackage } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import { getIntegrationMark } from "@/lib/marketingCatalog";
import { agentPackageInstallUrl } from "@/lib/marketplaceLinks";

export default function MarketplaceAgentDetail() {
  const { packageId = "" } = useParams<{ packageId: string }>();
  const decodedPackageId = decodeURIComponent(packageId);
  const { data: agent, isLoading, isError } = usePublicAgentPackage(decodedPackageId);
  const { data: connectors = [] } = usePublicConnectors();

  if (isLoading) {
    return (
      <div className="marketing-page">
        <div className="marketing-container">
          <MarketingLoadingGraphic variant="detail" />
        </div>
      </div>
    );
  }

  if (isError || !agent) {
    return <Navigate to="/marketplace/agents" replace />;
  }

  return (
    <div className="marketing-page">
      <Seo
        title={`${agent.display_name} — Agent Marketplace`}
        description={
          agent.description ||
          `Install the ${agent.display_name} agent package in AgentRuntime Console.`
        }
        canonicalPath={`/marketplace/agents/${encodeURIComponent(agent.package_id)}`}
      />
      <PageHero
        eyebrow={`${agent.visibility} agent package`}
        title={agent.display_name}
        description={agent.description || "Published agent package for AgentRuntime Console."}
        primary={{
          label: "Open in Console ↗",
          href: agentPackageInstallUrl(agent.package_id, agent.version),
        }}
        secondary={{ label: "Back to agents", to: "/marketplace/agents" }}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <MarketplaceNav />
          <div className="marketing-grid-2">
            <div>
              <div className="marketing-section-label">Package facts</div>
              <dl className="marketing-marketplace-facts">
                <div>
                  <dt>Package ID</dt>
                  <dd><code>{agent.package_id}</code></dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{agent.version}</dd>
                </div>
                <div>
                  <dt>Hire required</dt>
                  <dd>{agent.hire_required ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{agent.price_credits ? `${agent.price_credits} credits` : "Free"}</dd>
                </div>
                <div>
                  <dt>Workflows wired</dt>
                  <dd>{agent.workflow_count ?? 0}</dd>
                </div>
              </dl>
            </div>

            <div>
              <div className="marketing-section-label">Connectors referenced</div>
              {(agent.connector_slugs ?? []).length > 0 ? (
                <div className="marketing-related-integrations">
                  <div>
                    {(agent.connector_slugs ?? []).map((slug) => {
                      const connector = connectors.find((item) => item.slug === slug);
                      const name = connector?.name ?? slug;
                      return (
                        <Link to={`/integrations/${slug}`} key={slug}>
                          <span className="marketing-integration-mark" aria-hidden="true">
                            {getIntegrationMark(name)}
                          </span>
                          <strong>{name}</strong>
                          <b aria-hidden="true">→</b>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="marketing-section-intro">
                  Connector requirements will appear after the package is republished with
                  marketing index metadata.
                </p>
              )}
            </div>
          </div>

          {(agent.capability_groups ?? []).length > 0 ? (
            <div className="marketing-marketplace-card-meta">
              {agent.capability_groups?.map((group) => (
                <span key={group}>{group}</span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="dark"
        title="Ready to install this agent?"
        description="Open Console to install or hire the package, wire MCP instances, and publish."
        primary={{
          label: "Open in Console ↗",
          href: agentPackageInstallUrl(agent.package_id, agent.version),
        }}
        secondary={{ label: "Browse integrations", to: "/integrations" }}
      />
    </div>
  );
}
