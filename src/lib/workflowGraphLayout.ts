export type PortSide = "left" | "right" | "top" | "bottom";

export type WorkflowNodeLayout = {
  column: number;
  row: number;
  inputPort?: PortSide;
  outputPort?: PortSide;
};

export type WorkflowGraphLayout = {
  id: "fork-merge" | "linear";
  nodes: WorkflowNodeLayout[];
};

/** Canvas-style DAG: spine across the top, branch down, merge at the end. */
export const forkMergeSixNodeLayout: WorkflowGraphLayout = {
  id: "fork-merge",
  nodes: [
    { column: 1, row: 1, outputPort: "right" },
    { column: 2, row: 1, inputPort: "left", outputPort: "right" },
    { column: 3, row: 1, inputPort: "left", outputPort: "bottom" },
    { column: 2, row: 2, inputPort: "top", outputPort: "right" },
    { column: 3, row: 2, inputPort: "left", outputPort: "bottom" },
    { column: 3, row: 3, inputPort: "top" },
  ],
};

export function createLinearLayout(nodeCount: number): WorkflowGraphLayout {
  return {
    id: "linear",
    nodes: Array.from({ length: nodeCount }, (_, index) => ({
      column: (index % 3) + 1,
      row: Math.floor(index / 3) + 1,
      inputPort: index === 0 ? undefined : ("left" as const),
      outputPort: index === nodeCount - 1 ? undefined : ("right" as const),
    })),
  };
}

export function getWorkflowGraphLayout(nodeCount: number): WorkflowGraphLayout {
  if (nodeCount === 6) {
    return forkMergeSixNodeLayout;
  }

  return createLinearLayout(nodeCount);
}
