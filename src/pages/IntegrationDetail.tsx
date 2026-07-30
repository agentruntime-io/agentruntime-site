import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { integrationCategoryGuides } from "@/lib/integrationGuides";
import {
  getIntegrationDetail,
  type IntegrationDetailRecord,
} from "@/lib/integrationDetails";
import {
  getIntegrationMark,
  integrations,
  type Integration,
} from "@/lib/marketingCatalog";

export default function IntegrationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const integration = integrations.find((item) => item.slug === slug);

  if (!integration) {
    return <Navigate to="/integrations" replace />;
  }

  const guide = integrationCategoryGuides[integration.category];
  const related = integrations
    .filter(
      (item) =>
        item.category === integration.category && item.slug !== integration.slug,
    )
    .slice(0, 4);
  const verifiedDetail = getIntegrationDetail(integration.slug);

  if (verifiedDetail) {
    return (
      <EvidenceBackedIntegrationDetail
        detail={verifiedDetail}
        integration={integration}
        related={related}
      />
    );
  }

  const description = `${guide.summary} Explore example AgentRuntime patterns for ${integration.name}, then confirm connector availability and supported actions before production use.`;

  return (
    <div className="marketing-page">
      <Seo
        title={`${integration.name} Integration for AI Workflows`}
        description={description}
        canonicalPath={`/integrations/${integration.slug}`}
      />
      <PageHero
        eyebrow={`${integration.category} connector`}
        title={`Plan governed AI workflows around ${integration.name}.`}
        description={description}
        primary={{ label: "Discuss this integration →", to: "/contact" }}
        secondary={{ label: "Back to integrations", to: "/integrations" }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="overview"
      >
        <div className="marketing-container">
          <div className="marketing-integration-detail-overview">
            <div className="marketing-integration-detail-copy">
              <div className="marketing-integration-identity">
                <span className="marketing-integration-mark" aria-hidden="true">
                  {getIntegrationMark(integration.name)}
                </span>
                <div>
                  <small>Catalogued connector</small>
                  <strong>{integration.name}</strong>
                </div>
              </div>
              <div className="marketing-section-label">Where it fits</div>
              <h2>{guide.summary}</h2>
              <p className="marketing-section-intro">{guide.role}</p>
            </div>

            <div
              className="marketing-integration-flow"
              aria-label={`Example ${integration.name} workflow architecture`}
            >
              <div className="marketing-ui-header">
                <strong>Example execution path</strong>
                <span className="marketing-status">● Planned</span>
              </div>
              <div className="marketing-integration-flow-steps">
                {[
                  {
                    title: integration.name,
                    description: "Provide a trigger, context, or destination.",
                  },
                  {
                    title: "AgentRuntime",
                    description: "Carry durable state through the complete run.",
                  },
                  {
                    title: "Agents + rules",
                    description: "Reason, validate, branch, and select actions.",
                  },
                  {
                    title: "People + systems",
                    description: "Approve, intervene, and complete the process.",
                  },
                ].map((step, index) => (
                  <div key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <small>{step.description}</small>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                Example architecture only. Exact triggers, actions, scopes, and
                deployment requirements depend on the connector configuration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Example patterns</div>
          <h2>Start with a workflow outcome, not an isolated tool call.</h2>
          <p className="marketing-section-intro">
            These are representative patterns for the {integration.category}
            category. They are not claims about currently enabled{" "}
            {integration.name} actions.
          </p>
          <div className="marketing-grid-3">
            {guide.patterns.map((pattern, index) => (
              <article className="marketing-card" key={pattern.title}>
                <div className="marketing-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{pattern.title}</h3>
                <p>{pattern.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-integration-readiness">
            <div>
              <div className="marketing-section-label">
                Production readiness
              </div>
              <h2>Confirm the boundary before the workflow acts.</h2>
              <p className="marketing-section-intro">
                Catalog coverage changes. Validate the actual connector build,
                authentication method, supported operations, and environment
                requirements with the AgentRuntime team.
              </p>
            </div>
            <ol>
              {guide.controls.map((control, index) => (
                <li key={control}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{control}</strong>
                </li>
              ))}
            </ol>
          </div>

          {related.length > 0 ? (
            <div className="marketing-related-integrations">
              <div className="marketing-section-label">
                Related {integration.category} connectors
              </div>
              <div>
                {related.map((item) => (
                  <Link to={`/integrations/${item.slug}`} key={item.slug}>
                    <span
                      className="marketing-integration-mark"
                      aria-hidden="true"
                    >
                      {getIntegrationMark(item.name)}
                    </span>
                    <strong>{item.name}</strong>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="dark"
        title={`Define the ${integration.name} workflow boundary.`}
        description="Bring the trigger, actions, access constraints, and human decision points. We will map the governed execution path."
        primary={{ label: "Discuss the workflow →", to: "/contact" }}
        secondary={{ label: "Browse integrations", to: "/integrations" }}
      />
    </div>
  );
}

function EvidenceBackedIntegrationDetail({
  detail,
  integration,
  related,
}: {
  detail: IntegrationDetailRecord;
  integration: Integration;
  related: readonly Integration[];
}) {
  const workflowSlug = detail.relatedWorkflowSlugs[0];
  const connectedServices = detail.connectedServiceSlugs.flatMap((serviceSlug) => {
    const service = integrations.find((item) => item.slug === serviceSlug);
    return service ? [service] : [];
  });

  return (
    <div className="marketing-page">
      <Seo
        title={`${integration.name} Integration for AI Workflows`}
        description={detail.summary}
        canonicalPath={`/integrations/${integration.slug}`}
      />
      <PageHero
        eyebrow={`${integration.name} integration`}
        title={detail.headline}
        description={detail.summary}
        primary={
          workflowSlug
            ? {
                label: "See the incident blueprint →",
                to: `/solutions/${workflowSlug}`,
              }
            : { label: "Discuss this integration →", to: "/contact" }
        }
        secondary={{ label: "Back to integrations", to: "/integrations" }}
        aside={
          <IntegrationHeroSummary
            connectedServices={connectedServices}
            detail={detail}
            integration={integration}
          />
        }
      />

      <section className="marketing-section" data-tone="soft" id="capabilities">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Slack capabilities</div>
              <h2>Read context and coordinate work in Slack.</h2>
            </div>
            <p>
              List channels and users, read message context, post updates, reply
              in threads, and add reactions. Available actions depend on the
              token scopes and workspace access you provide.
            </p>
          </div>

          <div className="marketing-integration-tool-grid">
            {detail.tools.map((tool, index) => (
              <article key={tool.name}>
                <div className="marketing-integration-tool-head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span data-access={tool.access.toLowerCase()}>
                    {tool.access}
                  </span>
                </div>
                <small>{tool.group}</small>
                <h3>{tool.label}</h3>
                <p>{tool.description}</p>
                <code>{tool.name}</code>
              </article>
            ))}
          </div>
        </div>
      </section>

      {workflowSlug ? (
        <section
          className="marketing-section"
          data-tone="dark"
          id="workflow-blueprint"
        >
          <div className="marketing-container">
            <div className="marketing-integration-blueprint-band">
              <div>
                <div className="marketing-section-label">
                  Connected workflow blueprint
                </div>
                <h2>Use Slack as the response surface, not the state machine.</h2>
                <p>
                  The incident-response blueprint uses Slack to post the incident
                  message, keep updates in its thread, read replies, and record
                  acknowledgements while AgentRuntime retains workflow state.
                </p>
                <Link
                  className="marketing-button marketing-button-light"
                  to={`/solutions/${workflowSlug}`}
                >
                  Explore the incident path →
                </Link>
              </div>
              <ol aria-label="Slack incident response preview">
                {[
                  ["Trigger", "Receive a typed alert"],
                  ["Decision", "Apply severity and routing rules"],
                  ["Slack", "Post the incident message"],
                  ["Human", "Confirm owner and authority"],
                  ["Slack", "Keep the response thread current"],
                  ["Outcome", "Publish the resolution record"],
                ].map(([type, label], index) => (
                  <li key={label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{type}</small>
                    <strong>{label}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      <section className="marketing-section" id="setup">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Setup and access</div>
              <h2>Connect Slack with only the access the workflow needs.</h2>
            </div>
            <p>
              {detail.authentication} {detail.workflowStart}
            </p>
          </div>

          <div className="marketing-integration-config">
            <div>
              <div className="marketing-section-label">Access planning</div>
              <h3>Choose scopes and a channel boundary.</h3>
              <p>
                Common scopes are shown for planning. Private-channel and
                direct-message patterns can require additional access. Match the
                final scopes to the actions selected for the workflow.
              </p>
              <div className="marketing-integration-scope-list">
                {detail.representativeScopes.map((scope) => (
                  <code key={scope}>{scope}</code>
                ))}
              </div>
              <a
                className="marketing-inline-link"
                href={detail.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Slack Web API documentation ↗
              </a>
            </div>
            <dl>
              {detail.configuration.map((field) => (
                <div key={field.key}>
                  <dt>
                    <code>{field.key}</code>
                    <span>{field.requirement}</span>
                  </dt>
                  <dd>{field.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {related.length > 0 ? (
            <div className="marketing-related-integrations">
              <div className="marketing-section-label">
                Related {integration.category} connectors
              </div>
              <div>
                {related.map((item) => (
                  <Link to={`/integrations/${item.slug}`} key={item.slug}>
                    <span
                      className="marketing-integration-mark"
                      aria-hidden="true"
                    >
                      {getIntegrationMark(item.name)}
                    </span>
                    <strong>{item.name}</strong>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Define the Slack boundary before the workflow acts."
        description="Bring the target channels, required actions, token model, scopes, and human decision points. We will map them into a governed execution path."
        primary={{
          label: "Discuss the Slack workflow →",
          to: "/contact?integration=slack",
        }}
        secondary={
          workflowSlug
            ? {
                label: "See incident response",
                to: `/solutions/${workflowSlug}`,
              }
            : undefined
        }
      />
    </div>
  );
}

function IntegrationHeroSummary({
  connectedServices,
  detail,
  integration,
}: {
  connectedServices: readonly Integration[];
  detail: IntegrationDetailRecord;
  integration: Integration;
}) {
  return (
    <div
      className="marketing-integration-hero-visual"
      aria-label={`${integration.name} integration summary`}
    >
      <div className="marketing-integration-route">
        <div
          className="marketing-integration-source-stack"
          aria-label="Example connected services"
        >
          {connectedServices.map((service) => (
            <span key={service.slug}>
              <b aria-hidden="true">{getIntegrationMark(service.name)}</b>
              <small>{service.name}</small>
            </span>
          ))}
        </div>

        <div className="marketing-integration-runtime-node">
          <img src="/agentruntime-logo.svg" alt="" aria-hidden="true" />
          <span>
            <small>Workflow layer</small>
            <strong>AgentRuntime</strong>
          </span>
        </div>

        <article className="marketing-integration-summary-card">
          <header>
            <span className="marketing-integration-summary-logo">
              <img src={detail.logoPath} alt="" aria-hidden="true" />
            </span>
            <span>
              <small>Integration</small>
              <strong>{integration.name}</strong>
            </span>
            <b>{detail.authLabel}</b>
          </header>
          <p>{detail.cardSummary}</p>
          <dl>
            <div>
              <dt>{detail.tools.length}</dt>
              <dd>{integration.name} actions</dd>
            </div>
            <div>
              <dt>{detail.workflowStartLabel}</dt>
              <dd>Workflow starts</dd>
            </div>
          </dl>
        </article>
      </div>
      <p>
        Connect {integration.name} with other workflow systems through
        AgentRuntime instead of wiring each service directly.
      </p>
    </div>
  );
}
