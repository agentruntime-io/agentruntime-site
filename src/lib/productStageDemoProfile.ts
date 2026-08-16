import type {
  DemoEvent,
  ProductStageNode,
  RunContextSnapshot,
  StepStatus,
  ToolCallDetail,
} from "@/lib/productStageDemo";
import type { WorkflowGraphEdge } from "@/lib/workflowGraphEdges";

export type ProductStageDemoProfile = {
  nodes: ProductStageNode[];
  graphEdges?: readonly WorkflowGraphEdge[];
  toolCallsByStep: Partial<Record<number, ToolCallDetail>>;
  timelineLabels: readonly string[];
  approvalStepIndex: number | null;
  workflowTitle: string;
  runCompleteMessage: string;
  runRejectedMessage: string;
  approvalWaitingDetail: string;
  createInitialRunContext: () => RunContextSnapshot;
  createDemoEvents: (
    stepIndex: number,
    action: "start" | "done" | "waiting" | "approved" | "rejected",
    elapsedMs: number,
    eventCount: number,
  ) => DemoEvent[];
  runContextAfterStep: (
    stepIndex: number,
    action: "start" | "done" | "waiting" | "approved" | "rejected",
    previous: RunContextSnapshot,
  ) => RunContextSnapshot;
  timelineDetailForStep: (stepIndex: number, status: StepStatus) => string;
};
