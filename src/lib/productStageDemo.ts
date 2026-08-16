import { getIntegrationLogoPath } from "./integrationLogos";
import type { ProductStageDemoProfile } from "./productStageDemoProfile";
import { standardSixNodeWorkflowEdges } from "./workflowGraphEdges";

export type StepStatus = "pending" | "running" | "done" | "waiting" | "failed";

export type RunPhase =
  | "idle"
  | "running"
  | "approval"
  | "paused"
  | "complete"
  | "rejected"
  | "stopped";

export type ProductStageNodeKind =
  | "trigger"
  | "agent"
  | "decision"
  | "tool"
  | "approval";

export type ProductStageNode = {
  kind: ProductStageNodeKind;
  type: string;
  title: string;
  description: string;
  highlighted?: boolean;
  integrationLogo?: string;
};

export type ToolCallDetail = {
  label: string;
  logo?: string;
};

export type TimelineEntry = {
  id: string;
  label: string;
  status: StepStatus;
  stepType: string;
  startMs: number;
  endMs: number | null;
};

export type DemoEvent = {
  id: string;
  offset: string;
  type: string;
  message: string;
};

export type RunContextSnapshot = {
  runId: string;
  workflow: string;
  workflowVersion: string;
  state: "idle" | "running" | "waiting" | "completed" | "rejected" | "stopped";
  input: {
    event: string;
    customer_id: string;
    customer_name: string;
    source: string;
  } | null;
  variables: Record<string, string>;
};

export type BottomPanelTab = "context" | "events" | "timeline";

export const productStageNodes: ProductStageNode[] = [
  {
    kind: "trigger",
    type: "Trigger",
    title: "New customer created",
    description: "Starts from CRM or API event.",
    integrationLogo: getIntegrationLogoPath("hubspot"),
  },
  {
    kind: "agent",
    type: "Agent",
    title: "Research account",
    description: "Collects context across connected tools.",
    integrationLogo: getIntegrationLogoPath("hubspot"),
  },
  {
    kind: "decision",
    type: "Decision",
    title: "Choose onboarding path",
    description: "Applies rules, confidence and account tier.",
  },
  {
    kind: "tool",
    type: "Tool",
    title: "Prepare workspace",
    description: "Creates records, tasks and access.",
    integrationLogo: getIntegrationLogoPath("notion"),
  },
  {
    kind: "approval",
    type: "Human approval",
    title: "Review plan",
    description: "Routes to the exact owner when judgment matters.",
    highlighted: true,
  },
  {
    kind: "agent",
    type: "Agent",
    title: "Launch onboarding",
    description: "Executes, monitors and handles exceptions.",
    integrationLogo: getIntegrationLogoPath("slack"),
  },
];

export const timelineLabels = [
  "Trigger received",
  "Account research",
  "Path selected",
  "Workspace prepared",
  "Approval",
  "Onboarding launched",
] as const;

export const toolCallsByStep: Partial<Record<number, ToolCallDetail>> = {
  1: {
    label: "HubSpot · Account tier: Enterprise",
    logo: getIntegrationLogoPath("hubspot"),
  },
  3: {
    label: "Notion · Workspace draft created",
    logo: getIntegrationLogoPath("notion"),
  },
  5: {
    label: "Slack · Welcome sequence scheduled",
    logo: getIntegrationLogoPath("slack"),
  },
};

export const stepDurationMs = 1400;
export const stepGapMs = 350;
export const completePauseMs = 4500;
export const autoStartDelayMs = 1200;
export const autoApproveDelayMs = 5000;

export function createInitialStepStatuses(): StepStatus[] {
  return productStageNodes.map(() => "pending");
}

export function createInitialTimeline(): TimelineEntry[] {
  return [];
}

export function createInitialRunContext(): RunContextSnapshot {
  return {
    runId: "—",
    workflow: "Customer onboarding",
    workflowVersion: "v12",
    state: "idle",
    input: null,
    variables: {},
  };
}

export function formatRunOffset(elapsedMs: number): string {
  return `+${(elapsedMs / 1000).toFixed(1)}s`;
}

