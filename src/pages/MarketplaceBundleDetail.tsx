import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import { usePublicCatalogBundle } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import { getIntegrationMark } from "@/lib/marketingCatalog";
import {
  catalogBundleInstallUrl,
  marketplaceAgentPath,
  marketplaceWorkflowPath,
} from "@/lib/marketplaceLinks";

export default function MarketplaceBundleDetail() {
  const { bundleId = "" } = useParams<{ bundleId: string }>();
  const decodedBundleId = decodeURIComponent(bundleId);
  const { data: bundle, isLoading, isError } = usePublicCatalogBundle(decodedBundleId);
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

  if (isError || !bundle) {
    return <Navigate to="/marketplace/bundles" replace />;
  }

  return (
    <div className="marketing-page">
      <Seo
        title={`${bundle.display_name} — Bundle Marketplace`}
        description={
          bundle.description ||
          `Install the ${bundle.display_name} catalog bundle in AgentRuntime Console.`
        }
        canonicalPath={`/marketplace/bundles/${encodeURIComponent(bundle.bundle_id)}`}
      />
      <PageHero
        eyebrow={`${bundle.visibility} catalog bundle`}
        title={bundle.display_name}
        description={bundle.description || "Published catalog bundle for AgentRuntime Console."}
        primary={{
          label: "Open in Console ↗",
          href: catalogBundleInstallUrl(bundle.bundle_id, bundle.version),
        }}
        secondary={{ label: "Back to bundles", to: "/marketplace/bundles" }}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <MarketplaceNav />
          <div className="marketing-grid-2">
            <div>
              <div className="marketing-section-label">Bundle facts</div>
              <dl className="marketing-marketplace-facts">
                <div>
                  <dt>Bundle ID</dt>
                  <dd><code>{bundle.bundle_id}</code></dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{bundle.version}</dd>
                </div>
                <div>
                  <dt>Hire required</dt>
                  <dd>{bundle.hire_required ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{bundle.price_credits ? `${bundle.price_credits} credits` : "Free"}</dd>
                </div>
              </dl>
            </div>

            <div>
              <div className="marketing-section-label">Connectors required</div>
              {(bundle.connector_slugs ?? []).length > 0 ? (
                <div className="marketing-related-integrations">
                  <div>
                    {(bundle.connector_slugs ?? []).map((slug) => {
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
                  Connector requirements are derived from bundled workflow packages.
                </p>
              )}
            </div>
          </div>

          <div className="marketing-marketplace-bundle-contents">
            {bundle.agent_package_id ? (
              <div>
                <div className="marketing-section-label">Included agent</div>
                <Link className="marketing-inline-link" to={marketplaceAgentPath(bundle.agent_package_id)}>
                  {bundle.agent_package_id} →
                </Link>
              </div>
            ) : null}

            {(bundle.workflow_package_ids ?? []).length > 0 ? (
              <div>
                <div className="marketing-section-label">Included workflows</div>
                <ul>
                  {bundle.workflow_package_ids?.map((packageId) => (
                    <li key={packageId}>
                      <Link className="marketing-inline-link" to={marketplaceWorkflowPath(packageId)}>
                        {packageId} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <CallToAction
        tone="dark"
        title="Ready to install this bundle?"
        description="Open Console to install the agent and workflow packages together."
        primary={{
          label: "Open in Console ↗",
          href: catalogBundleInstallUrl(bundle.bundle_id, bundle.version),
        }}
        secondary={{ label: "Browse workflows", to: "/marketplace/workflows" }}
      />
    </div>
  );
}
