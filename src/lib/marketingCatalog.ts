import type { PublicConnector } from "@/api/connectors";

export const productSurfaces = [
  {
    id: "workflow-studio",
    stage: "Build",
    title: "Workflow Studio",
    headline: "Turn the execution path into something the whole team can inspect.",
    description:
      "Design, validate, publish, and debug workflows that mix agents, tools, rules, and people.",
    detail:
      "Model triggers, agent reasoning, deterministic branches, tool calls, waits, and human decisions before the workflow reaches production. The graph stays readable as the process grows.",
    features: [
      "Design connected, stateful execution graphs",
      "Mix agent, tool, rule, wait, and approval steps",
      "Validate, publish, version, and debug in one surface",
    ],
    visual: {
      label: "Workflow / customer onboarding",
      title: "Draft v12",
      rows: [
        {
          label: "Trigger",
          value: "Customer created",
          detail: "Starts from a typed CRM event and creates a durable run.",
        },
        {
          label: "Agent",
          value: "Research account",
          detail: "Collects the context required by every downstream step.",
        },
        {
          label: "Decision",
          value: "Choose onboarding path",
          detail: "Applies explicit account rules to select the correct branch.",
        },
        {
          label: "Human",
          value: "Review implementation plan",
          detail: "Pauses for the responsible owner before execution continues.",
        },
      ],
      footer: "Validated • 6 steps • ready to publish",
    },
  },
  {
    id: "runtime-apis",
    stage: "Run",
    title: "Runtime APIs",
    headline: "Run durable workflows behind any product or system.",
    description:
      "Start and control durable runs from products, webhooks, schedules, and internal systems.",
    detail:
      "Use a stable execution interface while AgentRuntime carries state, coordinates long-running work, and emits the events your application needs. Your product owns the experience without becoming the workflow engine.",
    features: [
      "Start runs from APIs, webhooks, schedules, or events",
      "Stream progress and structured results to your application",
      "Signal, pause, resume, or cancel long-running work",
    ],
    visual: {
      label: "Runtime / active run",
      title: "run_84F2",
      rows: [
        {
          label: "Source",
          value: "Product API",
          detail: "The product starts the run without owning its execution loop.",
        },
        {
          label: "Workflow",
          value: "Account research",
          detail: "A published workflow version controls the complete execution path.",
        },
        {
          label: "State",
          value: "Running · step 4 of 7",
          detail: "Progress and structured events remain available to the caller.",
        },
        {
          label: "Next",
          value: "Wait for policy signal",
          detail: "The run can wait and resume without losing context or ownership.",
        },
      ],
      footer: "State persisted across every transition",
    },
  },
  {
    id: "command-center",
    stage: "Operate",
    title: "Command Center",
    headline: "Give operators one place to see and intervene.",
    description:
      "Triage approvals, active runs, failures, and interventions from one operational inbox.",
    detail:
      "Move from a queue of work to the exact timeline, decision, or failed step that needs attention. Operators can understand what happened and act without reconstructing context across logs and business systems.",
    features: [
      "See running, waiting, completed, and failed work",
      "Route approvals and exceptions to the correct owner",
      "Inspect timelines, retry safely, and recover with context",
    ],
    visual: {
      label: "Operations / intervention queue",
      title: "3 items need attention",
      rows: [
        {
          label: "Approval",
          value: "Implementation plan · 4m",
          detail: "The assigned owner receives the decision and its supporting context.",
        },
        {
          label: "Exception",
          value: "Missing billing contact · 11m",
          detail: "Operators see exactly what is missing and which run is blocked.",
        },
        {
          label: "Failure",
          value: "CRM update · retry ready",
          detail: "The failed step can be inspected and retried without restarting the run.",
        },
        {
          label: "Waiting",
          value: "Customer documents · 2h",
          detail: "Long waits stay visible with an owner, deadline, and next action.",
        },
      ],
      footer: "Owner, state, and full run history attached",
    },
  },
  {
    id: "control-plane",
    stage: "Govern",
    title: "Control plane",
    headline: "Keep authority and auditability outside workflow code.",
    description:
      "Manage connections, secrets, permissions, policies, and audit history across every run.",
    detail:
      "Centralize the controls that determine what a workflow can access, which actions require approval, and how execution is reviewed. Teams can evolve workflows without scattering credentials and policy logic through every implementation.",
    features: [
      "Manage connectors, credentials, and environment boundaries",
      "Apply role, tenant, and action-level access policies",
      "Keep policy decisions and configuration changes auditable",
    ],
    visual: {
      label: "Governance / production",
      title: "Policy checks",
      rows: [
        {
          label: "Connection",
          value: "Salesforce · scoped",
          detail: "The workflow receives only the connector access it requires.",
        },
        {
          label: "Secret",
          value: "Production vault · active",
          detail: "Credentials remain managed outside workflow definitions and prompts.",
        },
        {
          label: "Action",
          value: "Refund > $500 · approval",
          detail: "Sensitive actions pause when policy requires explicit authority.",
        },
        {
          label: "Audit",
          value: "All transitions · retained",
          detail: "Configuration and execution decisions remain reviewable.",
        },
      ],
      footer: "4 controls enforced before execution",
    },
  },
] as const;

