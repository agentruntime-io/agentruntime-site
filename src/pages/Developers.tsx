import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { DOCS_APP_URL } from "@/config/site";
import { featuredIntegrations, integrationCount } from "@/lib/marketingCatalog";
import { seoCopy } from "@/seo/metadata";

const executionLifecycle = [
  {
    title: "Trigger",
    description:
      "Start from an API, webhook, schedule, product event, or human action.",
  },
  {
    title: "Execute",
    description:
      "Move through agents, tools, decisions, and parallel groups while maintaining state.",
  },
  {
    title: "Wait",
    description:
      "Pause for approval, external events, or future time and resume the same run later.",
  },
  {
    title: "Observe",
    description:
      "Stream events and inspect timelines, logs, traces, inputs, outputs, and dependencies.",
  },
  {
    title: "Recover",
    description:
      "Retry, redirect, or intervene without treating the whole process as an opaque request.",
  },
];

const toolControls = [
  {
    pill: "Credentials",
    title: "Secrets remain controlled",
    description:
      "Keep credentials and environment-specific configuration outside workflow prompts and application code.",
  },
  {
    pill: "Schemas",
    title: "Inputs and outputs remain explicit",
    description:
      "Validate the contract between agents, tools, and downstream steps before the run continues.",
  },
  {
    pill: "Policies",
    title: "Access follows the workflow",
    description:
      "Control which tools, operations, and data boundaries are available for a particular execution context.",
  },
];

const stackSurfaces = [
  {
    pill: "SDKs",
    title: "Go, TypeScript, and Python",
    description:
      "Trigger workflows, inspect runs, and integrate execution into backend services.",
  },
  {
    pill: "Events",
    title: "Webhooks and streaming",
    description:
      "Receive lifecycle events or stream live progress into your own interfaces.",
  },
  {
    pill: "Identity",
    title: "Scoped access",
    description:
      "Use application and run-level credentials appropriate to each integration surface.",
  },
];

export default function Developers() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.developers} canonicalPath="/developers" />
      <PageHero
        eyebrow="Developers"
        title="Build the agent. Keep the production machinery out of your application."
        description="Trigger stateful workflows through APIs, connect tools through MCP, stream progress, and inspect every execution without assembling a new control plane for each use case."
        primary={{ label: "Request technical access →", to: "/contact" }}
        secondary={{ label: "Read the documentation ↗", href: DOCS_APP_URL }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="api"
      >
        <div className="marketing-container">
          <div className="marketing-split">
            <div className="marketing-feature-copy">
              <div className="marketing-section-label">Backend-first</div>
              <h3>
                Your interface calls a workflow, not a chain of fragile services.
              </h3>
              <p>
                Keep the customer experience inside your product while
                AgentRuntime handles orchestration, state, tools, waits, retries,
                and intervention behind the API.
              </p>
              <p className="marketing-mono">
                POST /v1/workflows/:workflow_id/runs
              </p>
            </div>

            <div className="marketing-code">
              <div className="marketing-code-top">
                <span>create-run.ts</span>
                <span>TypeScript</span>
              </div>
              <pre aria-label="Illustrative TypeScript workflow API example">
                <code>
                  <span className="marketing-code-keyword">const</span>
                  {" run = "}
                  <span className="marketing-code-keyword">await</span>
                  {" agentRuntime.runs."}
                  <span className="marketing-code-function">create</span>
                  {"({\n  workflowId: "}
                  <span className="marketing-code-string">
                    "customer-onboarding"
                  </span>
                  {",\n  input: {\n    customerId: "}
                  <span className="marketing-code-string">"cus_2048"</span>
                  {",\n    requestedBy: "}
                  <span className="marketing-code-string">"product-api"</span>
                  {"\n  },\n  stream: "}
                  <span className="marketing-code-keyword">true</span>
                  {"\n});\n\n"}
                  <span className="marketing-code-keyword">for await</span>
                  {" ("}
                  <span className="marketing-code-keyword">const</span>
                  {" event "}
                  <span className="marketing-code-keyword">of</span>
                  {" run.events) {\n  console."}
                  <span className="marketing-code-function">log</span>
                  {"(event.step, event.status);\n}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="dark" id="mcp">
        <div className="marketing-container">
          <div className="marketing-section-label">Tools and MCP</div>
          <h2>Connect the systems where the work actually happens.</h2>
          <p className="marketing-section-intro">
            Give agents governed access to business software, internal services,
            and your own tools through a consistent execution layer.
          </p>
          <div
            className="marketing-logo-strip"
            aria-label="Featured integrations"
          >
            {featuredIntegrations.slice(0, 6).map((integration) => (
              <Link
                className="marketing-logo-cell"
                to={`/integrations/${integration.slug}`}
                key={integration.slug}
              >
                {integration.name}
              </Link>
            ))}
          </div>
          <div className="marketing-section-action">
            <Link
              className="marketing-button marketing-button-ghost-dark"
              to="/integrations"
            >
              Browse {integrationCount} catalogued connectors →
            </Link>
          </div>
          <div className="marketing-grid-3">
            {toolControls.map((control) => (
              <article
                className="marketing-card"
                data-compact="true"
                data-tone="dark"
                key={control.title}
              >
                <span className="marketing-pill">{control.pill}</span>
                <h3>{control.title}</h3>
                <p>{control.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">Execution lifecycle</div>
          <h2>Every run has an identity, history, and recovery path.</h2>
          <div className="marketing-steps">
            {executionLifecycle.map((step) => (
              <div className="marketing-step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Build with your stack</div>
          <h2>
            Use AgentRuntime as infrastructure, not as a replacement for your
            product.
          </h2>
          <div className="marketing-grid-3">
            {stackSurfaces.map((surface) => (
              <article
                className="marketing-card"
                data-compact="true"
                key={surface.title}
              >
                <span className="marketing-pill">{surface.pill}</span>
                <h3>{surface.title}</h3>
                <p>{surface.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Ship the agent experience. Let the runtime carry the operational weight."
        description="We are working with technical teams building agents that must operate across real systems."
        primary={{ label: "Discuss an integration →", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />
    </div>
  );
}
