import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { seoCopy } from "@/seo/metadata";

const principles = [
  {
    title: "Execution over demonstration",
    description:
      "A product must be judged across repeated real runs, not by the cleanest happy-path demo.",
  },
  {
    title: "Human judgment is infrastructure",
    description:
      "Approvals and exceptions should be designed into the workflow, not handled through side channels.",
  },
  {
    title: "Autonomy must be earned",
    description:
      "Teams should be able to increase responsibility gradually as the workflow proves itself.",
  },
  {
    title: "State must survive the request",
    description:
      "Real processes continue across time, systems, and changing execution owners.",
  },
  {
    title: "Visibility is part of control",
    description:
      "You cannot responsibly operate what you cannot inspect, explain, and intervene in.",
  },
  {
    title: "Fit into the business",
    description:
      "AI should connect to existing systems and operating logic rather than demand a parallel organization.",
  },
];

const audiences = [
  {
    pill: "Builders",
    title: "Agent product teams",
    description:
      "You are embedding agents into software and need reliable execution behind the interface.",
  },
  {
    pill: "Operators",
    title: "Operations teams",
    description:
      "You have a cross-system process where rigid automation and fully manual work both fall short.",
  },
  {
    pill: "Partners",
    title: "Implementation teams",
    description:
      "You repeatedly build AI workflows for customers and need a reusable production foundation.",
  },
];

export default function Company() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.company} canonicalPath="/company" />
      <PageHero
        eyebrow="Company"
        title="We are building the runtime AI work needs after the demo."
        description="AgentRuntime began with a simple belief: AI would move beyond chat and become part of real business processes. That requires a different execution foundation."
        primary={{ label: "Talk to us →", to: "/contact" }}
        secondary={{ label: "Explore the product", to: "/platform" }}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <div className="marketing-section-label">Why we started</div>
          <h2>A business workflow is never just a prompt followed by an answer.</h2>
          <p className="marketing-section-intro">
            It contains tools, data, rules, people, exceptions, failures, and
            processes that may continue for hours or days. We started
            AgentRuntime to give that work a rigorous execution model.
          </p>
          <figure className="marketing-quote">
            <blockquote>
              “The question was not how to make an agent look intelligent once.
              It was how to make the entire process keep working when reality
              enters the room.”
            </blockquote>
            <footer>AgentRuntime founding thesis</footer>
          </figure>
        </div>
      </section>

      <section
        className="marketing-section"
        data-tone="dark"
        id="principles"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">Product principles</div>
          <h2>The principles behind the runtime.</h2>
          <div className="marketing-grid-3">
            {principles.map((principle, index) => (
              <article
                className="marketing-card"
                data-compact="true"
                data-tone="dark"
                key={principle.title}
              >
                <span className="marketing-pill">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-split">
            <div className="marketing-feature-copy">
              <div className="marketing-section-label">
                Built from Sri Lanka, for a global shift
              </div>
              <h3>
                A small technical team working on a large infrastructure problem.
              </h3>
              <p>
                AgentRuntime Labs LLC is building the platform from first
                principles: the execution semantics, runtime, integration layer,
                control plane, and interfaces required to operate AI workflows in
                production.
              </p>
              <p>
                We are focused on learning from teams whose agents already touch
                real systems, customers, and operational responsibility.
              </p>
            </div>
            <div
              className="marketing-architecture"
              role="img"
              aria-label="The four layers AgentRuntime is building: runtime, integration, operations, and developer surfaces."
            >
              <div className="marketing-ui-header">
                <strong>What we are building</strong>
                <span className="marketing-status">In progress</span>
              </div>
              <div className="marketing-architecture-layer">
                <strong>Runtime</strong>
                <p>
                  Stateful execution across agents, tools, decisions, and people.
                </p>
              </div>
              <div className="marketing-architecture-layer">
                <strong>Integration layer</strong>
                <p>
                  MCP, APIs, webhooks, schedules, and governed credentials.
                </p>
              </div>
              <div className="marketing-architecture-layer">
                <strong>Operations</strong>
                <p>
                  Observability, approvals, audit, collaboration, and
                  intervention.
                </p>
              </div>
              <div className="marketing-architecture-layer">
                <strong>Developer surface</strong>
                <p>
                  Backend-first APIs and SDKs for embedding agent workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Who we want to meet</div>
          <h2>
            Teams already discovering that the hard part begins after the
            prototype.
          </h2>
          <div className="marketing-grid-3">
            {audiences.map((audience) => (
              <article
                className="marketing-card"
                data-compact="true"
                key={audience.title}
              >
                <span className="marketing-pill">{audience.pill}</span>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Building something that needs to keep working after the demo?"
        description="We would like to understand the workflow, the responsibility, and the infrastructure you are currently assembling around it."
        primary={{ label: "Start a conversation →", to: "/contact" }}
      />
    </div>
  );
}
