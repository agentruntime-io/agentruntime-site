import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { usePublicWorkflowPackage } from "@/hooks/usePublicMarketplace";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import { getIntegrationMark } from "@/lib/marketingCatalog";
import { MarketplaceNav } from "@/components/marketing/MarketplaceNav";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import { workflowPackageInstallUrl } from "@/lib/marketplaceLinks";

export default function MarketplaceWorkflowDetail() {
  const { packageId = "" } = useParams<{ packageId: string }>();
  const decodedPackageId = decodeURIComponent(packageId);
  const { data: workflow, isLoading, isError } = usePublicWorkflowPackage(decodedPackageId);
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

  if (isError || !workflow) {
    return <Navigate to="/marketplace" replace />;
  }

  return (
    <div className="marketing-page">
      <Seo
        title={`${workflow.display_name} — Workflow Marketplace`}
        description={
          workflow.description ||
          `Install the ${workflow.display_name} workflow package in AgentRuntime Console.`
        }
        canonicalPath={`/marketplace/workflows/${encodeURIComponent(workflow.package_id)}`}
      />
      <PageHero
        eyebrow={`${workflow.visibility} workflow package`}
        title={workflow.display_name}
        description={workflow.description || "Published workflow package for AgentRuntime Console."}
        primary={{
          label: "Install in Console ↗",
          href: workflowPackageInstallUrl(workflow.package_id, workflow.version),
        }}
        secondary={{ label: "Back to marketplace", to: "/marketplace" }}
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
                  <dd><code>{workflow.package_id}</code></dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{workflow.version}</dd>
                </div>
                <div>
                  <dt>Steps</dt>
                  <dd>{workflow.step_count ?? workflow.execution_steps?.length ?? "—"}</dd>
                </div>
                <div>
                  <dt>Human checkpoints</dt>
                  <dd>{workflow.has_human_task ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </div>

            <div>
              <div className="marketing-section-label">Connectors required</div>
              {(workflow.connector_slugs ?? []).length > 0 ? (
                <div className="marketing-related-integrations">
                  <div>
                    {(workflow.connector_slugs ?? []).map((slug) => {
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
        </div>
      </section>

      {workflow.execution_steps?.length ? (
        <section className="marketing-section" data-tone="soft">
          <div className="marketing-container">
            <div className="marketing-section-label">Execution overview</div>
            <h2>High-level step sequence.</h2>
            <ol className="marketing-marketplace-step-list">
              {workflow.execution_steps.map((step, index) => (
                <li key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{step.type}</small>
                  <strong>{step.name || step.id}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <CallToAction
        tone="dark"
        title="Ready to install this workflow?"
        description="Open Console to install the package into your tenant, wire MCP instances, and publish."
        primary={{
          label: "Install in Console ↗",
          href: workflowPackageInstallUrl(workflow.package_id, workflow.version),
        }}
        secondary={{ label: "Browse integrations", to: "/integrations" }}
      />
    </div>
  );
}
