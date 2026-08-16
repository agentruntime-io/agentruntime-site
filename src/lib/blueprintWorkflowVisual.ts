import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import type {
  ProductStageNode,
  ProductStageNodeKind,
} from "@/lib/productStageDemo";
import type { WorkflowBlueprintStep } from "@/lib/workflowBlueprints";

const kindByStepType: Record<
  WorkflowBlueprintStep["type"],
  ProductStageNodeKind | null
> = {
  Trigger: "trigger",
  Agent: "agent",
  Decision: "decision",
  Tool: "tool",
  Human: "approval",
  Outcome: null,
};

export function blueprintStepsToWorkflowNodes(
  steps: readonly WorkflowBlueprintStep[],
): ProductStageNode[] {
  return steps.flatMap((step) => {
    const kind = kindByStepType[step.type];
    if (!kind) return [];

    return [
      {
        kind,
        type: step.type === "Human" ? "Human approval" : step.type,
        title: step.title,
        description: step.description,
        integrationLogo: step.integrationSlug
          ? getIntegrationLogoPath(step.integrationSlug)
          : undefined,
        highlighted: step.type === "Human",
      },
    ];
  });
}
