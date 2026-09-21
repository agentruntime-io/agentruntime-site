import { Link } from "react-router-dom";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { Seo } from "@/components/Seo";
import {
  ActionLink,
  CallToAction,
  Eyebrow,
  ProductStage,
} from "@/components/marketing/MarketingPrimitives";
import { Reveal } from "@/components/marketing/Reveal";
import {
  AgentIcon,
  BreakIcon,
  BuildIcon,
  EngineeringIcon,
  ExceptionIcon,
  FinanceIcon,
  GovernIcon,
  HistoryIcon,
  IsolatedIcon,
  OperateIcon,
  OperationsIcon,
  OwnershipIcon,
  PartnersIcon,
  PersonIcon,
  ReleaseIcon,
  RunIcon,
  StateIcon,
  SupportIcon,
  ToolIcon,
} from "@/components/marketing/HomeIcons";
import {
  featuredIntegrationSlugs,
  getIntegrationMark,
  productSurfaces,
  resolveFeaturedConnectors,
  solutionAudiences,
} from "@/lib/marketingCatalog";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import { seoCopy } from "@/seo/metadata";

const operationalProblems = [
  {
    icon: IsolatedIcon,
    title: "AI stays isolated",
    description:
      "The assistant can answer questions, but cannot reliably participate in the systems where work happens.",
  },
  {
    icon: BreakIcon,
    title: "Automation breaks at exceptions",
    description:
      "Rigid flows fail when judgment, missing data, a failed tool, or an unexpected situation appears.",
  },
  {
    icon: ReleaseIcon,
    title: "Nobody can safely let go",
    description:
      "Without control, visibility, and ownership, every important action still returns to a person.",
  },
];

const executionModel = [
  {
    icon: AgentIcon,
    pill: "AI agents",
    title: "Interpret, reason, and create",
    description:
      "Use models where the work needs context, judgment, synthesis, or natural-language interaction.",
    dark: true,
  },
  {
    icon: ToolIcon,
    pill: "Tools + rules",
    title: "Execute with precision",
    description:
      "Call APIs and MCP tools while enforcing schemas, permissions, and deterministic business rules.",
  },
  {
    icon: PersonIcon,
    pill: "People",
    title: "Keep humans where they matter",
    description:
      "Pause for review, approvals, or exceptions and route the work to the exact responsible person.",
    warm: true,
  },
];

const runtimeOutcomes = [
  {
    icon: StateIcon,
    label: "State",
    value: "Survives waits and handoffs",
  },
  {
    icon: OwnershipIcon,
    label: "Ownership",
    value: "Stays explicit at every decision",
  },
  {
    icon: ExceptionIcon,
    label: "Exceptions",
    value: "Become designed execution paths",
  },
  {
    icon: HistoryIcon,
    label: "History",
    value: "Remains connected in one timeline",
  },
];

const surfaceIcons = [BuildIcon, RunIcon, OperateIcon, GovernIcon];

const audienceIcons = [
  EngineeringIcon,
  OperationsIcon,
  SupportIcon,
  FinanceIcon,
  PartnersIcon,
];

const runProofPoints = [
  {
    value: "18",
    label: "structured events",
    detail: "streamed for the single support run shown above",
  },
  {
    value: "6",
    label: "step types, one graph",
    detail: "trigger, agent, decision, tool, approval, and follow-through",
  },
  {
    value: "1",
    label: "human decision",
    detail: "Morgan Ellis approved the plan — attached to the run, not a side channel",
  },
];

