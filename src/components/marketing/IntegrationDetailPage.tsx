import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import type { PublicConnectorDetail } from "@/api/connectors";
import type { PublicAgentPackage, PublicWorkflowPackage } from "@/api/marketplace";
import { getIntegrationContent } from "@/lib/integrationContent";
import { getIntegrationMark, type Integration } from "@/lib/marketingCatalog";
import {
  agentPackageInstallUrl,
  marketplaceAgentPath,
  marketplaceWorkflowPath,
  workflowPackageInstallUrl,
} from "@/lib/marketplaceLinks";

type IntegrationDetailPageProps = {
  connector: PublicConnectorDetail;
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
  const integration: Integration = {
    slug: connector.slug,
    name: connector.name,
    category: content?.category ?? "Productivity",
  };
  const description = content?.summary || connector.description || "";
  const toolGroups = connector.tool_groups ?? [];
  const flatTools = toolGroups.length === 0 ? (connector.tools ?? []) : [];
  const toolCount = connector.tool_count || connector.tools?.length || 0;
  const showWorkflows =
    workflowsLoading || exampleWorkflows.length > 0;
  const showAgents = agentsLoading || exampleAgents.length > 0;

  return (
    <div className="marketing-page">
      <Seo
        title={`${integration.name} Integration for AI Workflows`}
        description={description || `${integration.name} connector on AgentRuntime.`}
        canonicalPath={`/integrations/${integration.slug}`}
      />
      <PageHero
        eyebrow={`${integration.name} integration`}
        title={content?.headline ?? integration.name}
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
                <h2>
                  {toolCount > 0
                    ? `${toolCount} tools grouped for workflow design.`
                    : "Published connector tools."}
                </h2>
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
                        {tool.access ? (
                          <span data-access={tool.access.toLowerCase()}>
                            {tool.access}
                          </span>
                        ) : null}
                      </div>
                      <h4>{tool.label || tool.name}</h4>
                      {tool.description ? <p>{tool.description}</p> : null}
                      <code>{tool.name}</code>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : flatTools.length > 0 ? (
        <section className="marketing-section" id="capabilities">
          <div className="marketing-container">
            <div className="marketing-blueprint-section-head">
              <div>
                <div className="marketing-section-label">Supported actions</div>
                <h2>{toolCount} published connector tools.</h2>
              </div>
            </div>
            <div className="marketing-integration-tool-grid">
              {flatTools.map((tool, index) => (
                <article key={tool.name}>
                  <div className="marketing-integration-tool-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {tool.access ? (
                      <span data-access={tool.access.toLowerCase()}>
                        {tool.access}
                      </span>
                    ) : null}
                  </div>
                  <h4>{tool.label || tool.name}</h4>
                  {tool.description ? <p>{tool.description}</p> : null}
                  <code>{tool.name}</code>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content?.howItWorks?.length ? (
        <section className="marketing-section" data-tone="soft" id="how-it-works">
          <div className="marketing-container">
            <div className="marketing-section-label">How it works in AgentRuntime</div>
            <h2>Connection → MCP instance → governed execution.</h2>
            <ol className="marketing-integration-how-list">
              {content.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {showWorkflows ? (
        <section className="marketing-section" id="example-workflows">
          <div className="marketing-container">
            <div className="marketing-blueprint-section-head">
              <div>
                <div className="marketing-section-label">Example workflows</div>
                <h2>Installable packages from the marketplace.</h2>
              </div>
              <p>
                Workflow packages that reference {integration.name}. Install in
                Console to start from a published graph.
              </p>
            </div>

            {workflowsLoading ? (
              <MarketingLoadingGraphic variant="cards" count={3} />
            ) : (
              <div className="marketing-grid-3">
                {exampleWorkflows.map((workflow) => (
                  <article className="marketing-card" key={`${workflow.package_id}:${workflow.version}`}>
                    <h3>{workflow.display_name}</h3>
                    {workflow.description ? <p>{workflow.description}</p> : null}
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
            )}

            <Link className="marketing-button marketing-button-secondary" to="/marketplace/workflows">
              Browse workflow marketplace →
            </Link>
          </div>
        </section>
      ) : null}

      {showAgents ? (
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
              <MarketingLoadingGraphic variant="cards" count={3} />
            ) : (
              <div className="marketing-grid-3">
                {exampleAgents.map((agent) => (
                  <article className="marketing-card" key={`${agent.package_id}:${agent.version}`}>
                    <h3>{agent.display_name}</h3>
                    {agent.description ? <p>{agent.description}</p> : null}
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
            )}

            <Link className="marketing-button marketing-button-secondary" to="/marketplace/agents">
              Browse agent marketplace →
            </Link>
          </div>
        </section>
      ) : null}

      {(content?.configuration?.length || content?.docsUrl) ? (
        <section className="marketing-section" id="setup">
          <div className="marketing-container">
            <div className="marketing-blueprint-section-head">
              <div>
                <div className="marketing-section-label">Auth & setup</div>
                <h2>Connect with only the access the workflow needs.</h2>
              </div>
              {(content?.authentication || content?.workflowStart) ? (
                <p>
                  {content.authentication} {content.workflowStart}
                </p>
              ) : null}
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
  connector: PublicConnectorDetail;
  content: ReturnType<typeof getIntegrationContent>;
  integration: Integration;
  toolCount: number;
}) {
  const summary = content?.cardSummary || connector.description;
  const stats = [
    toolCount > 0
      ? { label: String(toolCount), detail: `${integration.name} actions` }
      : null,
    content?.workflowStartLabel
      ? { label: content.workflowStartLabel, detail: "Workflow starts" }
      : null,
    content?.maturity
      ? { label: content.maturity, detail: "Catalog status" }
      : null,
  ].filter((item): item is { label: string; detail: string } => item !== null);

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
            ) : connector.icon_url ? (
              <img src={connector.icon_url} alt="" aria-hidden="true" />
            ) : (
              <span aria-hidden="true">{getIntegrationMark(integration.name)}</span>
            )}
          </span>
          <span>
            <small>Integration</small>
            <strong>{integration.name}</strong>
          </span>
          {content?.authLabel ? <b>{content.authLabel}</b> : null}
        </header>
        {summary ? <p>{summary}</p> : null}
        {stats.length > 0 ? (
          <dl>
            {stats.map((stat) => (
              <div key={stat.detail}>
                <dt>{stat.label}</dt>
                <dd>{stat.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </article>
    </div>
  );
}
