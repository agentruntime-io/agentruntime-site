import type { PortSide } from "@/lib/workflowGraphLayout";

export type WorkflowGraphEdgeVariant = "primary" | "alternate";

export type WorkflowGraphEdge = {
  from: number;
  to: number;
  fromPort?: PortSide;
  toPort?: PortSide;
  variant?: WorkflowGraphEdgeVariant;
  label?: string;
};

export function createLinearWorkflowEdges(nodeCount: number): WorkflowGraphEdge[] {
  return Array.from({ length: Math.max(nodeCount - 1, 0) }, (_, index) => ({
    from: index,
    to: index + 1,
    fromPort: "right",
    toPort: "left",
  }));
}

/** Fork-merge canvas path used by the six-node hero workflows. */
export const standardSixNodeWorkflowEdges: WorkflowGraphEdge[] = [
  { from: 0, to: 1, fromPort: "right", toPort: "left" },
  { from: 1, to: 2, fromPort: "right", toPort: "left" },
  { from: 2, to: 3, fromPort: "bottom", toPort: "top" },
  { from: 3, to: 4, fromPort: "right", toPort: "left" },
  { from: 4, to: 5, fromPort: "bottom", toPort: "top" },
];

export const connectedSupportGraphEdges: WorkflowGraphEdge[] = [
  ...standardSixNodeWorkflowEdges,
  {
    from: 3,
    to: 5,
    fromPort: "bottom",
    toPort: "top",
    variant: "alternate",
    label: "Auto-close",
  },
];

const blueprintGraphEdgesBySlug: Partial<
  Record<string, readonly WorkflowGraphEdge[]>
> = {
  "connected-support": connectedSupportGraphEdges,
  "customer-onboarding": standardSixNodeWorkflowEdges,
  "finance-approvals": standardSixNodeWorkflowEdges,
  "support-operations": standardSixNodeWorkflowEdges,
};

export function getBlueprintGraphEdges(
  slug: string,
  nodeCount: number,
): WorkflowGraphEdge[] {
  const edges = blueprintGraphEdgesBySlug[slug];
  if (edges) {
    return [...edges];
  }

  if (nodeCount === 6) {
    return [...standardSixNodeWorkflowEdges];
  }

  return createLinearWorkflowEdges(nodeCount);
}
