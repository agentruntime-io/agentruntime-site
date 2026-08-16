import { WorkflowGraph } from "@/components/marketing/WorkflowGraph";
import type {
  ProductStageNode,
  StepStatus,
  ToolCallDetail,
} from "@/lib/productStageDemo";
import type { WorkflowGraphEdge } from "@/lib/workflowGraphEdges";

type ProductStageWorkflowGraphProps = {
  nodes: readonly ProductStageNode[];
  stepStatuses: readonly StepStatus[];
  toolCallsByStep?: Partial<Record<number, ToolCallDetail>>;
  graphEdges?: readonly WorkflowGraphEdge[];
};

export function ProductStageWorkflowGraph({
  nodes,
  stepStatuses,
  toolCallsByStep = {},
  graphEdges,
}: ProductStageWorkflowGraphProps) {
  return (
    <WorkflowGraph
      nodes={nodes}
      stepStatuses={stepStatuses}
      toolCallsByStep={toolCallsByStep}
      edges={graphEdges}
      variant="demo"
    />
  );
}
