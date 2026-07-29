import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { seoCopy } from "@/seo/metadata";

const governanceControls = [
  {
    title: "Identity and permissions",
    description:
      "Separate user, application, and runtime access so every action occurs in an explicit execution context.",
  },
  {
    title: "Secrets and tools",
    description:
      "Keep credentials governed and limit the tools and operations available to each workflow.",
  },
  {
    title: "Human authority",
    description:
      "Define who can approve, override, provide input, or resolve an exception.",
  },
  {
    title: "Data boundaries",
    description:
      "Design context access and connected systems around the needs of the workflow.",
  },
  {
    title: "Execution policies",
    description:
      "Use deterministic rules, confidence thresholds, and validation before important actions continue.",
  },
  {
    title: "Auditability",
    description:
      "Keep a connected record of model decisions, tool actions, human inputs, and state transitions.",
  },
];

const comparisonRows = [
  ["What step is active?", "Often opaque", "Explicit state"],
  ["Which tool changed data?", "Scattered logs", "Connected timeline"],
  ["Why did it choose this path?", "Prompt inspection", "Decision and policy record"],
  ["Who approved the exception?", "External process", "Attached human action"],
  ["Can the process resume?", "Usually rebuild state", "Continue the same run"],
];

const adoptionPhases = [
  {
    pill: "Phase 1",
    title: "Observe and assist",
    description:
      "Use agents to prepare work while people retain execution responsibility.",
  },
  {
    pill: "Phase 2",
    title: "Automate routine paths",
    description:
      "Allow safe, repeatable actions and escalate exceptions through explicit controls.",
  },
  {
    pill: "Phase 3",
    title: "Expand trusted autonomy",
    description:
      "Increase the operating boundary after the workflow proves reliable in real conditions.",
  },
];

export default function Enterprise() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.enterprise} canonicalPath="/enterprise" />
      <PageHero
        centered
        eyebrow="Enterprise control"
        title="Give AI responsibility without giving up control."
        description="AgentRuntime is designed to make execution visible, permissions explicit, and human intervention part of the workflow rather than an afterthought."
        primary={{
          label: "Discuss enterprise requirements →",
          to: "/contact?source=enterprise",
        }}
        secondary={{ label: "Explore controls", to: "/enterprise#controls" }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="controls"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">
            Operational governance
          </div>
          <h2>Control exists at every boundary where an agent can act.</h2>
          <div className="marketing-ruled-grid" data-columns="3">
            {governanceControls.map((control, index) => (
              <article className="marketing-card" key={control.title}>
                <div className="marketing-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{control.title}</h3>
                <p>{control.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="dark">
        <div className="marketing-container">
          <div className="marketing-section-label">Human-in-the-loop</div>
          <h2>Intervention is a first-class execution path.</h2>
          <p className="marketing-section-intro">
            A production workflow should know who is responsible when confidence
            is low, policy requires approval, or an unexpected condition appears.
          </p>
          <div className="marketing-split">
            <div className="marketing-feature-copy">
              <h3>Route the decision, not the entire process.</h3>
              <p>
                The workflow pauses at the exact point where judgment is needed.
                The responsible person receives the relevant context, acts, and
                the same run continues from that decision.
              </p>
            </div>
            <div
              className="marketing-ui-panel"
              role="img"
              aria-label="Approval required for a supplier onboarding workflow, assigned to a finance manager and safely paused."
            >
              <div aria-hidden="true">
                <div className="marketing-ui-header">
                  <strong>Approval required</strong>
                  <span className="marketing-pill">Risk review</span>
                </div>
                <div className="marketing-status-row">
                  <span>Workflow</span>
                  <span>Supplier onboarding</span>
                </div>
                <div className="marketing-status-row">
                  <span>Assigned role</span>
                  <span>Finance manager</span>
                </div>
                <div className="marketing-status-row">
                  <span>Reason</span>
                  <span>Threshold exceeded</span>
                </div>
                <div className="marketing-status-row">
                  <span>Run state</span>
                  <span className="marketing-status">Safely paused</span>
                </div>
                <div className="marketing-hero-actions">
                  <span className="marketing-button marketing-button-light">
                    Approve
                  </span>
                  <span className="marketing-button marketing-button-ghost-dark">
                    Request changes
                  </span>
                </div>
                <p className="marketing-tiny">
                  The action, actor, provided context, and resulting state
                  transition remain attached to the run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">Visibility</div>
          <h2>
            Know what the system did, why it did it, and what is waiting now.
          </h2>
          <div className="marketing-table">
            <div className="marketing-compare-row marketing-compare-head">
              <div>Operational question</div>
              <div>Traditional agent request</div>
              <div>AgentRuntime run</div>
            </div>
            {comparisonRows.map(([question, traditional, runtime]) => (
              <div className="marketing-compare-row" key={question}>
                <div data-label="Operational question">{question}</div>
                <div
                  className="marketing-dash"
                  data-label="Traditional agent request"
                >
                  {traditional}
                </div>
                <div className="marketing-check" data-label="AgentRuntime run">
                  {runtime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Adoption path</div>
          <h2>Introduce autonomy without making one irreversible leap.</h2>
          <div className="marketing-grid-3">
            {adoptionPhases.map((phase) => (
              <article
                className="marketing-card"
                data-compact="true"
                key={phase.title}
              >
                <span className="marketing-pill">{phase.pill}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Control should scale with the responsibility you give the agent."
        description="Tell us where the workflow acts, what it can access, and which decisions must remain human."
        primary={{
          label: "Review your requirements →",
          to: "/contact?source=enterprise",
        }}
      />
    </div>
  );
}
