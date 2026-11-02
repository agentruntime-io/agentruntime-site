import { Link } from "react-router-dom";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { Seo } from "@/components/Seo";
import {
  ActionLink,
  CallToAction,
  ProductStage,
} from "@/components/marketing/MarketingPrimitives";
import {
  getIntegrationMark,
  productSurfaces,
  resolveFeaturedConnectors,
  solutionAudiences,
} from "@/lib/marketingCatalog";
import { getIntegrationContent } from "@/lib/integrationContent";
import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import { seoCopy } from "@/seo/metadata";

const problemAnswers = [
  {
    problem: "AI stays isolated",
    problemDetail:
      "The assistant can answer questions, but cannot reliably participate in the systems where work happens.",
    pill: "Tools + rules",
    title: "Execute with precision",
    description:
      "Call APIs and MCP tools while enforcing schemas, permissions, and deterministic business rules.",
  },
  {
    problem: "Automation breaks at exceptions",
    problemDetail:
      "Rigid flows fail when judgment, missing data, a failed tool, or an unexpected situation appears.",
    pill: "AI agents",
    title: "Interpret, reason, and create",
    description:
      "Use models where the work needs context, judgment, synthesis, or natural-language interaction.",
  },
  {
    problem: "Nobody can safely let go",
    problemDetail:
      "Without control, visibility, and ownership, every important action still returns to a person.",
    pill: "People",
    title: "Keep humans where they matter",
    description:
      "Pause for review, approvals, or exceptions and route the work to the exact responsible person.",
  },
];

// Request shape from public/openapi.yaml (Complete a human task).
const completeTaskRequest = `POST /api/v1/workflows/{id}/runs/{run_id}
     /tasks/{task_id}/complete

{
  "decision": "approve",
  "notes": "Reviewed account. Credit approved."
}`;

export default function Home() {
  const { data: connectors = [] } = usePublicConnectors();
  const resolvedIntegrations = resolveFeaturedConnectors(connectors);
  // Keep whole rows: the grid is 6, 3, or 2 columns wide.
  const featuredIntegrations =
    resolvedIntegrations.length >= 6
      ? resolvedIntegrations.slice(0, resolvedIntegrations.length - (resolvedIntegrations.length % 6))
      : resolvedIntegrations;
  const integrationCount = connectors.length;
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.home} canonicalPath="/" />
      <HomeJsonLd />

      <section className="marketing-hero">
        <div className="marketing-container">
          <h1>Put AI inside the way your business actually runs.</h1>
          <p className="marketing-hero-copy">
            AgentRuntime connects your tools, business rules, agents, and people
            into reliable workflows that can operate for minutes, days, or
            continuously.
          </p>
          <div className="marketing-hero-actions">
            <ActionLink
              label="Start with one workflow →"
              to="/contact"
              variant="primary"
            />
            <ActionLink
              label="Explore the platform"
              to="/platform"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <ProductStage />

      <section className="marketing-section marketing-product-index-section">
        <div className="marketing-container">
          <div className="marketing-catalog-heading">
            <div>
              <div className="marketing-section-label">The product</div>
              <h2>Four surfaces. One execution model.</h2>
            </div>
            <p>
              Design the workflow, run it through APIs, operate it from a shared
              queue, and govern every connection.
            </p>
          </div>
          <div className="marketing-product-index">
            {productSurfaces.map((surface, index) => (
              <Link
                to={`/platform#${surface.id}`}
                className="marketing-product-index-item"
                key={surface.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{surface.stage}</small>
                  <strong>{surface.title}</strong>
                  <p>{surface.description}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">The operational wall</div>
          <h2>Most AI projects stop exactly where real business begins.</h2>
          <p className="marketing-section-intro">
            A useful demo can call a model and return an answer. A production
            process must survive rules, approvals, failures, context changes,
            long-running work, and human responsibility.
          </p>
          <div className="marketing-problem-answers">
            <div className="marketing-problem-answers-head" aria-hidden="true">
              <span>Where it breaks</span>
              <span>What the runtime does</span>
            </div>
            {problemAnswers.map((item) => (
              <article className="marketing-problem-answer" key={item.problem}>
                <div>
                  <h3>{item.problem}</h3>
                  <p>{item.problemDetail}</p>
                </div>
                <div>
                  <span className="marketing-pill">{item.pill}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-catalog-heading">
            <div>
              <div className="marketing-section-label">Who this is for</div>
              <h2>Start from the responsibility your team already owns.</h2>
            </div>
            <Link className="marketing-inline-link" to="/solutions">
              Explore all solutions <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="marketing-audience-preview">
            {solutionAudiences.map((audience) => (
              <Link
                to={`/solutions#${audience.id}`}
                className="marketing-audience-preview-row"
                key={audience.id}
              >
                <strong>{audience.label}</strong>
                <p>{audience.title}</p>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-home-integrations">
        <div className="marketing-container">
          <div className="marketing-catalog-heading">
            <div>
              <div className="marketing-section-label">
                {integrationCount > 0
                  ? `${integrationCount} catalogued connectors`
                  : "Connector catalog"}
              </div>
              <h2>Connect the stack you already operate.</h2>
            </div>
            <p>
              Use governed connectors for communication, data, developer tools,
              business systems, and model services.
            </p>
          </div>
          <div
            className="marketing-featured-integrations"
            aria-label="Featured integrations"
          >
            {featuredIntegrations.map((integration) => {
              const logoPath =
                getIntegrationContent(integration.slug)?.logoPath ??
                integration.icon_url ??
                getIntegrationLogoPath(integration.slug);

              return (
                <Link
                  to={`/integrations/${integration.slug}`}
                  key={integration.slug}
                >
                  <span
                    className="marketing-integration-mark"
                    data-logo={logoPath ? "true" : undefined}
                    aria-hidden="true"
                  >
                    {logoPath ? (
                      <img src={logoPath} alt="" />
                    ) : (
                      getIntegrationMark(integration.name)
                    )}
                  </span>
                  <strong>{integration.name}</strong>
                </Link>
              );
            })}
          </div>
          <Link
            className="marketing-button marketing-button-secondary"
            to="/integrations"
          >
            Browse all integrations →
          </Link>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">
            One platform, two entry points
          </div>
          <h2>
            Adopt AgentRuntime from the workflow or from the infrastructure.
          </h2>
          <div className="marketing-grid-2">
            <article className="marketing-card" data-compact="true">
              <span className="marketing-pill">For operations</span>
              <h3>Start with a real process</h3>
              <p>
                Map one process across systems, decisions, and owners. Introduce
                AI step by step without rebuilding the business around a chatbot.
              </p>
              <Link
                className="marketing-button marketing-button-secondary"
                to="/solutions"
              >
                Explore solutions →
              </Link>
            </article>
            <article
              className="marketing-card"
              data-compact="true"
              data-tone="dark"
            >
              <span className="marketing-pill">For builders</span>
              <h3>Build on a production runtime</h3>
              <p>
                Use APIs, webhooks, schedules, tools, and observable execution
                instead of assembling the control plane around every agent
                yourself.
              </p>
              <pre className="marketing-card-code" aria-label="Example API call" tabIndex={0}>
                <code>{completeTaskRequest}</code>
              </pre>
              <Link
                className="marketing-button marketing-button-ghost-dark"
                to="/developers"
              >
                Explore developers →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Start with one workflow that matters."
        description="Show us a process that crosses tools, people, and decisions. We will map where agents, rules, and human judgment belong."
        primary={{ label: "Book a conversation →", to: "/contact" }}
        secondary={{ label: "See the runtime", to: "/platform" }}
      />
    </div>
  );
}
