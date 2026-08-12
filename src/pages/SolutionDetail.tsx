import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { getIntegrationDetail } from "@/lib/integrationDetails";
import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import {
  integrations,
  productSurfaces,
} from "@/lib/marketingCatalog";
import { getWorkflowBlueprint } from "@/lib/workflowBlueprints";

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const blueprint = slug ? getWorkflowBlueprint(slug) : undefined;

  if (!blueprint) {
    return <Navigate to="/solutions" replace />;
  }

  const connectedIntegrations = blueprint.integrations.flatMap((connection) => {
    const integration = integrations.find(
      (item) => item.slug === connection.slug,
    );
    return integration
      ? [
          {
            ...connection,
            integration,
            detail: getIntegrationDetail(integration.slug),
          },
        ]
      : [];
  });
  const connectedSurfaces = blueprint.productSurfaceIds.flatMap((surfaceId) => {
    const surface = productSurfaces.find((item) => item.id === surfaceId);
    return surface ? [surface] : [];
  });
  const primaryIntegration = connectedIntegrations[0];

  return (
    <div className="marketing-page">
      <Seo
        title={blueprint.seoTitle}
        description={blueprint.description}
        canonicalPath={`/solutions/${blueprint.slug}`}
      />
      <PageHero
        eyebrow={blueprint.eyebrow}
        title={blueprint.title}
        description={blueprint.description}
        primary={{
          label: "Map a production version →",
          to: `/contact?workflow=${blueprint.slug}`,
        }}
        secondary={{ label: "All solutions", to: "/solutions" }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="blueprint-overview"
      >
        <div className="marketing-container">
          <div className="marketing-blueprint-overview">
            <div>
              <div className="marketing-section-label">
                Illustrative workflow blueprint
              </div>
              <h2>Start with an operational contract, not a demo prompt.</h2>
              <p className="marketing-section-intro">
                This page describes a reference execution path built from
                documented AgentRuntime and connector capabilities. It is not a
                customer case study or a claim about measured performance.
              </p>
            </div>

            <dl className="marketing-blueprint-facts">
              <div>
                <dt>Primary team</dt>
                <dd>{blueprint.audience}</dd>
              </div>
              <div>
                <dt>Trigger</dt>
                <dd>{blueprint.trigger.label}</dd>
              </div>
              <div>
                <dt>Required connector</dt>
                <dd>
                  {blueprint.integrations
                    .filter((integration) => integration.requirement === "Required")
                    .map((integration) => integration.name)
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt>Run outcome</dt>
                <dd>{blueprint.primaryOutcome}</dd>
              </div>
            </dl>
          </div>

          <div className="marketing-blueprint-problem">
            <div>
              <div className="marketing-section-label">Current failure mode</div>
              <h3>Chat holds the conversation. AgentRuntime holds the run.</h3>
            </div>
            <ul>
              {blueprint.problem.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft" id="execution-path">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Execution graph</div>
              <h2>A typed, owned, recoverable execution path.</h2>
            </div>
            <p>
              {blueprint.trigger.description} The graph then carries the same run
              through every typed step, human checkpoint, and outcome below.
            </p>
          </div>

          <ol
            className="marketing-blueprint-graph"
            aria-label={`${blueprint.title} execution steps`}
          >
            {blueprint.steps.map((step, index) => (
              <li data-type={step.type.toLowerCase()} key={step.title}>
                <span className="marketing-blueprint-step-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="marketing-blueprint-step-type">{step.type}</div>
                <div className="marketing-blueprint-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.detail ? <small>{step.detail}</small> : null}
                  {step.toolNames?.length ? (
                    <div className="marketing-blueprint-tool-names">
                      {step.toolNames.map((toolName) => (
                        <code key={toolName}>{toolName}</code>
                      ))}
                    </div>
                  ) : null}
                  {step.integrationSlug ? (
                    <Link
                      className="marketing-blueprint-step-connector"
                      to={`/integrations/${step.integrationSlug}`}
                    >
                      View integration details →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section" id="operational-boundaries">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">
                Operational boundaries
              </div>
              <h2>Human authority and recovery stay explicit.</h2>
            </div>
            <p>
              The starter graph makes human responsibility and error recovery
              visible instead of hiding them in a long prompt or chat thread.
            </p>
          </div>

          <div className="marketing-blueprint-guardrails">
            <article>
              <span>Human checkpoints</span>
              <div>
                {blueprint.humanCheckpoints.map((checkpoint, index) => (
                  <section key={checkpoint.title}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <h3>{checkpoint.title}</h3>
                    <p>{checkpoint.description}</p>
                  </section>
                ))}
              </div>
            </article>
            <article>
              <span>Failure and wait path</span>
              <div>
                {blueprint.failurePath.map((failure, index) => (
                  <section key={failure.condition}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <h3>{failure.condition}</h3>
                    <p>{failure.response}</p>
                  </section>
                ))}
              </div>
            </article>
          </div>

          <div className="marketing-blueprint-io">
            <article>
              <div className="marketing-section-label">Required inputs</div>
              <ul>
                {blueprint.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </article>
            <article>
              <div className="marketing-section-label">Produced outputs</div>
              <ul>
                {blueprint.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="dark" id="connected-system">
        <div className="marketing-container">
          <div className="marketing-blueprint-section-head">
            <div>
              <div className="marketing-section-label">Connected system</div>
              <h2>Integrations and runtime surfaces stay linked.</h2>
            </div>
            <p>
              The blueprint links to the integrations used in this path. Confirm
              workspace access, scopes, and environment configuration before the
              workflow acts.
            </p>
          </div>

          <div className="marketing-blueprint-connections">
            <div>
              <span className="marketing-blueprint-column-label">
                Integrations
              </span>
              {connectedIntegrations.map(
                ({ integration, detail, requirement, role }) => {
                  const logoPath =
                    detail?.logoPath ?? getIntegrationLogoPath(integration.slug);

                  return (
                  <Link
                    className="marketing-blueprint-connection"
                    to={`/integrations/${integration.slug}`}
                    key={integration.slug}
                  >
                    {logoPath ? (
                      <span className="marketing-integration-logo">
                        <img src={logoPath} alt="" aria-hidden="true" />
                      </span>
                    ) : null}
                    <span>
                      <small>{requirement}</small>
                      <strong>{integration.name}</strong>
                      <p>{role}</p>
                    </span>
                    <b aria-hidden="true">→</b>
                  </Link>
                );
                },
              )}
            </div>
            <div>
              <span className="marketing-blueprint-column-label">
                Product surfaces
              </span>
              <div className="marketing-blueprint-surface-links">
                {connectedSurfaces.map((surface) => (
                  <Link to={`/platform#${surface.id}`} key={surface.id}>
                    <small>{surface.stage}</small>
                    <strong>{surface.title}</strong>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Turn this reference graph into your production workflow."
        description="Bring the trigger, integration boundaries, authority rules, and actions your team is willing to automate. We will map the production path and its controls."
        primary={{
          label: "Map the workflow →",
          to: `/contact?workflow=${blueprint.slug}`,
        }}
        secondary={
          primaryIntegration
            ? {
                label: `Inspect the ${primaryIntegration.integration.name} connector`,
                to: `/integrations/${primaryIntegration.integration.slug}`,
              }
            : {
                label: "Explore integrations",
                to: "/integrations",
              }
        }
      />
    </div>
  );
}