export function createDemoEvents(
  stepIndex: number,
  action: "start" | "done" | "waiting" | "approved" | "rejected",
  elapsedMs: number,
  eventCount: number,
): DemoEvent[] {
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
            message: "Run run_84F2 created for customer onboarding",
          },
          {
            id: nextId(2),
            offset,
            type: "trigger.received",
            message: "CRM webhook · New customer created (Acme Holdings)",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Trigger normalized and persisted to run state",
        },
      ];
    case 1:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Agent step · Research account",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "HubSpot · Account tier: Enterprise",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Account research attached to run context",
        },
      ];
    case 2:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "decision.evaluated",
            message: "Rules engine · Enterprise tier matched guided onboarding",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Onboarding path set to Enterprise guided",
        },
      ];
    case 3:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Tool step · Prepare workspace",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "Notion · Workspace draft created",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Workspace draft ready for review",
        },
      ];
    case 4:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Human approval step · Review onboarding plan",
          },
        ];
      }
      if (action === "waiting") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.requested",
            message: "Human approval required · Review onboarding plan",
          },
        ];
      }
      if (action === "approved") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.approved",
            message: "Jordan Lee approved the onboarding plan",
          },
        ];
      }
      if (action === "rejected") {
        return [
          {
            id: nextId(1),
            offset,
            type: "approval.rejected",
            message: "Jordan Lee rejected the onboarding plan",
          },
          {
            id: nextId(2),
            offset,
            type: "run.terminated",
            message: "Run routed to exception handling · onboarding paused",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "step.completed",
          message: "Approval checkpoint cleared",
        },
      ];
    case 5:
      if (action === "start") {
        return [
          {
            id: nextId(1),
            offset,
            type: "step.started",
            message: "Agent step · Launch onboarding",
          },
          {
            id: nextId(2),
            offset,
            type: "tool.called",
            message: "Slack · Welcome sequence scheduled",
          },
        ];
      }
      return [
        {
          id: nextId(1),
          offset,
          type: "run.completed",
          message: "Onboarding launched · run_84F2 completed successfully",
        },
      ];
    default:
      return [];
  }
}

export function runContextAfterStep(
  stepIndex: number,
  action: "start" | "done" | "waiting" | "approved" | "rejected",
  previous: RunContextSnapshot,
): RunContextSnapshot {
  if (stepIndex === 0 && action === "start") {
    return {
      ...previous,
      runId: "run_84F2",
      state: "running",
      input: {
        event: "customer.created",
        customer_id: "crm_9182",
        customer_name: "Acme Holdings",
        source: "HubSpot webhook",
      },
      variables: {
        ...previous.variables,
        trigger_id: "trg_019a4f2",
      },
    };
  }

  if (stepIndex === 1 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        account_tier: "Enterprise",
        primary_contact: "Jordan Lee",
        hubspot_company_id: "hs_44821",
      },
    };
  }

  if (stepIndex === 2 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        onboarding_path: "enterprise_guided",
        decision_confidence: "0.94",
      },
    };
  }

  if (stepIndex === 3 && action === "done") {
    return {
      ...previous,
      variables: {
        ...previous.variables,
        workspace_id: "ws_acme_onb_12",
        notion_page_url: "notion.so/acme-onboarding-draft",
      },
    };
  }

  if (stepIndex === 4 && action === "waiting") {
    return {
      ...previous,
      state: "waiting",
      variables: {
        ...previous.variables,
        approval_required: "true",
        assigned_to: "Jordan Lee",
        approval_status: "pending",
      },
    };
  }

  if (stepIndex === 4 && action === "approved") {
    return {
      ...previous,
      state: "running",
      variables: {
        ...previous.variables,
        approval_status: "approved",
        approved_by: "Jordan Lee",
      },
    };
  }

  if (stepIndex === 4 && action === "rejected") {
    return {
      ...previous,
      state: "rejected",
      variables: {
        ...previous.variables,
        approval_status: "rejected",
        rejected_by: "Jordan Lee",
        exception_route: "finance_review",
      },
    };
  }

  if (stepIndex === 5 && action === "done") {
    return {
      ...previous,
      state: "completed",
      variables: {
        ...previous.variables,
        launch_channel: "slack",
        welcome_sequence_id: "seq_441",
      },
    };
  }

  return previous;
}

