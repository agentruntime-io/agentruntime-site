import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type MarketingAction = {
  label: string;
  to?: string;
  href?: string;
};

type ActionLinkProps = MarketingAction & {
  variant?: "primary" | "secondary" | "light" | "ghost-dark";
};

export function ActionLink({
  label,
  to,
  href,
  variant = "primary",
}: ActionLinkProps) {
  const className = `marketing-button marketing-button-${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {label}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-eyebrow">
      <span className="marketing-eyebrow-dot" aria-hidden="true" />
      {children}
    </div>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary?: MarketingAction;
  secondary?: MarketingAction;
  centered?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  centered = false,
}: PageHeroProps) {
  return (
    <section className="marketing-page-hero" data-centered={centered}>
      <div className="marketing-container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p className="marketing-page-copy">{description}</p>
        {(primary || secondary) && (
          <div className="marketing-hero-actions">
            {primary && <ActionLink {...primary} variant="primary" />}
            {secondary && <ActionLink {...secondary} variant="secondary" />}
          </div>
        )}
      </div>
    </section>
  );
}

type CallToActionProps = {
  title: ReactNode;
  description: string;
  primary: MarketingAction;
  secondary?: MarketingAction;
  tone?: "default" | "soft" | "dark";
};

export function CallToAction({
  title,
  description,
  primary,
  secondary,
  tone = "default",
}: CallToActionProps) {
  return (
    <section className="marketing-cta" data-tone={tone}>
      <div className="marketing-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="marketing-hero-actions">
          <ActionLink
            {...primary}
            variant={tone === "dark" ? "light" : "primary"}
          />
          {secondary && (
            <ActionLink
              {...secondary}
              variant={tone === "dark" ? "ghost-dark" : "secondary"}
            />
          )}
        </div>
      </div>
    </section>
  );
}

type WorkflowVisualProps = {
  title: string;
  status: string;
  outcome?: string;
  rows: Array<{
    left: string;
    connector?: string;
    right: string;
    hot?: "left" | "right";
  }>;
};

export function WorkflowVisual({
  title,
  status,
  outcome,
  rows,
}: WorkflowVisualProps) {
  return (
    <div
      className="marketing-workflow-visual"
      role="img"
      aria-label={`${title} workflow. Status: ${status}.${outcome ? ` Outcome: ${outcome}` : ""}`}
    >
      <div className="marketing-ui-header">
        <strong>{title}</strong>
        <span className="marketing-status" data-status={status.toLowerCase()}>
          {status}
        </span>
      </div>
      <div className="marketing-workflow-timeline">
        {rows.map((row, index) => (
          <div className="marketing-flow-line" key={`${row.left}-${row.right}`}>
            <span className="marketing-flow-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="marketing-flow-step"
              data-hot={row.hot === "left" || undefined}
            >
              {row.left}
            </div>
            <span className="marketing-flow-arrow" aria-hidden="true">
              {row.connector ?? "→"}
            </span>
            <div
              className="marketing-flow-step"
              data-hot={row.hot === "right" || undefined}
            >
              {row.right}
            </div>
          </div>
        ))}
      </div>
      {outcome && (
        <div className="marketing-workflow-outcome">
          <span>Run outcome</span>
          <strong>{outcome}</strong>
        </div>
      )}
    </div>
  );
}

const workflowNodes = [
  {
    type: "Trigger",
    title: "New customer created",
    description: "Starts from CRM or API event.",
  },
  {
    type: "Agent",
    title: "Research account",
    description: "Collects context across connected tools.",
  },
  {
    type: "Decision",
    title: "Choose onboarding path",
    description: "Applies rules, confidence and account tier.",
  },
  {
    type: "Tool",
    title: "Prepare workspace",
    description: "Creates records, tasks and access.",
  },
  {
    type: "Human approval",
    title: "Review plan",
    description: "Routes to the exact owner when judgment matters.",
    highlighted: true,
  },
  {
    type: "Agent",
    title: "Launch onboarding",
    description: "Executes, monitors and handles exceptions.",
  },
];

export function ProductStage() {
  return (
    <section className="marketing-product-stage">
      <div className="marketing-container">
        <figure className="marketing-stage-shell">
          <figcaption className="sr-only">
            Illustrative AgentRuntime workflow showing agents, tools, decisions,
            and a human approval in one observable run.
          </figcaption>
          <div className="marketing-app" aria-hidden="true">
            <aside className="marketing-app-sidebar">
              <div className="marketing-window-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="marketing-side-label">Workspace</div>
              <div className="marketing-side-item" data-active="true">
                <span>Customer operations</span>
                <span>•••</span>
              </div>
              <div className="marketing-side-item">
                <span>Finance</span>
                <span>6</span>
              </div>
              <div className="marketing-side-item">
                <span>Support</span>
                <span>12</span>
              </div>
              <div className="marketing-side-label">Build</div>
              <div className="marketing-side-item">
                <span>Workflows</span>
                <span>24</span>
              </div>
              <div className="marketing-side-item">
                <span>Agents</span>
                <span>8</span>
              </div>
              <div className="marketing-side-item">
                <span>Tools &amp; MCP</span>
                <span>50+</span>
              </div>
              <div className="marketing-side-label">Operate</div>
              <div className="marketing-side-item">
                <span>Runs</span>
                <span>Live</span>
              </div>
              <div className="marketing-side-item">
                <span>Observability</span>
              </div>
              <div className="marketing-side-item">
                <span>Approvals</span>
                <span>3</span>
              </div>
            </aside>

            <div className="marketing-canvas">
              <div className="marketing-canvas-header">
                <div>
                  <div className="marketing-crumbs">
                    Workflows / Customer onboarding
                  </div>
                  <h3 className="marketing-canvas-title">
                    Customer onboarding
                  </h3>
                </div>
                <span className="marketing-run-badge">Run workflow</span>
              </div>
              <div className="marketing-flow">
                {workflowNodes.map((node) => (
                  <div
                    className="marketing-node"
                    data-highlighted={node.highlighted || undefined}
                    key={node.title}
                  >
                    <div className="marketing-node-type">
                      <span className="marketing-node-icon" />
                      {node.type}
                    </div>
                    <h4>{node.title}</h4>
                    <p>{node.description}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-mobile-flow-summary">
                Research, decision, and tool steps stay attached to the same
                observable run.
              </div>
            </div>

            <aside className="marketing-app-inspector">
              <div className="marketing-side-label">Current run</div>
              <div className="marketing-status-row">
                <span>Status</span>
                <span className="marketing-status">Running</span>
              </div>
              <div className="marketing-status-row">
                <span>Round</span>
                <span>04</span>
              </div>
              <div className="marketing-status-row">
                <span>Started</span>
                <span>12m ago</span>
              </div>
              <div className="marketing-side-label">Timeline</div>
              <div className="marketing-status-row">
                <span>Trigger received</span>
                <span className="marketing-status">Done</span>
              </div>
              <div className="marketing-status-row">
                <span>Account research</span>
                <span className="marketing-status">Done</span>
              </div>
              <div className="marketing-status-row">
                <span>Approval</span>
                <span>Waiting</span>
              </div>
              <p className="marketing-tiny">
                Every decision, tool call, state change and human action remains
                visible and replayable.
              </p>
            </aside>
          </div>
        </figure>
      </div>
    </section>
  );
}
