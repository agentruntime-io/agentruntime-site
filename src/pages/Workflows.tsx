import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
  WorkflowVisual,
} from "@/components/marketing/MarketingPrimitives";
import {
  solutionAudiences,
  workflowSolutions,
} from "@/lib/marketingCatalog";
import { seoCopy } from "@/seo/metadata";
import { Link } from "react-router-dom";

const workflowPatterns = [
  {
    id: "customer-onboarding",
    pill: "Customer operations",
    title:
      "Onboard every customer without rebuilding the checklist each time.",
    description:
      "Collect context, select the onboarding path, prepare systems, assign owners, and pause only where human review adds value.",
    outcomes: [
      "Less manual coordination across sales, success, and implementation",
      "A visible owner and status for every customer",
      "Different paths for customer tier, product, and risk",
    ],
    visual: {
      title: "Customer onboarding",
      status: "Active",
      outcome: "One visible run from CRM event to customer launch.",
      rows: [
        { left: "CRM event", right: "Research agent" },
        { left: "Choose path", right: "Create workspace" },
        {
          left: "Implementation approval",
          right: "Launch",
          hot: "left" as const,
        },
      ],
    },
  },
  {
    id: "support-operations",
    pill: "Support operations",
    title:
      "Resolve routine cases automatically and escalate with the full context.",
    description:
      "An agent can investigate across tools, apply policies, and act when confidence is high. Complex or sensitive cases reach the correct person with the work already prepared.",
    outcomes: [
      "Faster resolution without blind auto-replies",
      "Consistent policy enforcement",
      "Better escalation packages for human agents",
    ],
    visual: {
      title: "Issue resolution",
      status: "Running",
      outcome: "Routine cases resolve; exceptions arrive with context.",
      rows: [
        { left: "Ticket arrives", right: "Gather account state" },
        {
          left: "Policy decision",
          right: "Risk check",
          hot: "right" as const,
        },
        {
          left: "Resolve",
          connector: "or",
          right: "Escalate with context",
        },
      ],
    },
  },
  {
    id: "finance-approvals",
    pill: "Finance and administration",
    title:
      "Move documents, checks, and approvals through one controlled process.",
    description:
      "Extract information, validate records, apply thresholds, request missing inputs, and route approval to the right person without losing the audit trail.",
    outcomes: [
      "Fewer manual hand-offs and follow-ups",
      "Explicit approval authority",
      "A traceable path from request to outcome",
    ],
    visual: {
      title: "Expense review",
      status: "Waiting",
      outcome: "Every check and approval remains attached to the request.",
      rows: [
        { left: "Document intake", right: "Extract and validate" },
        {
          left: "Policy threshold",
          right: "Manager approval",
          hot: "right" as const,
        },
        { left: "Post to system", right: "Notify requester" },
      ],
    },
  },
  {
    id: "embedded-agents",
    pill: "Product-embedded agents",
    title: "Give your product an agent without making your product the runtime.",
    description:
      "Expose workflows through APIs so your interface can trigger reliable multi-step work while AgentRuntime manages tools, state, intervention, and observability behind it.",
    outcomes: [
      "Backend-first agent execution",
      "Reusable workflows across multiple product surfaces",
      "Operational visibility outside the customer interface",
    ],
    visual: {
      title: "Embedded research agent",
      status: "API",
      outcome: "The product receives a validated result without owning the runtime.",
      rows: [
        { left: "Product request", right: "Workflow API" },
        { left: "Parallel tools", right: "Synthesis" },
        { left: "Validation", right: "Stream result", hot: "left" as const },
      ],
    },
  },
];

const firstWorkflowSignals = [
  {
    pill: "Frequent",
    title: "It happens often",
    description:
      "The process creates enough recurring work that even partial automation compounds.",
  },
  {
    pill: "Cross-functional",
    title: "It crosses boundaries",
    description:
      "Information moves between tools, teams, or owners and currently requires coordination.",
  },
  {
    pill: "Judgment-heavy",
    title: "It resists rigid rules",
    description:
      "The process needs context, interpretation, or exceptions — but not at every step.",
  },
];

