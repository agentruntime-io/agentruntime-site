export type WorkflowBlueprintStep = {
  type: "Trigger" | "Agent" | "Decision" | "Tool" | "Human" | "Outcome";
  title: string;
  description: string;
  detail?: string;
  integrationSlug?: string;
  toolNames?: readonly string[];
};

export type WorkflowBlueprint = {
  slug: string;
  seoTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  primaryOutcome: string;
  trigger: {
    label: string;
    description: string;
  };
  problem: readonly string[];
  inputs: readonly string[];
  steps: readonly WorkflowBlueprintStep[];
  humanCheckpoints: readonly {
    title: string;
    description: string;
  }[];
  failurePath: readonly {
    condition: string;
    response: string;
  }[];
  outputs: readonly string[];
  integrations: readonly {
    slug: string;
    name: string;
    requirement: "Required" | "Optional";
    role: string;
  }[];
  productSurfaceIds: readonly string[];
};

export const workflowBlueprints = [
  {
    slug: "customer-onboarding",
    seoTitle: "Customer Onboarding AI Workflow",
    eyebrow: "Customer operations blueprint",
    title: "Onboard every customer without rebuilding the checklist each time.",
    description:
      "Turn a CRM event into a durable onboarding run that researches the account, selects the right path, prepares the workspace, pauses for human review, and launches the customer with full observability.",
    audience: "Customer operations, success, and implementation",
    primaryOutcome:
      "One visible run from CRM event to customer launch with explicit ownership at every step.",
    trigger: {
      label: "CRM webhook or API event",
      description:
        "A CRM system sends the new customer payload, account identifiers, and source metadata to start the run.",
    },
    problem: [
      "Onboarding checklists are rebuilt for every customer instead of encoded once as a governed workflow.",
      "Context from CRM, workspace tools, and communication channels lives in separate places with no shared run state.",
      "Human review happens in chat threads without a durable approval boundary tied to execution.",
    ],
    inputs: [
      "CRM customer identifier and account metadata",
      "Account tier, product, and risk signals when available",
      "Workspace destination and access policy",
      "Named owner for implementation review",
      "Launch channel and welcome sequence policy",
    ],
    steps: [
      {
        type: "Trigger",
        title: "New customer created",
        description:
          "Create a durable run from a CRM webhook or API event and retain the source identifier for deduplication.",
        integrationSlug: "hubspot",
      },
      {
        type: "Agent",
        title: "Research account",
        description:
          "Collect account tier, contacts, and connected context across tools before selecting an onboarding path.",
        integrationSlug: "hubspot",
      },
      {
        type: "Decision",
        title: "Choose onboarding path",
        description:
          "Apply explicit rules for account tier, product, and risk to select the guided or self-serve path.",
      },
      {
        type: "Tool",
        title: "Prepare workspace",
        description:
          "Create records, tasks, and access in the workspace tool while retaining returned identifiers as workflow state.",
        integrationSlug: "notion",
      },
      {
        type: "Human",
        title: "Review onboarding plan",
        description:
          "Pause until the assigned owner approves the plan. High-impact launch actions remain behind an explicit human boundary.",
      },
      {
        type: "Agent",
        title: "Launch onboarding",
        description:
          "Execute the launch sequence, monitor progress, and handle exceptions while the workflow remains the source of truth.",
        integrationSlug: "slack",
      },
      {
        type: "Outcome",
        title: "Customer launch recorded",
        description:
          "Publish the launch status and retain the trigger, decisions, tool calls, approvals, and completion summary on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "Implementation review",
        description:
          "A named owner reviews the onboarding plan before workspace and launch actions proceed.",
      },
      {
        title: "High-risk account handling",
        description:
          "Enterprise or regulated accounts can require additional approval before access is granted or launch messages are sent.",
      },
      {
        title: "Launch confirmation",
        description:
          "The owner confirms the customer is ready before the run publishes its closing summary.",
      },
    ],
    failurePath: [
      {
        condition: "The CRM payload is incomplete",
        response:
          "Move the run into a visible wait state, identify the missing context, and route it to an operator instead of guessing.",
      },
      {
        condition: "Workspace preparation fails",
        response:
          "Retain the failed step and response, apply the configured retry policy, then surface the run for intervention.",
      },
      {
        condition: "No reviewer responds",
        response:
          "Keep the run waiting with an explicit owner and deadline, then follow the configured escalation path.",
      },
    ],
    outputs: [
      "Account research attached to the run context",
      "Selected onboarding path and confidence decision",
      "Prepared workspace draft with retained identifiers",
      "Approval record and assigned owner",
      "Launch confirmation with communication trace",
    ],
    integrations: [
      {
        slug: "hubspot",
        name: "HubSpot",
        requirement: "Required",
        role:
          "CRM trigger surface and account research context for tier, contacts, and company metadata.",
      },
      {
        slug: "notion",
        name: "Notion",
        requirement: "Required",
        role:
          "Workspace preparation for onboarding records, tasks, and implementation drafts.",
      },
      {
        slug: "slack",
        name: "Slack",
        requirement: "Required",
        role:
          "Launch coordination surface for welcome sequences and customer-facing notifications.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
  {
    slug: "support-operations",
    seoTitle: "Support Operations AI Workflow",
    eyebrow: "Support operations blueprint",
    title: "Resolve routine cases automatically and escalate with the full context.",
    description:
      "Turn an incoming support ticket into a durable resolution run that gathers account state, applies policy rules, resolves routine cases, and routes exceptions to the right owner with the investigation already prepared.",
    audience: "Support operations and customer success",
    primaryOutcome:
      "Routine cases resolve automatically; escalations arrive with account context, policy decisions, and a complete run timeline.",
    trigger: {
      label: "Helpdesk webhook or API event",
      description:
        "A support platform sends the ticket payload, customer identifier, issue category, and channel metadata to start the run.",
    },
    problem: [
      "Agents rebuild the same investigation steps for every ticket instead of encoding policy once as a workflow.",
      "Account context, product signals, and ticket history live in separate tools with no shared run state.",
      "Escalations arrive in chat without the supporting evidence, policy decision, or attempted resolution attached.",
    ],
    inputs: [
      "Ticket identifier, subject, and customer contact",
      "Account tier, product, and entitlement metadata when available",
      "Support policy thresholds for auto-resolution and escalation",
      "Named owner or queue for sensitive or high-risk cases",
      "Approved channels for escalation notifications",
    ],
    steps: [
      {
        type: "Trigger",
        title: "Receive support ticket",
        description:
          "Create a durable run from a helpdesk webhook or API event and retain the ticket identifier for deduplication.",
        integrationSlug: "freshdesk",
      },
      {
        type: "Agent",
        title: "Gather account state",
        description:
          "Collect account tier, recent activity, entitlement status, and related CRM context before applying policy.",
        integrationSlug: "hubspot",
      },
      {
        type: "Decision",
        title: "Apply policy and risk rules",
        description:
          "Use explicit category, account tier, and sensitivity rules to decide whether the case can auto-resolve or must escalate.",
      },
      {
        type: "Tool",
        title: "Resolve routine case",
        description:
          "Post the approved response, update ticket status, and retain the resolution summary as workflow state when confidence is high.",
        integrationSlug: "freshdesk",
      },
      {
        type: "Human",
        title: "Review escalation package",
        description:
          "Pause when policy requires human judgment. The assigned owner receives the ticket context, account research, and recommended next step.",
      },
      {
        type: "Tool",
        title: "Escalate with full context",
        description:
          "Notify the assigned owner in the coordination channel with the investigation package, policy decision, and ticket link.",
        integrationSlug: "slack",
      },
      {
        type: "Outcome",
        title: "Resolution or escalation recorded",
        description:
          "Publish the final status and retain the trigger, account context, policy decisions, tool calls, and human actions on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "Sensitive account handling",
        description:
          "High-value, regulated, or at-risk accounts can require a named owner before any customer-facing action is taken.",
      },
      {
        title: "Policy exception review",
        description:
          "Cases outside the auto-resolution policy arrive with the supporting context instead of as an empty escalation ping.",
      },
      {
        title: "Final resolution confirmation",
        description:
          "The owner confirms the case is closed or correctly routed before the run publishes its closing summary.",
      },
    ],
    failurePath: [
      {
        condition: "The ticket payload is incomplete",
        response:
          "Move the run into a visible wait state, identify the missing customer or account context, and route it to an operator.",
      },
      {
        condition: "Account research fails",
        response:
          "Retain the failed step, continue with ticket-only context, and mark the run for manual enrichment before auto-resolution.",
      },
      {
        condition: "No escalation owner responds",
        response:
          "Keep the run waiting with an explicit owner and deadline, then follow the configured queue escalation path.",
      },
    ],
    outputs: [
      "Ticket normalized into durable run state",
      "Account and entitlement context attached to the case",
      "Policy and risk decision with confidence rationale",
      "Auto-resolution response or escalation package",
      "Complete investigation and action timeline",
    ],
    integrations: [
      {
        slug: "freshdesk",
        name: "Freshdesk",
        requirement: "Required",
        role:
          "Helpdesk trigger surface for ticket intake, status updates, and routine case resolution.",
      },
      {
        slug: "hubspot",
        name: "HubSpot",
        requirement: "Required",
        role:
          "CRM context for account tier, contacts, and customer history used during investigation.",
      },
      {
        slug: "slack",
        name: "Slack",
        requirement: "Required",
        role:
          "Escalation coordination surface for owner notifications and handoff context.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
  {
    slug: "connected-support",
    seoTitle: "Connected Support AI Workflow",
    eyebrow: "Support operations blueprint",
    title:
      "Run connected and automated support in one governed workflow.",
    description:
      "Blend automated ticket handling with connected CRM, product telemetry, and chat systems. AgentRuntime keeps every tool call, policy decision, automated action, and human exception on one durable run timeline.",
    audience: "Support operations, customer success, and technical support",
    primaryOutcome:
      "Routine work automates where policy allows; exceptions arrive with connected context, drafted actions, and explicit human authority.",
    trigger: {
      label: "Helpdesk webhook or API event",
      description:
        "A support platform sends the ticket payload, customer identifier, issue category, and channel metadata to start the run.",
    },
    problem: [
      "Support teams either auto-reply without enough context or manually rebuild the same investigation in five tools.",
      "Automated actions and human judgment are split across chat, helpdesk, and CRM with no shared execution state.",
      "Escalations lose the automated draft, policy rationale, and connected evidence that should travel with the case.",
    ],
    inputs: [
      "Ticket identifier, subject, priority, and customer contact",
      "CRM account tier, owner, and entitlement metadata",
      "Product usage or risk signals from analytics systems",
      "Support policy thresholds for automation and escalation",
      "Approved helpdesk, CRM, and coordination channels",
    ],
    steps: [
      {
        type: "Trigger",
        title: "Ticket received",
        description:
          "Create a durable run from a helpdesk webhook or API event and retain the ticket identifier for deduplication.",
        integrationSlug: "freshdesk",
      },
      {
        type: "Agent",
        title: "Enrich from connected systems",
        description:
          "Pull CRM account context and product telemetry into the same run before any automated customer action is taken.",
        detail:
          "Combines HubSpot account metadata with PostHog product signals to inform policy and routing.",
        integrationSlug: "hubspot",
      },
      {
        type: "Decision",
        title: "Route automated vs assisted",
        description:
          "Apply explicit policy, confidence, and risk rules to decide whether the case can continue on an automated path or needs human review.",
      },
      {
        type: "Tool",
        title: "Run automated resolution",
        description:
          "Draft the response, update ticket fields, and retain the tool output as workflow state when automation is allowed to proceed.",
        integrationSlug: "freshdesk",
      },
      {
        type: "Human",
        title: "Review exception package",
        description:
          "Pause when connected context, policy, or customer risk requires judgment before the final customer-facing action.",
      },
      {
        type: "Agent",
        title: "Coordinate connected follow-through",
        description:
          "Synchronize the approved outcome across helpdesk, CRM, and coordination channels while the workflow remains the source of truth.",
        integrationSlug: "slack",
      },
      {
        type: "Outcome",
        title: "Connected resolution recorded",
        description:
          "Publish the final status and retain automated actions, connected context, human decisions, and tool calls on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "Risk-sensitive account handling",
        description:
          "Usage anomalies, entitlement changes, or high-value accounts can require a named owner before automation proceeds.",
      },
      {
        title: "Automated reply review",
        description:
          "The drafted helpdesk response and connected evidence arrive together instead of as a blank escalation ping.",
      },
      {
        title: "Cross-system follow-through",
        description:
          "The owner confirms helpdesk, CRM, and chat systems reflect the same approved outcome.",
      },
    ],
    failurePath: [
      {
        condition: "Connected enrichment is incomplete",
        response:
          "Continue with ticket-only context, mark the missing systems explicitly, and route to an operator before auto-resolution.",
      },
      {
        condition: "Automation is blocked by policy",
        response:
          "Retain the attempted automated step, package the connected context, and move the run into a human checkpoint.",
      },
      {
        condition: "A downstream tool rejects the action",
        response:
          "Keep the failed step visible, apply retry policy, and preserve the run for intervention without losing prior context.",
      },
    ],
    outputs: [
      "Ticket normalized into durable run state",
      "CRM and product telemetry attached to the case",
      "Automation vs assisted routing decision",
      "Drafted or executed helpdesk action with tool references",
      "Human approval record when required",
      "Synchronized helpdesk, CRM, and chat follow-through",
    ],
    integrations: [
      {
        slug: "freshdesk",
        name: "Freshdesk",
        requirement: "Required",
        role:
          "Helpdesk trigger, automated ticket updates, and resolution state for the support run.",
      },
      {
        slug: "hubspot",
        name: "HubSpot",
        requirement: "Required",
        role:
          "CRM context for account tier, ownership, and customer history used during enrichment.",
      },
      {
        slug: "posthog",
        name: "PostHog",
        requirement: "Required",
        role:
          "Product telemetry and risk signals that inform automation and escalation policy.",
      },
      {
        slug: "slack",
        name: "Slack",
        requirement: "Required",
        role:
          "Coordination surface for exception review, escalation, and connected follow-through.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
  {
    slug: "finance-approvals",
    seoTitle: "Finance Approvals AI Workflow",
    eyebrow: "Finance and administration blueprint",
    title: "Move documents, checks, and approvals through one controlled process.",
    description:
      "Turn an expense or invoice submission into a durable approval run that extracts supporting data, validates records, applies policy thresholds, routes authority to the right approver, and posts the outcome without losing the audit trail.",
    audience: "Finance, accounting, and operations administration",
    primaryOutcome:
      "Every document, validation, threshold decision, approval, and posting action stays attached to one traceable request.",
    trigger: {
      label: "Document upload or intake event",
      description:
        "A file share, inbox, or intake form sends the document reference, requester metadata, and submission timestamp to start the run.",
    },
    problem: [
      "Expense and invoice review still depends on email threads, spreadsheets, and manual follow-up.",
      "Supporting documents, extracted fields, and policy checks are scattered across tools with no shared run state.",
      "Approvals happen outside the system of record, making audits and exception handling slow.",
    ],
    inputs: [
      "Document reference and requester identity",
      "Vendor, amount, category, and supporting receipt metadata",
      "Approval thresholds by amount, department, and policy class",
      "Named approver or approval chain for exceptions",
      "Accounting destination and notification preferences",
    ],
    steps: [
      {
        type: "Trigger",
        title: "Receive expense document",
        description:
          "Create a durable run from a document intake event and retain the file reference, requester, and submission timestamp.",
        integrationSlug: "google-drive",
      },
      {
        type: "Agent",
        title: "Extract and validate fields",
        description:
          "Extract amount, vendor, date, and category from the document, then validate required fields against policy before routing.",
      },
      {
        type: "Decision",
        title: "Apply policy thresholds",
        description:
          "Use explicit amount, department, and category rules to decide whether the request can auto-post or requires manager approval.",
      },
      {
        type: "Human",
        title: "Manager approval",
        description:
          "Pause until the assigned approver accepts or rejects the request. High-value or exception cases remain behind an explicit human boundary.",
      },
      {
        type: "Tool",
        title: "Post to accounting system",
        description:
          "Create or update the expense record in the accounting system and retain returned identifiers as workflow state.",
        integrationSlug: "quickbooks",
      },
      {
        type: "Tool",
        title: "Notify requester",
        description:
          "Send the approved, rejected, or posted status back to the requester with the run reference attached.",
        integrationSlug: "gmail",
      },
      {
        type: "Outcome",
        title: "Request closed with audit trail",
        description:
          "Publish the final status and retain the document, extracted fields, policy decision, approval, posting action, and notifications on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "Threshold approval",
        description:
          "Requests above the configured amount or outside policy require a named approver before posting.",
      },
      {
        title: "Missing supporting data",
        description:
          "Incomplete receipts or mismatched fields route to the requester or reviewer instead of failing silently.",
      },
      {
        title: "Posting confirmation",
        description:
          "Finance confirms the accounting entry is correct before the run publishes its closing summary.",
      },
    ],
    failurePath: [
      {
        condition: "Document extraction fails",
        response:
          "Move the run into a visible wait state, request missing fields from the requester, and retain the failed extraction attempt.",
      },
      {
        condition: "Accounting post is rejected",
        response:
          "Retain the failed step and response, route the request back to the approver or operator, and keep the audit trail intact.",
      },
      {
        condition: "No approver responds",
        response:
          "Keep the run waiting with an explicit owner and deadline, then follow the configured escalation chain.",
      },
    ],
    outputs: [
      "Document and requester metadata attached to the run",
      "Extracted and validated expense fields",
      "Threshold decision with approval requirement",
      "Approval or rejection record with named authority",
      "Accounting entry reference and requester notification",
    ],
    integrations: [
      {
        slug: "google-drive",
        name: "Google Drive",
        requirement: "Required",
        role:
          "Document intake surface for receipts, invoices, and supporting files that start the approval run.",
      },
      {
        slug: "quickbooks",
        name: "QuickBooks",
        requirement: "Required",
        role:
          "Accounting destination for validated expense records and posting outcomes.",
      },
      {
        slug: "gmail",
        name: "Gmail",
        requirement: "Required",
        role:
          "Requester notification surface for approval, rejection, and posting status updates.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
  {
    slug: "embedded-agents",
    seoTitle: "Embedded Agents AI Workflow",
    eyebrow: "Product-embedded agents blueprint",
    title: "Give your product an agent without making your product the runtime.",
    description:
      "Expose durable workflows through APIs so your product can trigger multi-step research, validation, and delivery while AgentRuntime manages tools, state, intervention, and observability behind the interface.",
    audience: "Product engineering and platform teams",
    primaryOutcome:
      "The product receives a validated, streamable result without owning orchestration, retries, or run state.",
    trigger: {
      label: "Product workflow API request",
      description:
        "Your application sends a typed workflow request with user context, input payload, and response delivery preferences.",
    },
    problem: [
      "Product teams rebuild orchestration, retries, and observability inside the application for every agent feature.",
      "Parallel tool calls and synthesis logic become tightly coupled to the customer-facing interface.",
      "Failures, partial results, and validation boundaries are hard to inspect outside the product codebase.",
    ],
    inputs: [
      "Stable product request identifier and user context",
      "Typed workflow input payload and policy constraints",
      "Allowed research tools and external data sources",
      "Output schema and validation rules",
      "Streaming or callback destination for the final result",
    ],
    steps: [
      {
        type: "Trigger",
        title: "Receive product request",
        description:
          "Create a durable run from a workflow API request and retain the caller, request identifier, and input payload.",
      },
      {
        type: "Tool",
        title: "Start workflow runtime",
        description:
          "Hand the request to AgentRuntime and persist the returned run identifier as workflow state.",
      },
      {
        type: "Agent",
        title: "Run parallel research tools",
        description:
          "Execute approved research and extraction tools in parallel while retaining each tool response on the run timeline.",
        integrationSlug: "exa",
      },
      {
        type: "Agent",
        title: "Synthesize validated answer",
        description:
          "Combine tool outputs into a single candidate response that matches the product schema and policy constraints.",
        integrationSlug: "firecrawl",
      },
      {
        type: "Decision",
        title: "Validate output",
        description:
          "Apply explicit schema, safety, and confidence rules before the result is returned to the product.",
      },
      {
        type: "Tool",
        title: "Stream result to product",
        description:
          "Deliver the approved response through the configured stream or callback channel with the run reference attached.",
      },
      {
        type: "Outcome",
        title: "Run completed for caller",
        description:
          "Publish the final status and retain the request, tool calls, validation decision, and delivery trace on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "High-risk request review",
        description:
          "Sensitive or policy-bound requests can pause for operator review before external tools execute.",
      },
      {
        title: "Validation failure handling",
        description:
          "Invalid or low-confidence outputs route to fallback logic or human review instead of reaching the product.",
      },
      {
        title: "Delivery confirmation",
        description:
          "The platform confirms the product received the final payload before the run is marked complete.",
      },
    ],
    failurePath: [
      {
        condition: "A research tool times out or fails",
        response:
          "Retain the failed step, apply retry policy, and continue with partial context when the workflow allows it.",
      },
      {
        condition: "Validation rejects the synthesized answer",
        response:
          "Route the run to fallback generation or human review while preserving the rejected candidate on the timeline.",
      },
      {
        condition: "The product callback is unavailable",
        response:
          "Keep the run in a visible wait state, retry delivery, and surface the failure for operator intervention.",
      },
    ],
    outputs: [
      "Durable run identifier for the product request",
      "Parallel tool outputs attached to run context",
      "Validated response payload for the product surface",
      "Delivery status with retry and failure history",
      "Complete request-to-result execution timeline",
    ],
    integrations: [
      {
        slug: "exa",
        name: "Exa",
        requirement: "Required",
        role:
          "Research tool for live web retrieval and source gathering inside the embedded workflow.",
      },
      {
        slug: "firecrawl",
        name: "Firecrawl",
        requirement: "Optional",
        role:
          "Structured extraction tool for turning pages and documents into workflow-ready context.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
  {
    slug: "incident-response",
    seoTitle: "Incident Response AI Workflow",
    eyebrow: "Engineering operations blueprint",
    title: "Run incident response as one governed workflow.",
    description:
      "Turn an alert into a durable response run that gathers context, applies explicit severity rules, opens a Slack coordination thread, pauses for human authority, and preserves the complete resolution timeline.",
    audience: "Engineering and operations",
    primaryOutcome:
      "One owned, recoverable execution trace from alert receipt to resolution summary.",
    trigger: {
      label: "Typed API or webhook event",
      description:
        "A monitoring system sends the alert payload, affected service, source identifier, and available diagnostic context.",
    },
    problem: [
      "Alerts arrive before the team has a shared incident record, owner, or severity decision.",
      "Evidence, decisions, and status updates become fragmented across monitoring tools and chat.",
      "A failed notification or missing input can silently break an improvised automation.",
    ],
    inputs: [
      "Alert source and stable event identifier",
      "Affected service, environment, and initial severity",
      "Diagnostic links and recent-change context when available",
      "Slack channel allowed for incident coordination",
      "Escalation and approval policy for high-impact actions",
    ],
    steps: [
      {
        type: "Trigger",
        title: "Receive and normalize the alert",
        description:
          "Create a durable run from a typed API or webhook event and retain the source identifier for deduplication.",
      },
      {
        type: "Agent",
        title: "Prepare the incident context",
        description:
          "Summarize the alert, affected service, available diagnostics, and recent changes without executing a corrective action.",
      },
      {
        type: "Decision",
        title: "Apply severity and routing rules",
        description:
          "Use explicit service, environment, and severity rules to select the response path and required owner.",
      },
      {
        type: "Tool",
        title: "Open the Slack response thread",
        description:
          "Post a structured incident message to an approved channel and retain the returned message timestamp as workflow state.",
        detail:
          "Posts the coordination message with slack_post_message and retains the returned thread reference.",
        integrationSlug: "slack",
        toolNames: ["slack_post_message"],
      },
      {
        type: "Human",
        title: "Confirm ownership and authority",
        description:
          "Pause until an incident commander accepts ownership. High-impact remediation remains behind an explicit human boundary.",
      },
      {
        type: "Tool",
        title: "Keep the response thread current",
        description:
          "Post investigation updates and decisions as thread replies while the workflow remains the source of execution state.",
        integrationSlug: "slack",
        toolNames: [
          "slack_reply_to_thread",
          "slack_get_thread_replies",
          "slack_add_reaction",
        ],
      },
      {
        type: "Outcome",
        title: "Close with a structured resolution record",
        description:
          "Publish the final status and retain the trigger, decisions, human actions, tool calls, failures, and resolution summary on one timeline.",
      },
    ],
    humanCheckpoints: [
      {
        title: "Incident command",
        description:
          "A named person accepts ownership before the workflow treats the response path as active.",
      },
      {
        title: "High-impact remediation",
        description:
          "Rollback, deployment, credential, data, or customer-facing actions remain outside this starter blueprint until an authorized person approves them.",
      },
      {
        title: "Resolution",
        description:
          "The owner confirms the incident is resolved before the run publishes its closing summary.",
      },
    ],
    failurePath: [
      {
        condition: "The alert payload is incomplete",
        response:
          "Move the run into a visible wait state, identify the missing context, and route it to an operator instead of guessing.",
      },
      {
        condition: "Slack rejects a tool call",
        response:
          "Retain the failed step and response, apply the configured retry policy, then surface the run for intervention if credentials, scopes, or channel access need correction.",
      },
      {
        condition: "No incident owner responds",
        response:
          "Keep the run waiting with an explicit owner and deadline, then follow the configured escalation path.",
      },
    ],
    outputs: [
      "A Slack incident message and response thread",
      "Named owner and explicit severity decision",
      "Structured investigation and decision timeline",
      "Visible failed-step and intervention history",
      "Resolution summary attached to the completed run",
    ],
    integrations: [
      {
        slug: "slack",
        name: "Slack",
        requirement: "Required",
        role:
          "Human coordination surface for the incident message, response thread, acknowledgements, and status updates.",
      },
    ],
    productSurfaceIds: [
      "workflow-studio",
      "runtime-apis",
      "command-center",
      "control-plane",
    ],
  },
] satisfies readonly WorkflowBlueprint[];

export function getWorkflowBlueprint(slug: string) {
  return workflowBlueprints.find((blueprint) => blueprint.slug === slug);
}
