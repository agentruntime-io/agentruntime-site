import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { productSurfaces } from "@/lib/marketingCatalog";
import { seoCopy } from "@/seo/metadata";

const capabilities = [
  {
    title: "Stateful execution",
    description:
      "Carry context, outputs, and process state across steps, rounds, and long waits.",
  },
  {
    title: "Conditional control",
    description:
      "Branch with explicit business logic, validated model decisions, or combined policies.",
  },
  {
    title: "Parallel work",
    description:
      "Run independent tasks concurrently and coordinate their results before continuing.",
  },
  {
    title: "Wait and resume",
    description:
      "Pause for a person, webhook, scheduled time, or external condition without losing the run.",
  },
  {
    title: "Validation and recovery",
    description:
      "Enforce output schemas, retry safely, and route failures to a controlled recovery path.",
  },
  {
    title: "Timeline and replay",
    description:
      "Understand the sequence of actions, inputs, decisions, and state changes across a run.",
  },
];

const autonomyLevels = [
  {
    title: "Human-led",
    description:
      "AI prepares information or recommendations while a person controls each important action.",
  },
  {
    title: "Assisted execution",
    description:
      "Agents and tools complete routine steps while people handle approvals and exceptions.",
  },
  {
    title: "Supervised autonomy",
    description:
      "The workflow runs independently within explicit rules and escalates only when needed.",
  },
  {
    title: "Autonomous operation",
    description:
      "Trusted processes run end to end with continuous visibility and defined intervention points.",
  },
];

type ProductSurface = (typeof productSurfaces)[number];