export const solutionAudiences = [
  {
    id: "product-engineering",
    label: "Product & engineering",
    title: "Ship agent experiences without shipping a new runtime.",
    description:
      "Put reliable, multi-step agent execution behind your product through APIs and event streams.",
    detail:
      "Keep your team focused on the customer experience while AgentRuntime handles orchestration, state, tool execution, intervention, and operational visibility behind the interface.",
    useCases: [
      "Embedded research and support agents",
      "Agent-powered product actions",
      "Long-running jobs exposed through an API",
    ],
    startingPoint:
      "Put one repeatable product task behind Runtime APIs, then add tools and autonomy as its behavior becomes trusted.",
    scenario: {
      title: "A research request starts inside the product",
      steps: [
        "The product API starts a published workflow",
        "Agents and tools gather, compare, and validate context",
        "A structured result streams back while the full run stays observable",
      ],
      outcome:
        "The customer gets a product-native experience while the operating team retains a complete execution timeline.",
    },
    ctaLabel: "Plan an embedded product workflow →",
  },
  {
    id: "operations",
    label: "Operations",
    title: "Coordinate work that crosses systems and owners.",
    description:
      "Turn recurring, exception-heavy processes into visible runs with clear state and ownership.",
    detail:
      "Give recurring operational work a durable path instead of coordinating it through inboxes, spreadsheets, and tribal knowledge. Every handoff remains visible when an exception changes the expected path.",
    useCases: [
      "Cross-system onboarding and provisioning",
      "Exception queues and operational reviews",
      "Scheduled reconciliation and follow-up",
    ],
    startingPoint:
      "Choose a process with frequent handoffs and a clear owner, then model its normal path and most common exception.",
    scenario: {
      title: "An account setup leaves the normal path",
      steps: [
        "A system event starts the standard setup workflow",
        "A missing dependency creates a visible exception with an owner",
        "The run resumes from the same state after the issue is resolved",
      ],
      outcome:
        "Operations sees the normal path and the exception path without coordinating the process in a spreadsheet.",
    },
    ctaLabel: "Map an operations workflow →",
  },
  {
    id: "customer-teams",
    label: "Customer teams",
    title: "Resolve, onboard, and escalate with the full context.",
    description:
      "Combine research, policy, action, and human judgment without losing the customer journey.",
    detail:
      "Let agents gather context and complete routine work while customer-facing teams keep authority over sensitive decisions. Escalations arrive with the investigation and relevant history already attached.",
    useCases: [
      "Customer onboarding and implementation",
      "Support investigation and issue resolution",
      "Account research and proactive follow-up",
    ],
    startingPoint:
      "Start with one high-volume request where agents can prepare the work and people should own the final exception.",
    scenario: {
      title: "A support issue needs investigation and judgment",
      steps: [
        "The workflow gathers account, product, and support history",
        "Policy and risk checks determine whether routine action is safe",
        "Sensitive cases reach the correct person with the investigation attached",
      ],
      outcome:
        "Routine work moves faster while customer-facing teams retain control over consequential decisions.",
    },
    ctaLabel: "Design a customer workflow →",
  },
  {
    id: "finance-administration",
    label: "Finance & administration",
    title: "Keep documents, checks, and approvals in one trace.",
    description:
      "Apply deterministic controls around AI-assisted review and route authority explicitly.",
    detail:
      "Use AI for extraction and interpretation while deterministic rules enforce thresholds, required evidence, and approval authority. The request, checks, and decisions remain attached to one run.",
    useCases: [
      "Invoice and expense review",
      "Document intake and validation",
      "Approval routing and record reconciliation",
    ],
    startingPoint:
      "Begin with a document-heavy process whose approval thresholds and responsible owners are already defined.",
    scenario: {
      title: "An invoice arrives with incomplete supporting data",
      steps: [
        "The workflow extracts fields and validates required evidence",
        "Deterministic thresholds select the approval path",
        "The responsible approver receives the request and full check history",
      ],
      outcome:
        "The document, checks, authority, and final action remain connected in one trace.",
    },
    ctaLabel: "Map a controlled approval flow →",
  },
  {
    id: "implementation-partners",
    label: "Implementation partners",
    title: "Reuse the production foundation across customer projects.",
    description:
      "Deliver different workflows on one governed runtime instead of rebuilding infrastructure.",
    detail:
      "Standardize the execution, observability, and governance layer while adapting workflows, connectors, and policies for each customer. Delivery teams can spend more time on domain logic and less on runtime plumbing.",
    useCases: [
      "Reusable workflow accelerators",
      "Customer-specific connector deployments",
      "Governed multi-tenant implementations",
    ],
    startingPoint:
      "Turn one repeated delivery pattern into a configurable workflow with explicit extension points for customer systems and policy.",
    scenario: {
      title: "A repeatable delivery pattern meets a new client stack",
      steps: [
        "The partner starts from a governed workflow accelerator",
        "Customer connectors and policy boundaries replace defined extension points",
        "The same runtime provides execution, observability, and intervention",
      ],
      outcome:
        "Delivery remains adaptable without rebuilding the production foundation for every engagement.",
    },
    ctaLabel: "Plan a reusable delivery pattern →",
  },
] as const;