export function formatRunContextState(state: RunContextSnapshot["state"]): string {
  switch (state) {
    case "idle":
      return "Idle";
    case "running":
      return "Running";
    case "waiting":
      return "Waiting";
    case "completed":
      return "Completed";
    case "rejected":
      return "Rejected";
    case "stopped":
      return "Stopped";
  }
}

export function runStatusLabel(phase: RunPhase): string {
  switch (phase) {
    case "idle":
      return "Run workflow";
    case "running":
      return "Running…";
    case "approval":
      return "Waiting for approval";
    case "paused":
      return "Paused";
    case "complete":
      return "Run complete";
    case "rejected":
      return "Plan rejected";
    case "stopped":
      return "Run stopped";
  }
}

export function timelineStatusLabel(status: StepStatus): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "running":
      return "Running";
    case "done":
      return "Done";
    case "waiting":
      return "Waiting";
    case "failed":
      return "Rejected";
  }
}

export function timelineDetailForStep(
  stepIndex: number,
  status: StepStatus,
): string {
  const node = productStageNodes[stepIndex];

  if (status === "running") {
    return toolCallsByStep[stepIndex]?.label ?? node.description;
  }

  if (status === "waiting") {
    return "Assigned to Jordan Lee · plan ready for review";
  }

  if (status === "failed") {
    return "Plan rejected · run routed to exception handling";
  }

  if (status === "done") {
    switch (stepIndex) {
      case 0:
        return "CRM webhook normalized into run state";
      case 1:
        return "Enterprise tier and account context attached";
      case 2:
        return "Enterprise guided path selected";
      case 3:
        return "Workspace draft created in Notion";
      case 4:
        return "Approval recorded · run resumed";
      case 5:
        return "Welcome sequence scheduled in Slack";
      default:
        return node.description;
    }
  }

  return node.description;
}

export function getTimelineSpanMs(
  timeline: TimelineEntry[],
  currentMs: number | null,
): number {
  const ends = timeline.map((entry) =>
    entry.endMs ?? currentMs ?? entry.startMs,
  );
  const maxEnd = ends.length > 0 ? Math.max(...ends) : 0;
  return Math.max(maxEnd, currentMs ?? 0, stepDurationMs);
}

export function getTimelineAxisTicks(totalMs: number): number[] {
  const tickCount = 4;
  return Array.from({ length: tickCount + 1 }, (_, index) =>
    Math.round((totalMs / tickCount) * index),
  );
}

export function upsertTimelineEntry(
  entries: TimelineEntry[],
  stepIndex: number,
  status: StepStatus,
  elapsedMs: number | null,
  nodes: readonly ProductStageNode[] = productStageNodes,
  timelineLabelsSource: readonly string[] = timelineLabels,
): TimelineEntry[] {
  const node = nodes[stepIndex];
  if (!node) return entries;

  const id = `step-${stepIndex}`;
  const label = timelineLabelsSource[stepIndex] ?? node.title;
  const stepType = node.type;
  const existing = entries.find((entry) => entry.id === id);
  const startMs = existing?.startMs ?? elapsedMs ?? 0;
  let endMs = existing?.endMs ?? null;

  if (status === "done" || status === "failed") {
    endMs = elapsedMs ?? startMs;
  } else if (status === "running" || status === "waiting") {
    endMs = null;
  }

  const nextEntry: TimelineEntry = {
    id,
    label,
    status,
    stepType,
    startMs,
    endMs,
  };

  if (existing) {
    return entries.map((entry) => (entry.id === id ? nextEntry : entry));
  }

  return [...entries, nextEntry];
}

export const customerOperationsDemoProfile: ProductStageDemoProfile = {
  nodes: productStageNodes,
  graphEdges: standardSixNodeWorkflowEdges,
  toolCallsByStep,
  timelineLabels,
  approvalStepIndex: 4,
  workflowTitle: "Customer onboarding",
  runCompleteMessage: "Run finished — onboarding launched for the new customer.",
  runRejectedMessage: "Plan rejected — the run was routed to exception handling.",
  approvalWaitingDetail: "Assigned to Jordan Lee · plan ready for review",
  createInitialRunContext,
  createDemoEvents,
  runContextAfterStep,
  timelineDetailForStep,
};
