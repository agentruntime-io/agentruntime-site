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
        { label: "Trigger", value: "Customer created" },
        { label: "Agent", value: "Research account" },
        { label: "Decision", value: "Choose onboarding path" },
        { label: "Human", value: "Review implementation plan" },
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
        { label: "Source", value: "Product API" },
        { label: "Workflow", value: "Account research" },
        { label: "State", value: "Running · step 4 of 7" },
        { label: "Next", value: "Wait for policy signal" },
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
        { label: "Approval", value: "Implementation plan · 4m" },
        { label: "Exception", value: "Missing billing contact · 11m" },
        { label: "Failure", value: "CRM update · retry ready" },
        { label: "Waiting", value: "Customer documents · 2h" },
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
        { label: "Connection", value: "Salesforce · scoped" },
        { label: "Secret", value: "Production vault · active" },
        { label: "Action", value: "Refund > $500 · approval" },
        { label: "Audit", value: "All transitions · retained" },
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
  },
] as const;

export const workflowSolutions = [
  {
    id: "customer-onboarding",
    label: "Customer onboarding",
    description: "Coordinate research, setup, approvals, and launch.",
  },
  {
    id: "support-operations",
    label: "Issue resolution",
    description: "Resolve routine cases and escalate with context.",
  },
  {
    id: "finance-approvals",
    label: "Finance approvals",
    description: "Keep documents, checks, and authority in one trace.",
  },
  {
    id: "embedded-agents",
    label: "Embedded agents",
    description: "Put durable execution behind your product API.",
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

/**
 * Public connector index derived from committed manifests in connectors/catalog.
 * The mock healthcare test connector is intentionally excluded from marketing.
 */
export const integrations = [
  { slug: "activecampaign", name: "ActiveCampaign", category: "CRM & Marketing" },
  { slug: "airtable", name: "Airtable", category: "Data & Databases" },
  { slug: "apify", name: "Apify", category: "Search & Research" },
  { slug: "brave", name: "Brave Search", category: "Search & Research" },
  { slug: "browserless", name: "Browserless", category: "Search & Research" },
  { slug: "clicksend", name: "ClickSend", category: "Communication" },
  { slug: "clickup", name: "ClickUp", category: "Productivity" },
  { slug: "cloudinary", name: "Cloudinary", category: "Content & Files" },
  { slug: "contentful", name: "Contentful", category: "Content & Files" },
  { slug: "csv", name: "CSV", category: "Data & Databases" },
  { slug: "cursor", name: "Cursor", category: "Developer Tools" },
  { slug: "dropbox", name: "Dropbox", category: "Content & Files" },
  { slug: "elevenlabs", name: "ElevenLabs", category: "AI & Media" },
  { slug: "exa", name: "Exa", category: "Search & Research" },
  { slug: "fellow", name: "Fellow", category: "Productivity" },
  { slug: "figma", name: "Figma", category: "Productivity" },
  { slug: "firecrawl", name: "Firecrawl", category: "Search & Research" },
  { slug: "firestore", name: "Firestore", category: "Data & Databases" },
  { slug: "freshdesk", name: "Freshdesk", category: "Analytics & Support" },
  { slug: "gemini-image", name: "Gemini Image", category: "AI & Media" },
  { slug: "github", name: "GitHub", category: "Developer Tools" },
  { slug: "gitlab", name: "GitLab", category: "Developer Tools" },
  { slug: "gmail", name: "Gmail", category: "Communication" },
  {
    slug: "google-analytics-4",
    name: "Google Analytics 4",
    category: "Analytics & Support",
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    category: "CRM & Marketing",
  },
  { slug: "google-calendar", name: "Google Calendar", category: "Productivity" },
  { slug: "google-docs", name: "Google Docs", category: "Content & Files" },
  { slug: "google-drive", name: "Google Drive", category: "Content & Files" },
  { slug: "google-form", name: "Google Forms", category: "Productivity" },
  { slug: "google-keep", name: "Google Keep", category: "Productivity" },
  { slug: "google-meet", name: "Google Meet", category: "Communication" },
  { slug: "google-search", name: "Google Search", category: "Search & Research" },
  {
    slug: "google-search-console",
    name: "Google Search Console",
    category: "Analytics & Support",
  },
  { slug: "google-sheets", name: "Google Sheets", category: "Data & Databases" },
  { slug: "google-slides", name: "Google Slides", category: "Content & Files" },
  { slug: "google-task", name: "Google Tasks", category: "Productivity" },
  { slug: "heartbeat", name: "Heartbeat", category: "Communication" },
  { slug: "heygen", name: "HeyGen", category: "AI & Media" },
  { slug: "hubspot", name: "HubSpot", category: "CRM & Marketing" },
  { slug: "hugging-face", name: "Hugging Face", category: "AI & Media" },
  { slug: "imap", name: "IMAP", category: "Communication" },
  { slug: "knock", name: "Knock", category: "Communication" },
  { slug: "linear", name: "Linear", category: "Productivity" },
  { slug: "linkedin", name: "LinkedIn", category: "CRM & Marketing" },
  { slug: "linkup", name: "Linkup", category: "Search & Research" },
  { slug: "mailchimp", name: "Mailchimp", category: "CRM & Marketing" },
  { slug: "mongodb", name: "MongoDB", category: "Data & Databases" },
  { slug: "mysql", name: "MySQL", category: "Data & Databases" },
  { slug: "neo4j", name: "Neo4j", category: "Data & Databases" },
  { slug: "notion", name: "Notion", category: "Productivity" },
  { slug: "openai-image", name: "OpenAI Image", category: "AI & Media" },
  { slug: "pdf", name: "PDF", category: "Content & Files" },
  { slug: "postgres", name: "PostgreSQL", category: "Data & Databases" },
  { slug: "posthog", name: "PostHog", category: "Analytics & Support" },
  { slug: "quickbooks", name: "QuickBooks", category: "Commerce & Finance" },
  { slug: "reddit", name: "Reddit", category: "Search & Research" },
  { slug: "redis", name: "Redis", category: "Data & Databases" },
  { slug: "resend", name: "Resend", category: "Communication" },
  { slug: "rss", name: "RSS", category: "Search & Research" },
  { slug: "salesforce", name: "Salesforce", category: "CRM & Marketing" },
  { slug: "sendgrid", name: "SendGrid", category: "Communication" },
  { slug: "shopify", name: "Shopify", category: "Commerce & Finance" },
  { slug: "slack", name: "Slack", category: "Communication" },
  { slug: "spotify", name: "Spotify", category: "AI & Media" },
  { slug: "sqlite", name: "SQLite", category: "Data & Databases" },
  { slug: "square", name: "Square", category: "Commerce & Finance" },
  { slug: "streak", name: "Streak", category: "CRM & Marketing" },
  { slug: "stripe", name: "Stripe", category: "Commerce & Finance" },
  { slug: "supabase", name: "Supabase", category: "Data & Databases" },
  { slug: "tavily", name: "Tavily", category: "Search & Research" },
  { slug: "tl-dv", name: "tl;dv", category: "Productivity" },
  { slug: "trello", name: "Trello", category: "Productivity" },
  { slug: "vapi", name: "Vapi", category: "AI & Media" },
  { slug: "whatsapp", name: "WhatsApp", category: "Communication" },
  { slug: "wrike", name: "Wrike", category: "Productivity" },
  { slug: "youtube", name: "YouTube", category: "AI & Media" },
  { slug: "zapier", name: "Zapier", category: "Automation & Operations" },
  { slug: "zoom", name: "Zoom", category: "Communication" },
] satisfies readonly Integration[];

export const featuredIntegrations = [
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
].flatMap((slug) => {
  const integration = integrations.find((item) => item.slug === slug);
  return integration ? [integration] : [];
});

export const integrationCount = integrations.length;

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