function slugToName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Home() {
  const { data: connectors = [] } = usePublicConnectors();
  const resolvedIntegrations = resolveFeaturedConnectors(connectors);
  const featuredIntegrations =
    resolvedIntegrations.length > 0
      ? resolvedIntegrations
      : featuredIntegrationSlugs.map((slug) => ({
          slug,
          name: slugToName(slug),
        }));
  const integrationCount = connectors.length;
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.home} canonicalPath="/" />
      <HomeJsonLd />

      <section className="marketing-hero">
        <div className="marketing-container">
          <Eyebrow>Infrastructure for production AI work</Eyebrow>
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
          <p className="marketing-hero-note">
            Built for real operations — not isolated prompts or one-off demos.
          </p>
        </div>
      </section>

      <ProductStage />

      <section className="marketing-run-proof" aria-label="What the run above actually did">
        <div className="marketing-container">
          <Reveal className="marketing-run-proof-row">
            {runProofPoints.map((point) => (
              <div className="marketing-run-proof-item" key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
                <p>{point.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        className="marketing-outcome-band"
        aria-labelledby="runtime-outcomes-title"
      >
        <div className="marketing-container">
          <Reveal>
            <div className="marketing-outcome-band-header">
              <div>
                <div className="marketing-section-label">
                  What the runtime preserves
                </div>
                <h2 id="runtime-outcomes-title">
                  The process stays coherent when the work changes hands.
                </h2>
              </div>
              <p>
                Designed into every run, independent of which agent, tool, or
                person acts next.
              </p>
            </div>
          </Reveal>
          <div className="marketing-outcome-metrics">
            {runtimeOutcomes.map((outcome) => (
              <div className="marketing-outcome-metric" key={outcome.label}>
                <outcome.icon className="marketing-outcome-metric-icon" />
                <strong>{outcome.label}</strong>
                <p>{outcome.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-product-index-section">
        <div className="marketing-container">
          <Reveal>
            <div className="marketing-catalog-heading">
              <div>
                <div className="marketing-section-label">The product</div>
                <h2>Four surfaces. One execution model.</h2>
              </div>
              <p>
                Design the workflow, run it through APIs, operate it from a
                shared queue, and govern every connection.
              </p>
            </div>
          </Reveal>
          <div className="marketing-product-index">
            {productSurfaces.map((surface, index) => {
              const SurfaceIcon = surfaceIcons[index];
              return (
                <Link
                  to={`/platform#${surface.id}`}
                  className="marketing-product-index-item"
                  key={surface.id}
                >
                  <SurfaceIcon className="marketing-product-index-icon" />
                  <div>
                    <small>{surface.stage}</small>
                    <strong>{surface.title}</strong>
                    <p>{surface.description}</p>
                  </div>
                  <b aria-hidden="true">↗</b>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <Reveal>
            <div className="marketing-section-label">The operational wall</div>
            <h2>Most AI projects stop exactly where real business begins.</h2>
            <p className="marketing-section-intro">
              A useful demo can call a model and return an answer. A production
              process must survive rules, approvals, failures, context changes,
              long-running work, and human responsibility.
            </p>
          </Reveal>
          <div className="marketing-problem-list">
            {operationalProblems.map((problem) => (
              <div className="marketing-problem-row" key={problem.title}>
                <problem.icon className="marketing-problem-icon" />
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <Reveal>
            <div className="marketing-section-label">The execution model</div>
            <h2>Route every step to the right kind of intelligence.</h2>
            <p className="marketing-section-intro">
              One runtime carries context and state while agents, deterministic
              logic, connected software, and people each do the work they are
              best suited for.
            </p>
          </Reveal>
          <div className="marketing-grid-3">
            {executionModel.map((item) => (
              <article
                className="marketing-card"
                data-compact="true"
                data-tone={item.dark ? "dark" : item.warm ? "warm" : undefined}
                key={item.title}
              >
                <item.icon className="marketing-card-icon" />
                <span className="marketing-pill">{item.pill}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <Reveal>
            <div className="marketing-catalog-heading">
              <div>
                <div className="marketing-section-label">Who this is for</div>
                <h2>Start from the responsibility your team already owns.</h2>
              </div>
              <Link className="marketing-inline-link" to="/solutions">
                Explore all solutions <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
          <div className="marketing-audience-preview">
            {solutionAudiences.map((audience, index) => {
              const AudienceIcon = audienceIcons[index];
              return (
                <Link
                  to={`/solutions#${audience.id}`}
                  className="marketing-audience-preview-row"
                  key={audience.id}
                >
                  <AudienceIcon className="marketing-audience-preview-icon" />
                  <strong>{audience.label}</strong>
                  <p>{audience.title}</p>
                  <b aria-hidden="true">→</b>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="marketing-statement">
        <div className="marketing-container">
          <h2>
            The goal is not to remove people from the process.{" "}
            <span data-emphasis="accent">
              It is to remove people from every step that no longer needs them.
            </span>
          </h2>
        </div>
      </section>

      <section className="marketing-section marketing-home-integrations">
        <div className="marketing-container">
          <div className="marketing-catalog-heading">
            <div>
              <div className="marketing-section-label">
                {integrationCount > 0
                  ? `${integrationCount} catalogued connectors`
                  : "Governed connectors, ready to use"}
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
            {featuredIntegrations.map((integration) => (
              <Link
                to={`/integrations/${integration.slug}`}
                key={integration.slug}
              >
                <span aria-hidden="true">
                  {getIntegrationMark(integration.name)}
                </span>
                <strong>{integration.name}</strong>
              </Link>
            ))}
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
          <Reveal>
            <div className="marketing-section-label">
              One platform, two entry points
            </div>
            <h2>
              Adopt AgentRuntime from the workflow or from the infrastructure.
            </h2>
          </Reveal>
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