export default function Workflows() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.solutions} canonicalPath="/solutions" />
      <PageHero
        centered
        eyebrow="Solutions"
        title="Start where work already crosses systems and people."
        description="The best first workflow is repetitive enough to matter, complex enough to resist rigid automation, and important enough to require control."
        primary={{ label: "Map a workflow →", to: "/contact" }}
        secondary={{ label: "See examples", to: "/solutions#examples" }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="who-its-for"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">Who AgentRuntime is for</div>
          <h2>One execution layer for the teams building and operating AI work.</h2>
          <p className="marketing-section-intro">
            Start from the responsibility your team owns, then connect the
            systems, decisions, and people required to carry it through.
          </p>

          <nav
            className="marketing-detail-index"
            data-columns="5"
            aria-label="Solutions by team"
          >
            {solutionAudiences.map((audience, index) => (
              <Link to={`/solutions#${audience.id}`} key={audience.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>By team</small>
                <strong>{audience.label}</strong>
                <b aria-hidden="true">↓</b>
              </Link>
            ))}
          </nav>

          <div className="marketing-detail-list">
            {solutionAudiences.map((audience, index) => (
              <article
                className="marketing-detail-section marketing-audience-detail"
                data-reverse={index % 2 === 1}
                id={audience.id}
                key={audience.id}
              >
                <div className="marketing-detail-copy">
                  <div className="marketing-detail-kicker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>By team</span>
                  </div>
                  <h3>{audience.label}</h3>
                  <p className="marketing-detail-lead">{audience.title}</p>
                  <p>{audience.detail}</p>
                </div>

                <div className="marketing-audience-fit-panel">
                  <div className="marketing-audience-fit-header">
                    <span>Where it fits</span>
                    <strong>{audience.label}</strong>
                  </div>
                  <ul>
                    {audience.useCases.map((useCase, useCaseIndex) => (
                      <li key={useCase}>
                        <span>{String(useCaseIndex + 1).padStart(2, "0")}</span>
                        <strong>{useCase}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="marketing-audience-start">
                    <span>Best first move</span>
                    <p>{audience.startingPoint}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="marketing-section"
        data-tone="soft"
        id="examples"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">Workflow patterns</div>
          <h2>Use AgentRuntime where decisions, tools, and ownership meet.</h2>

          <nav
            className="marketing-detail-index"
            data-columns="4"
            aria-label="Solutions by workflow"
          >
            {workflowSolutions.map((solution, index) => (
              <Link to={`/solutions#${solution.id}`} key={solution.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>By workflow</small>
                <strong>{solution.label}</strong>
                <b aria-hidden="true">↓</b>
              </Link>
            ))}
          </nav>

          {workflowPatterns.map((workflow) => (
            <article
              className="marketing-use-case"
              id={workflow.id}
              key={workflow.title}
            >
              <div>
                <span className="marketing-pill">{workflow.pill}</span>
                <h3>{workflow.title}</h3>
                <p>{workflow.description}</p>
                <div className="marketing-outcomes">
                  <div className="marketing-outcomes-label">
                    Operational outcomes
                  </div>
                  <ul className="marketing-outcome-list">
                    {workflow.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <WorkflowVisual {...workflow.visual} />
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section" data-tone="dark">
        <div className="marketing-container">
          <div className="marketing-section-label">
            Choosing the first workflow
          </div>
          <h2>Look for operational friction, not an impressive demo.</h2>
          <div className="marketing-grid-3">
            {firstWorkflowSignals.map((signal) => (
              <article
                className="marketing-card"
                data-compact="true"
                data-tone="dark"
                key={signal.title}
              >
                <span className="marketing-pill">{signal.pill}</span>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Bring us the workflow people complain about."
        description="We will help separate what agents should reason about, what tools should execute, and what people should still decide."
        primary={{ label: "Map the workflow →", to: "/contact" }}
      />
    </div>
  );
}