function ProductSurfaceMockup({ surface }: { surface: ProductSurface }) {
  const [activeRow, setActiveRow] = useState(0);
  const selectedRow = surface.visual.rows[activeRow] ?? surface.visual.rows[0];

  return (
    <div className="marketing-product-panel">
      <div className="marketing-product-panel-header">
        <span>{surface.visual.label}</span>
        <strong>{surface.visual.title}</strong>
      </div>
      <div
        className="marketing-product-panel-rows"
        aria-label={`Explore the ${surface.title} mockup`}
      >
        {surface.visual.rows.map((row, rowIndex) => (
          <button
            type="button"
            data-active={activeRow === rowIndex}
            aria-pressed={activeRow === rowIndex}
            onClick={() => setActiveRow(rowIndex)}
            key={row.label}
          >
            <span>{String(rowIndex + 1).padStart(2, "0")}</span>
            <small>{row.label}</small>
            <strong>{row.value}</strong>
            <b aria-hidden="true">{activeRow === rowIndex ? "●" : "○"}</b>
          </button>
        ))}
      </div>
      <div className="marketing-product-panel-detail" aria-live="polite">
        <span>{selectedRow.label} selected</span>
        <p>{selectedRow.detail}</p>
      </div>
      <div className="marketing-product-panel-footer">
        <span className="marketing-status">● Interactive mockup</span>
        <small>{surface.visual.footer}</small>
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.platform} canonicalPath="/platform" />
      <PageHero
        eyebrow="Product"
        title="One runtime for the whole execution path."
        description="AgentRuntime orchestrates AI agents, tools, deterministic rules, and human decisions as one observable, stateful process."
        primary={{ label: "Discuss your architecture →", to: "/contact" }}
        secondary={{ label: "View developer model", to: "/developers" }}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <div className="marketing-split">
            <div className="marketing-feature-copy">
              <div className="marketing-section-label">
                Execution architecture
              </div>
              <h3>
                The workflow remains coherent even when execution changes hands.
              </h3>
              <p>
                A process can move from an agent to an API, pause for a human
                decision, wait hours for an external event, and resume with the
                same state. AgentRuntime keeps those transitions inside one
                governed run.
              </p>
            </div>

            <div
              className="marketing-architecture"
              role="img"
              aria-label="AgentRuntime execution plane from triggers through the workflow runtime to models, tools, people, and business systems."
            >
              <div className="marketing-ui-header">
                <strong>AgentRuntime execution plane</strong>
                <span className="marketing-status">● Run active</span>
              </div>
              <div className="marketing-architecture-flow">
                <div className="marketing-architecture-row">
                  <div className="marketing-architecture-box">
                    <strong>API &amp; webhooks</strong>
                    <span>
                      Product events, external systems, and inbound requests.
                    </span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>Schedules</strong>
                    <span>Recurring and time-based operational work.</span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>Human actions</strong>
                    <span>Approvals, inputs, and exception resolution.</span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>Agent requests</strong>
                    <span>Calls from applications and interfaces.</span>
                  </div>
                </div>
                <div className="marketing-architecture-connector">
                  <span>enters one governed run</span>
                </div>
                <div className="marketing-architecture-layer">
                  <strong>Workflow runtime</strong>
                  <p>
                    State • conditions • parallel groups • waits • retries •
                    validation • context • execution rounds
                  </p>
                </div>
                <div className="marketing-architecture-connector">
                  <span>routes each step</span>
                </div>
                <div className="marketing-architecture-row">
                  <div className="marketing-architecture-box">
                    <strong>Models</strong>
                    <span>Use the right model for each task and policy.</span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>Tools &amp; MCP</strong>
                    <span>
                      Business software, internal APIs, and first-party tools.
                    </span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>People</strong>
                    <span>Specific owners, roles, and teams.</span>
                  </div>
                  <div className="marketing-architecture-box">
                    <strong>Business systems</strong>
                    <span>Data, actions, and existing operating logic.</span>
                  </div>
                </div>
                <div className="marketing-architecture-connector">
                  <span>records every transition</span>
                </div>
                <div className="marketing-architecture-layer">
                  <strong>Control and observability</strong>
                  <p>
                    Secrets • permissions • traces • timelines • audit • replay •
                    dependency visibility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="dark">
        <div className="marketing-container">
          <div className="marketing-section-label">
            Core runtime capabilities
          </div>
          <h2>Production behavior is designed into the execution model.</h2>
          <div className="marketing-ruled-grid" data-columns="3">
            {capabilities.map((capability, index) => (
              <article
                className="marketing-card"
                data-tone="dark"
                key={capability.title}
              >
                <div className="marketing-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">Full autonomy spectrum</div>
          <h2>Start with control. Increase autonomy as the workflow earns it.</h2>
          <div className="marketing-steps">
            {autonomyLevels.map((level) => (
              <div className="marketing-step" key={level.title}>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="marketing-section"
        data-tone="soft"
        id="product-surfaces"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">Product surfaces</div>
          <h2>Build, run, observe, and govern in the same system.</h2>
          <p className="marketing-section-intro">
            Each surface owns a distinct part of the production lifecycle while
            sharing the same workflow state, execution history, and control
            model.
          </p>

          <nav
            className="marketing-detail-index"
            data-columns="4"
            aria-label="Product sections"
          >
            {productSurfaces.map((surface, index) => (
              <Link to={`/platform#${surface.id}`} key={surface.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{surface.stage}</small>
                <strong>{surface.title}</strong>
                <b aria-hidden="true">↓</b>
              </Link>
            ))}
          </nav>

          <div className="marketing-detail-list">
            {productSurfaces.map((surface, index) => (
              <article
                className="marketing-detail-section marketing-product-detail"
                data-reverse={index % 2 === 1}
                id={surface.id}
                key={surface.title}
              >
                <div className="marketing-detail-copy">
                  <div className="marketing-detail-kicker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{surface.stage}</span>
                  </div>
                  <h3>{surface.title}</h3>
                  <p className="marketing-detail-lead">{surface.headline}</p>
                  <p>{surface.detail}</p>
                  <div className="marketing-outcomes">
                    <div className="marketing-outcomes-label">
                      What this surface covers
                    </div>
                    <ul className="marketing-outcome-list">
                      {surface.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ProductSurfaceMockup surface={surface} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Do not build the runtime around every new agent."
        description="Build the agent on a runtime designed for production work."
        primary={{ label: "Talk to the team →", to: "/contact" }}
        secondary={{ label: "Developer overview", to: "/developers" }}
      />
    </div>
  );
}
