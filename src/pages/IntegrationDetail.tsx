import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { integrationCategoryGuides } from "@/lib/integrationGuides";
import {
  getIntegrationMark,
  integrations,
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
