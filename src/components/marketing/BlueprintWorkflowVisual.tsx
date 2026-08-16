import { useMemo } from "react";
import { WorkflowGraph } from "@/components/marketing/WorkflowGraph";
import { blueprintStepsToWorkflowNodes } from "@/lib/blueprintWorkflowVisual";
import type { WorkflowBlueprint } from "@/lib/workflowBlueprints";
import { getBlueprintGraphEdges } from "@/lib/workflowGraphEdges";

type BlueprintWorkflowVisualProps = {
  blueprint: Pick<WorkflowBlueprint, "title" | "steps" | "slug">;
  compact?: boolean;
};

export function BlueprintWorkflowVisual({
  blueprint,
  compact = false,
}: BlueprintWorkflowVisualProps) {
  const nodes = useMemo(
    () => blueprintStepsToWorkflowNodes(blueprint.steps),
    [blueprint.steps],
  );
  const stepStatuses = useMemo(
    () => nodes.map(() => "pending" as const),
    [nodes],
  );
  const graphEdges = useMemo(
    () => getBlueprintGraphEdges(blueprint.slug, nodes.length),
    [blueprint.slug, nodes.length],
  );

  return (
    <figure
      className="marketing-blueprint-workflow-stage"
      data-compact={compact || undefined}
    >
      <figcaption className="sr-only">
        Visual workflow graph for {blueprint.title}
      </figcaption>
      <WorkflowGraph
        nodes={nodes}
        stepStatuses={stepStatuses}
        edges={graphEdges}
        variant="blueprint"
      />
    </figure>
  );
}
