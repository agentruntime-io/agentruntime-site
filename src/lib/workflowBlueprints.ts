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
