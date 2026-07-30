import type { IntegrationCategory } from "@/lib/marketingCatalog";

type IntegrationGuide = {
  summary: string;
  role: string;
  patterns: readonly {
    title: string;
    description: string;
  }[];
  controls: readonly string[];
};

export const integrationCategoryGuides = {
  "AI & Media": {
    summary:
      "Use model and media services as controlled steps inside a larger operational workflow.",
    role:
      "Generate, transform, or analyze content while AgentRuntime handles validation, routing, review, and the surrounding business process.",
    patterns: [
      {
        title: "Generate within a governed process",
        description:
          "Create text, audio, images, or video only when the workflow reaches the correct approved step.",
      },
      {
        title: "Validate before publishing",
        description:
          "Check structured outputs, policy requirements, and required human review before downstream use.",
      },
      {
        title: "Coordinate multiple services",
        description:
          "Route specialized tasks to different model or media providers while preserving one execution history.",
      },
    ],
    controls: [
      "Confirm supported models, formats, and usage limits",
      "Define validation and human-review boundaries",
      "Track generated assets and downstream publication",
    ],
  },
  "Analytics & Support": {
    summary:
      "Bring support and analytics context into workflows that investigate, decide, and act.",
    role:
      "Use service data to build context, identify conditions, and route cases while keeping interventions and outcomes visible.",
    patterns: [
      {
        title: "Investigate a customer issue",
        description:
          "Gather account, product, and support context before an agent proposes or executes the next action.",
      },
      {
        title: "Respond to operational signals",
        description:
          "Turn an alert, ticket, or analytics condition into a traceable multi-step response.",
      },
      {
        title: "Escalate with prepared context",
        description:
          "Send complex cases to the responsible person with findings, policy checks, and attempted actions attached.",
      },
    ],
    controls: [
      "Scope access to the required customer and analytics data",
      "Define confidence thresholds for automated action",
      "Keep escalation ownership and response history explicit",
    ],
  },
  "Automation & Operations": {
    summary:
      "Connect existing automation systems to durable workflows with state, decisions, and ownership.",
    role:
      "Use automation services for triggers and actions while AgentRuntime coordinates exceptions, long waits, and human responsibility.",
    patterns: [
      {
        title: "Extend an existing automation",
        description:
          "Start or continue a governed workflow when a current automation reaches work that needs context or judgment.",
      },
      {
        title: "Coordinate cross-system operations",
        description:
          "Keep several tools and owners aligned inside one run instead of chaining opaque one-off jobs.",
      },
      {
        title: "Recover from exceptions",
        description:
          "Route failed actions and missing inputs into a visible recovery path without losing process state.",
      },
    ],
    controls: [
      "Separate idempotent actions from irreversible actions",
      "Set retry, timeout, and exception ownership rules",
      "Record external job identifiers for reconciliation",
    ],
  },
  "Commerce & Finance": {
    summary:
      "Coordinate commerce and finance actions with explicit checks, thresholds, and approval authority.",
    role:
      "Use transaction and order context inside workflows where deterministic policy and human authorization must surround AI-assisted work.",
    patterns: [
      {
        title: "Review a transaction or document",
        description:
          "Collect the relevant records, apply policy checks, and route uncertain cases for review.",
      },
      {
        title: "Coordinate order operations",
        description:
          "Move from an order event through inventory, customer communication, exceptions, and resolution.",
      },
      {
        title: "Gate sensitive actions",
        description:
          "Require explicit authority before refunds, payments, or material record changes proceed.",
      },
    ],
    controls: [
      "Define monetary thresholds and approval authority",
      "Protect payment and financial data boundaries",
      "Reconcile every external action with the workflow run",
    ],
  },
  Communication: {
    summary:
      "Use messages, email, meetings, and notifications as governed workflow entry and exit points.",
    role:
      "Turn communication into structured work, keep automated outreach controlled, and preserve a clean handoff to people.",
    patterns: [
      {
        title: "Start work from a message",
        description:
          "Convert an inbound request into a typed workflow with context, ownership, and a visible status.",
      },
      {
        title: "Send contextual notifications",
        description:
          "Notify the right person or channel when a run reaches a decision, wait, exception, or completion.",
      },
      {
        title: "Bring a person into the loop",
        description:
          "Collect approval or missing information and resume the same run when the response arrives.",
      },
    ],
    controls: [
      "Define approved senders, recipients, and channels",
      "Prevent duplicate outreach across retries",
      "Retain consent, escalation, and response context",
    ],
  },
  "Content & Files": {
    summary:
      "Move files and documents through extraction, validation, transformation, and review workflows.",
    role:
      "Use content systems as sources and destinations while AgentRuntime coordinates the decisions and people around each asset.",
    patterns: [
      {
        title: "Process incoming documents",
        description:
          "Ingest a file, extract required information, validate it, and request anything that is missing.",
      },
      {
        title: "Prepare governed content",
        description:
          "Draft or transform content, apply policy checks, and route it through the required review path.",
      },
      {
        title: "Keep systems synchronized",
        description:
          "Move approved assets and metadata to the correct destination with a traceable execution history.",
      },
    ],
    controls: [
      "Confirm supported file types and size limits",
      "Apply retention and sensitive-data policies",
      "Validate destination paths, permissions, and version behavior",
    ],
  },
  "CRM & Marketing": {
    summary:
      "Coordinate account, lead, and lifecycle work across CRM context, research, outreach, and human ownership.",
    role:
      "Use customer records as durable workflow context while agents and teams research, decide, update, and follow up.",
    patterns: [
      {
        title: "Enrich and qualify a record",
        description:
          "Combine CRM data with research, apply qualification rules, and route the next action.",
      },
      {
        title: "Run customer lifecycle workflows",
        description:
          "Coordinate onboarding, renewal, expansion, or re-engagement across systems and owners.",
      },
      {
        title: "Keep account context current",
        description:
          "Write validated outcomes back to the CRM without hiding decisions in an opaque automation.",
      },
    ],
    controls: [
      "Limit workflows to the required objects and fields",
      "Define ownership before creating tasks or outreach",
      "Prevent duplicate updates and lifecycle actions",
    ],
  },
  "Data & Databases": {
    summary:
      "Use operational data as workflow context and persist validated results with clear boundaries.",
    role:
      "Read and write data through explicit steps while AgentRuntime controls schemas, retries, state, and downstream decisions.",
    patterns: [
      {
        title: "Build context for an agent",
        description:
          "Load only the records needed for the current task and carry the result through the run.",
      },
      {
        title: "Persist structured outcomes",
        description:
          "Validate model and tool output before writing approved fields or records.",
      },
      {
        title: "Reconcile systems",
        description:
          "Compare sources, identify mismatches, and route corrections through controlled actions.",
      },
    ],
    controls: [
      "Use least-privilege credentials and scoped queries",
      "Validate schemas before reads and writes",
      "Design idempotency, transaction, and retry behavior",
    ],
  },
  "Developer Tools": {
    summary:
      "Connect engineering systems to workflows that investigate, change, validate, and request approval.",
    role:
      "Use repository and developer-tool events inside controlled engineering workflows with explicit review and recovery paths.",
    patterns: [
      {
        title: "Respond to an engineering event",
        description:
          "Start work from an issue, change, or deployment signal and gather the context needed to proceed.",
      },
      {
        title: "Prepare a technical change",
        description:
          "Let agents investigate and draft while deterministic checks and people control what is accepted.",
      },
      {
        title: "Coordinate release operations",
        description:
          "Keep checks, approvals, notifications, and follow-up actions in one visible run.",
      },
    ],
    controls: [
      "Scope repository, organization, and environment access",
      "Require review before material code or deployment changes",
      "Attach external checks and revisions to the run history",
    ],
  },
  Productivity: {
    summary:
      "Turn tasks, schedules, notes, and collaborative work into coordinated execution.",
    role:
      "Use productivity systems as human-facing work surfaces while AgentRuntime maintains process state and cross-system coordination.",
    patterns: [
      {
        title: "Create and assign structured work",
        description:
          "Turn a workflow decision into the correct task, owner, due date, and supporting context.",
      },
      {
        title: "Wait for human progress",
        description:
          "Pause a run until a task, meeting, or review reaches the state required to continue.",
      },
      {
        title: "Keep plans synchronized",
        description:
          "Update shared work surfaces as the underlying workflow changes state.",
      },
    ],
    controls: [
      "Define the system of record for status and ownership",
      "Prevent duplicate tasks and calendar activity",
      "Map external completion states to workflow signals",
    ],
  },
  "Search & Research": {
    summary:
      "Gather external information inside workflows that preserve sources, validation, and decision context.",
    role:
      "Use search and research services to collect evidence while AgentRuntime controls queries, synthesis, review, and downstream action.",
    patterns: [
      {
        title: "Research an account or topic",
        description:
          "Run focused searches, collect sources, and structure findings for the next workflow step.",
      },
      {
        title: "Monitor changing information",
        description:
          "Check for relevant changes on a schedule and start action only when defined conditions are met.",
      },
      {
        title: "Prepare an evidence-backed decision",
        description:
          "Combine retrieved information with internal context and route uncertain conclusions for review.",
      },
    ],
    controls: [
      "Retain sources and retrieval timestamps",
      "Set query, domain, freshness, and cost boundaries",
      "Validate findings before high-impact actions",
    ],
  },
} satisfies Record<IntegrationCategory, IntegrationGuide>;
