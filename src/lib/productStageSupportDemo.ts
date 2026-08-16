import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import { formatRunOffset, type StepStatus } from "@/lib/productStageDemo";
import type { ProductStageDemoProfile } from "@/lib/productStageDemoProfile";
import { connectedSupportGraphEdges } from "@/lib/workflowGraphEdges";

export const connectedSupportNodes = [
  {
    kind: "trigger" as const,
    type: "Trigger",
    title: "Ticket received",
    description: "Starts from helpdesk webhook or API event.",
    integrationLogo: getIntegrationLogoPath("freshdesk"),
  },
  {
    kind: "agent" as const,
    type: "Agent",
    title: "Enrich from connected systems",
    description: "Pulls CRM, product usage, and entitlement context into one run.",
    integrationLogo: getIntegrationLogoPath("hubspot"),
  },
  {
    kind: "decision" as const,
    type: "Decision",
    title: "Route automated vs assisted",
    description: "Applies policy, risk, and confidence before choosing the path.",
  },
  {
    kind: "tool" as const,
    type: "Tool",
    title: "Run automated resolution",
    description: "Drafts the response, updates the ticket, and records tool output.",
    integrationLogo: getIntegrationLogoPath("freshdesk"),
  },
  {
    kind: "approval" as const,
    type: "Human approval",
    title: "Review exception package",
    description: "Pauses when connected context or policy needs human judgment.",
    highlighted: true,
  },
  {
    kind: "agent" as const,
    type: "Agent",
    title: "Coordinate connected follow-through",
    description: "Syncs the final action across chat, CRM, and helpdesk systems.",
    integrationLogo: getIntegrationLogoPath("slack"),
  },
];

const timelineLabels = [
  "Ticket received",
  "Context enriched",
  "Path selected",
  "Automated action",
  "Exception review",
  "Connected follow-through",
] as const;

const toolCallsByStep = {
  1: {
    label: "HubSpot · Growth account · PostHog usage spike",
    logo: getIntegrationLogoPath("hubspot"),
  },
  3: {
    label: "Freshdesk · Auto-reply drafted and tagged",
    logo: getIntegrationLogoPath("freshdesk"),
  },
  5: {
    label: "Slack · Escalation thread opened",
    logo: getIntegrationLogoPath("slack"),
  },
};

function createInitialRunContext() {
  return {
    runId: "—",
    workflow: "Connected support",
    workflowVersion: "v8",
    state: "idle" as const,
    input: null,
    variables: {},
  };
}

function createDemoEvents(
  stepIndex: number,
  action: "start" | "done" | "waiting" | "approved" | "rejected",
  elapsedMs: number,
  eventCount: number,
) {
  const offset = formatRunOffset(elapsedMs);
  const nextId = (suffix: number) => `evt-${eventCount + suffix}`;

  switch (stepIndex) {
    case 0:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "run.started",
            message: "Run run_29C1 created for connected support",
          },
          {
            id: nextId(2),
            offset,
            type: "trigger.received",
            message: "Freshdesk webhook · Ticket #4821 (billing access issue)",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Ticket normalized and persisted to run state",
        },
      ];
    case 1:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Agent step · Enrich from connected systems",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "HubSpot · Growth tier matched for Northwind Labs",
          },
          {
            id: nextId(3),
            offset,
            type: "tool.called",
            message: "PostHog · Login failures increased 3.2x in 24h",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "CRM and product signals attached to the run",
        },
      ];
    case 2:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "decision.evaluated",
            message:
              "Policy engine · Assisted path selected · auto-resolve blocked by risk signal",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Automated path prepared with exception checkpoint",
        },
      ];
    case 3:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Tool step · Run automated resolution",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "Freshdesk · Draft response and escalation tag created",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Automated ticket update retained in workflow state",
        },
      ];
    case 4:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Human approval step · Review exception package",
          },
        ];
      }
      if (action === "waiting") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.requested",
            message:
              "Human approval required · Review connected context before customer reply",
          },
        ];
      }
      if (action === "approved") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.approved",
            message: "Morgan Ellis approved the assisted resolution plan",
          },
        ];
      }
      if (action === "rejected") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.rejected",
            message: "Morgan Ellis rejected the proposed resolution",
          },
          {
            id: nextId(2),
            offset,
            type: "run.terminated",
            message: "Run routed to tier-2 queue · automated reply held",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Exception review cleared · run resumed",
        },
      ];
    case 5:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Agent step · Coordinate connected follow-through",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "Slack · Escalation thread opened for Northwind Labs",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "run.completed",
          message:
            "Connected support run completed · ticket, CRM, and chat state aligned",
        },
      ];
    default:
      return [];
  }
}