export const workflowSolutions = [
  {
    id: "customer-onboarding",
    label: "Customer onboarding",
    description: "Coordinate research, setup, approvals, and launch.",
    to: "/solutions/customer-onboarding",
  },
  {
    id: "support-operations",
    label: "Connected support",
    description: "Blend automation with connected CRM, product, and chat context.",
    to: "/solutions/connected-support",
  },
  {
    id: "incident-response",
    label: "Incident response",
    description:
      "Coordinate alerts, Slack response, human authority, and recovery.",
    to: "/solutions/incident-response",
  },
  {
    id: "finance-approvals",
    label: "Finance approvals",
    description: "Keep documents, checks, and authority in one trace.",
    to: "/solutions/finance-approvals",
  },
  {
    id: "embedded-agents",
    label: "Embedded agents",
    description: "Put durable execution behind your product API.",
    to: "/solutions/embedded-agents",
  },
] as const;

export const integrationCategories = [
  "AI & Media",
  "Analytics & Support",
  "Automation & Operations",
  "Commerce & Finance",
  "Communication",
  "Content & Files",
  "CRM & Marketing",
  "Data & Databases",
  "Developer Tools",
  "Productivity",
  "Search & Research",
] as const;

export type IntegrationCategory = (typeof integrationCategories)[number];

export type Integration = {
  slug: string;
  name: string;
  category: IntegrationCategory;
};

/** Homepage and developer spotlight slugs resolved against the live platform catalog. */
export const featuredIntegrationSlugs = [
  "slack",
  "salesforce",
  "google-drive",
  "github",
  "postgres",
  "stripe",
  "hubspot",
  "notion",
  "elevenlabs",
  "firecrawl",
  "shopify",
  "posthog",
] as const;

export function resolveFeaturedConnectors(
  connectors: readonly PublicConnector[],
) {
  return featuredIntegrationSlugs.flatMap((slug) => {
    const connector = connectors.find((item) => item.slug === slug);
    return connector ? [connector] : [];
  });
}

export function getIntegrationMark(name: string) {
  const words = name
    .replace(/[;&]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
