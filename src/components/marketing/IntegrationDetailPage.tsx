import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import type { PublicConnector } from "@/api/connectors";
import type { PublicAgentPackage, PublicWorkflowPackage } from "@/api/marketplace";
import { getIntegrationContent } from "@/lib/integrationContent";
import { integrationCatalogBySlug } from "@/lib/integrationCatalog.generated";
import { getIntegrationMark, type Integration } from "@/lib/marketingCatalog";
import {
  agentPackageInstallUrl,
  marketplaceAgentPath,
  marketplaceWorkflowPath,
  workflowPackageInstallUrl,
} from "@/lib/marketplaceLinks";

type IntegrationDetailPageProps = {
  connector: PublicConnector;
  related: readonly Integration[];
  exampleWorkflows: readonly PublicWorkflowPackage[];
  workflowsLoading?: boolean;
  exampleAgents?: readonly PublicAgentPackage[];
  agentsLoading?: boolean;
};

export function IntegrationDetailPage({
  connector,
  related,
  exampleWorkflows,
  workflowsLoading,
  exampleAgents = [],
  agentsLoading,
}: IntegrationDetailPageProps) {
  const content = getIntegrationContent(connector.slug);
  const catalog = integrationCatalogBySlug[connector.slug];
  const integration: Integration = {
    slug: connector.slug,
    name: connector.name,
    category: content?.category ?? "Productivity",
  };
  const description =
    content?.summary ||
    connector.description ||
    `Explore governed AgentRuntime patterns for ${integration.name}.`;

  const toolGroups = catalog?.toolGroups ?? [];
  const toolCount = connector.tool_count || catalog?.toolCount || 0;

  return (
    <div className="marketing-page">
      <Seo
        title={`${integration.name} Integration for AI Workflows`}
        description={description}
        canonicalPath={`/integrations/${integration.slug}`}
      />
      <PageHero
        eyebrow={`${integration.name} integration`}
        title={content?.headline ?? `Plan governed AI workflows around ${integration.name}.`}
        description={description}
        primary={{ label: "Discuss this integration →", to: `/contact?integration=${integration.slug}` }}
        secondary={{ label: "Back to integrations", to: "/integrations" }}
        aside={
          <IntegrationHeroSummary
            connector={connector}
            content={content}
            integration={integration}
            toolCount={toolCount}
          />
        }
      />

      {content?.outcomes?.length ? (
        <section className="marketing-section" data-tone="soft" id="outcomes">
          <div className="marketing-container">
            <div className="marketing-section-label">What you can build</div>
            <h2>Start with workflow outcomes, not isolated tool calls.</h2>
            <div className="marketing-grid-3">
              {content.outcomes.map((outcome, index) => (
                <article className="marketing-card" key={outcome.title}>
                  <div className="marketing-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {toolGroups.length > 0 ? (
        <section className="marketing-section" id="capabilities">
          <div className="marketing-container">
            <div className="marketing-blueprint-section-head">
              <div>
                <div className="marketing-section-label">Supported actions</div>
                <h2>{toolCount} tools grouped for workflow design.</h2>
              </div>
              <p>
                These actions come from the committed {integration.name} connector
                contract. Your workflow should select only the tools it needs.
              </p>
            </div>

            {toolGroups.map((group) => (
              <div key={group.name} className="marketing-integration-tool-group">
                <h3>{group.name}</h3>
                <div className="marketing-integration-tool-grid">
                  {group.tools.map((tool, index) => (
                    <article key={tool.name}>
                      <div className="marketing-integration-tool-head">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span data-access={tool.access.toLowerCase()}>
                          {tool.access}
                        </span>
                      </div>
                      <h4>{tool.label}</h4>
                      <p>{tool.description}</p>
                      <code>{tool.name}</code>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="marketing-section" data-tone="soft" id="how-it-works">
        <div className="marketing-container">
          <div className="marketing-section-label">How it works in AgentRuntime</div>
          <h2>Connection → MCP instance → governed execution.</h2>
          <ol className="marketing-integration-how-list">
            {(content?.howItWorks ?? [
              "Register the connector and create an MCP instance with the required credentials.",
              "Bind the instance to mcp_call steps in Workflow Studio.",
              "Add rules, human_task gates, and audit around every action.",
            ]).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section" id="example-workflows">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Example workflows</div>
              <h2>Installable packages from the marketplace.</h2>
            </div>
            <p>
              Real workflow packages that reference {integration.name}. Install in
              Console to start from a published graph.
            </p>
          </div>

          {workflowsLoading ? (
            <p className="marketing-section-intro">Loading marketplace examples…</p>
          ) : exampleWorkflows.length > 0 ? (
            <div className="marketing-grid-3">
              {exampleWorkflows.map((workflow) => (
                <article className="marketing-card" key={`${workflow.package_id}:${workflow.version}`}>
                  <h3>{workflow.display_name}</h3>
                  <p>{workflow.description || "Published workflow package."}</p>
                  <div className="marketing-marketplace-card-meta">
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
                      View package →
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
          ) : (
            <p className="marketing-section-intro">
              No public marketplace packages are indexed for {integration.name} yet.
              Browse the full marketplace or contact us to feature your workflow.
            </p>
          )}

          <Link className="marketing-button marketing-button-secondary" to="/marketplace/workflows">
            Browse workflow marketplace →
          </Link>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft" id="example-agents">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Example agents</div>
              <h2>Agent packages that reference {integration.name}.</h2>
            </div>
            <p>
              Installable agent packages from the marketplace with connector requirements
              indexed at publish time.
            </p>
          </div>

          {agentsLoading ? (
            <p className="marketing-section-intro">Loading marketplace agents…</p>
          ) : exampleAgents.length > 0 ? (
            <div className="marketing-grid-3">
              {exampleAgents.map((agent) => (
                <article className="marketing-card" key={`${agent.package_id}:${agent.version}`}>
                  <h3>{agent.display_name}</h3>
                  <p>{agent.description || "Published agent package."}</p>
                  <div className="marketing-marketplace-card-actions">
                    <Link className="marketing-inline-link" to={marketplaceAgentPath(agent.package_id)}>
                      View package →
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
          ) : (
            <p className="marketing-section-intro">
              No public agent packages are indexed for {integration.name} yet.
            </p>
          )}

          <Link className="marketing-button marketing-button-secondary" to="/marketplace/agents">
            Browse agent marketplace →
          </Link>
        </div>
      </section>

      {(content?.configuration?.length || content?.docsUrl) ? (
        <section className="marketing-section" id="setup">
          <div className="marketing-container">
            <div className="marketing-blueprint-section-head">
              <div>
                <div className="marketing-section-label">Auth & setup</div>
                <h2>Connect with only the access the workflow needs.</h2>
              </div>
              <p>
                {content?.authentication} {content?.workflowStart}
              </p>
            </div>

            {content?.representativeScopes?.length ? (
              <div className="marketing-integration-scope-list">
                {content.representativeScopes.map((scope) => (
                  <code key={scope}>{scope}</code>
                ))}
              </div>
            ) : null}

            {content?.configuration?.length ? (
              <dl className="marketing-integration-config-dl">
                {content.configuration.map((field) => (
                  <div key={field.key}>
                    <dt>
                      <code>{field.key}</code>
                      <span>{field.requirement}</span>
                    </dt>
                    <dd>{field.description}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {content?.docsUrl ? (
              <a
                className="marketing-inline-link"
                href={content.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the {integration.name} connector docs ↗
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {content?.faq?.length ? (
        <section className="marketing-section" data-tone="soft" id="faq">
          <div className="marketing-container">
            <div className="marketing-section-label">FAQ</div>
            <h2>Common questions about {integration.name}.</h2>
            <div className="marketing-faq-list">
              {content.faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="marketing-section">
          <div className="marketing-container">
            <div className="marketing-related-integrations">
              <div className="marketing-section-label">Works well with</div>
              <div>
                {related.map((item) => (
                  <Link to={`/integrations/${item.slug}`} key={item.slug}>
                    <span className="marketing-integration-mark" aria-hidden="true">
                      {getIntegrationMark(item.name)}
                    </span>
                    <strong>{item.name}</strong>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CallToAction
        tone="dark"
        title={`Define the ${integration.name} workflow boundary.`}
        description="Bring the trigger, actions, access constraints, and human decision points. We will map the governed execution path."
        primary={{
          label: `Discuss the ${integration.name} workflow →`,
          to: `/contact?integration=${integration.slug}`,
        }}
        secondary={{ label: "Browse marketplace", to: "/marketplace" }}
      />
    </div>
  );
}

function IntegrationHeroSummary({
  connector,
  content,
  integration,
  toolCount,
}: {
  connector: PublicConnector;
  content: ReturnType<typeof getIntegrationContent>;
  integration: Integration;
  toolCount: number;
}) {
  return (
    <div
      className="marketing-integration-hero-visual"
      aria-label={`${integration.name} integration summary`}
    >
      <article className="marketing-integration-summary-card">
        <header>
          <span className="marketing-integration-summary-logo">
            {content?.logoPath ? (
              <img src={content.logoPath} alt="" aria-hidden="true" />
            ) : (
              <span aria-hidden="true">{getIntegrationMark(integration.name)}</span>
            )}
          </span>
          <span>
            <small>Integration</small>
            <strong>{integration.name}</strong>
          </span>
          <b>{content?.authLabel ?? "MCP connector"}</b>
        </header>
        <p>{content?.cardSummary ?? connector.description}</p>
        <dl>
          <div>
            <dt>{toolCount}</dt>
            <dd>{integration.name} actions</dd>
          </div>
          <div>
            <dt>{content?.workflowStartLabel ?? "API"}</dt>
            <dd>Workflow starts</dd>
          </div>
          <div>
            <dt>{content?.maturity ?? "registered"}</dt>
            <dd>Catalog status</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
