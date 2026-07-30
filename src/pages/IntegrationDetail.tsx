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

  return (
    <div className="marketing-page">
      <Seo
        title={`${integration.name} Integration for AI Workflows`}
        description={detail.summary}
        canonicalPath={`/integrations/${integration.slug}`}
      />
      <PageHero
        eyebrow="Connector evidence profile"
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
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="overview"
      >
        <div className="marketing-container">
          <div className="marketing-integration-evidence-overview">
            <div className="marketing-integration-detail-copy">
              <div className="marketing-integration-identity">
                <span className="marketing-integration-logo">
                  <img src={detail.logoPath} alt="" aria-hidden="true" />
                </span>
                <div>
                  <small>{integration.category} connector</small>
                  <strong>{integration.name}</strong>
                </div>
              </div>
              <div className="marketing-section-label">Published baseline</div>
              <h2>
                {detail.publishedTools.length} tools are published.{" "}
                {detail.heldToolCount} stay held.
              </h2>
              <p className="marketing-section-intro">
                The public connector contract exposes the{" "}
                {detail.publishedTools.length} tools below. Additional implemented
                wires remain held and are not presented as available.
              </p>
            </div>

            <dl className="marketing-integration-fact-grid">
              <div>
                <dt>Catalog status</dt>
                <dd>{detail.status.label}</dd>
                <p>{detail.status.detail}</p>
              </div>
              <div>
                <dt>Published tools</dt>
                <dd>{detail.publishedTools.length}</dd>
                <p>Exact wires in the generated connector catalog.</p>
              </div>
              <div>
                <dt>Authentication</dt>
                <dd>{detail.authentication.label}</dd>
                <p>{detail.authentication.detail}</p>
              </div>
              <div>
                <dt>Event triggers</dt>
                <dd>{detail.triggers.label}</dd>
                <p>{detail.triggers.detail}</p>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft" id="published-tools">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">
                Published catalog contract
              </div>
              <h2>
                {detail.publishedTools.length} published tools for{" "}
                {integration.name} coordination.
              </h2>
            </div>
            <p>
              These names and descriptions come from the generated Slack
              connector catalog. They describe the publishable baseline, not
              the larger held implementation inventory.
            </p>
          </div>

          <div className="marketing-integration-tool-grid">
            {detail.publishedTools.map((tool, index) => (
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
                  The incident-response blueprint uses only published Slack
                  baseline operations: post the incident message, keep updates
                  in its thread, read replies, and record acknowledgements.
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

      <section className="marketing-section" id="readiness">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">
                Readiness and configuration
              </div>
              <h2>Know what is proven, held, and still environment-specific.</h2>
            </div>
            <p>
              This profile reports repository evidence without turning
              structural coverage into a production-readiness claim.
            </p>
          </div>

          <div className="marketing-integration-evidence-grid">
            <article>
              <span className="marketing-blueprint-column-label">
                Repository evidence
              </span>
              <ul>
                {detail.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article data-tone="caution">
              <span className="marketing-blueprint-column-label">
                Current limits
              </span>
              <ul>
                {detail.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="marketing-integration-config">
            <div>
              <div className="marketing-section-label">
                Configuration contract
              </div>
              <h3>Bring the token, scope, and channel boundary.</h3>
              <p>
                Representative baseline-canary scopes are shown for planning.
                Private-channel and direct-message patterns can require
                additional scopes. The exact Slack scopes must match the methods
                selected for the production workflow.
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
        description="Bring the target channels, required methods, token model, scopes, retry policy, and human decision points. We will map them into a governed execution path."
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