function runContextAfterStep(
  stepIndex: number,
  action: "start" | "done" | "waiting" | "approved" | "rejected",
  previous: ReturnType<typeof createInitialRunContext>,
) {
  if (stepIndex === 0 && action === "start") {
    return {
      ...previous,
      runId: "run_29C1",
      state: "running" as const,
      input: {
        event: "ticket.created",
        customer_id: "acct_7712",
        customer_name: "Northwind Labs",
        source: "Freshdesk webhook",
      },
      variables: {
        ...previous.variables,
        ticket_id: "fd_4821",
        issue_type: "billing_access",
      },
    };
  }

  if (stepIndex === 1 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        account_tier: "Growth",
        product_signal: "login_failures_spike",
        hubspot_company_id: "hs_90214",
      },
    };
  }

  if (stepIndex === 2 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        resolution_path: "assisted",
        automation_confidence: "0.81",
        risk_signal: "usage_anomaly",
      },
    };
  }

  if (stepIndex === 3 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        freshdesk_draft_id: "fd_draft_118",
        ticket_status: "pending_review",
      },
    };
  }

  if (stepIndex === 4 && action === "waiting") {
    return {
      ...previous,
      state: "waiting" as const,
      variables: {
        ...previous.variables,
        approval_required: "true",
        assigned_to: "Morgan Ellis",
        approval_status: "pending",
      },
    };
  }

  if (stepIndex === 4 && action === "approved") {
    return {
      ...previous,
      state: "running" as const,
      variables: {
        ...previous.variables,
        approval_status: "approved",
        approved_by: "Morgan Ellis",
      },
    };
  }

  if (stepIndex === 4 && action === "rejected") {
    return {
      ...previous,
      state: "rejected" as const,
      variables: {
        ...previous.variables,
        approval_status: "rejected",
        rejected_by: "Morgan Ellis",
        exception_route: "tier_2_queue",
      },
    };
  }

  if (stepIndex === 5 && action === "done") {
    return {
      ...previous,
      state: "completed" as const,
      variables: {
        ...previous.variables,
        slack_thread_ts: "1712539482.004200",
        ticket_status: "escalated_with_context",
      },
    };
  }

  return previous;
}

function timelineDetailForStep(stepIndex: number, status: StepStatus) {
  const node = connectedSupportNodes[stepIndex];

  if (status === "running") {
    return toolCallsByStep[stepIndex as keyof typeof toolCallsByStep]?.label ??
      node.description;
  }

  if (status === "waiting") {
    return "Assigned to Morgan Ellis · connected context ready for review";
  }

  if (status === "failed") {
    return "Resolution rejected · automated reply held and queue updated";
  }

  if (status === "done") {
    switch (stepIndex) {
      case 0:
        return "Helpdesk ticket normalized into run state";
      case 1:
        return "CRM and product telemetry attached to the case";
      case 2:
        return "Assisted path selected with automation checkpoint";
      case 3:
        return "Automated Freshdesk draft recorded";
      case 4:
        return "Exception review recorded · run resumed";
      case 5:
        return "Slack escalation and ticket state synchronized";
      default:
        return node.description;
    }
  }

  return node.description;
}

export const connectedSupportDemoProfile: ProductStageDemoProfile = {
  nodes: connectedSupportNodes,
  graphEdges: connectedSupportGraphEdges,
  toolCallsByStep,
  timelineLabels,
  approvalStepIndex: 4,
  workflowTitle: "Connected support",
  runCompleteMessage:
    "Run finished — automated and connected actions completed for the ticket.",
  runRejectedMessage:
    "Resolution rejected — automated reply held and queue updated.",
  approvalWaitingDetail:
    "Assigned to Morgan Ellis · connected context ready for review",
  createInitialRunContext,
  createDemoEvents,
  runContextAfterStep,
  timelineDetailForStep,
};
