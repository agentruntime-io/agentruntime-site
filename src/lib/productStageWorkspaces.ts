import { customerOperationsDemoProfile } from "@/lib/productStageDemo";
import { connectedSupportDemoProfile } from "@/lib/productStageSupportDemo";
import { blueprintStepsToWorkflowNodes } from "@/lib/blueprintWorkflowVisual";
import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import type { ProductStageDemoProfile } from "@/lib/productStageDemoProfile";
import { getWorkflowBlueprint } from "@/lib/workflowBlueprints";
import { standardSixNodeWorkflowEdges } from "@/lib/workflowGraphEdges";

export type ProductStageWorkspaceId =
  | "customer-operations"
  | "finance"
  | "support";

export const defaultProductStageWorkspaceId: ProductStageWorkspaceId = "support";

export type ProductStageWorkspace = {
  id: ProductStageWorkspaceId;
  label: string;
  count: string;
  workflowTitle: string;
  blueprintSlug: string;
  demo: ProductStageDemoProfile | null;
  supportsLiveRun: boolean;
};

function previewToolCalls(slug: string) {
  if (slug === "finance-approvals") {
    return {
      0: {
        label: "Google Drive · Receipt uploaded",
        logo: getIntegrationLogoPath("google-drive"),
      },
      4: {
        label: "QuickBooks · Expense posted",
        logo: getIntegrationLogoPath("quickbooks"),
      },
      5: {
        label: "Gmail · Requester notified",
        logo: getIntegrationLogoPath("gmail"),
      },
    };
  }

  return {};
}

function financePreviewDemo(): ProductStageDemoProfile {
  const nodes = blueprintStepsToWorkflowNodes(
    getWorkflowBlueprint("finance-approvals")!.steps,
  );

  return {
    nodes,
    graphEdges: standardSixNodeWorkflowEdges,
    toolCallsByStep: previewToolCalls("finance-approvals"),
    timelineLabels: nodes.map((node) => node.title),
    approvalStepIndex: null,
    workflowTitle: "Expense review",
    runCompleteMessage: "",
    runRejectedMessage: "",
    approvalWaitingDetail: "",
    createInitialRunContext: () => ({
      runId: "—",
      workflow: "Expense review",
      workflowVersion: "v3",
      state: "idle",
      input: null,
      variables: {},
    }),
    createDemoEvents: () => [],
    runContextAfterStep: (_stepIndex, _action, previous) => previous,
    timelineDetailForStep: (stepIndex) => nodes[stepIndex]?.description ?? "",
  };
}

export const productStageWorkspaces: ProductStageWorkspace[] = [
  {
    id: "support",
    label: "Support",
    count: "12",
    workflowTitle: connectedSupportDemoProfile.workflowTitle,
    blueprintSlug: "connected-support",
    demo: connectedSupportDemoProfile,
    supportsLiveRun: true,
  },
  {
    id: "customer-operations",
    label: "Customer operations",
    count: "•••",
    workflowTitle: customerOperationsDemoProfile.workflowTitle,
    blueprintSlug: "customer-onboarding",
    demo: customerOperationsDemoProfile,
    supportsLiveRun: true,
  },
  {
    id: "finance",
    label: "Finance",
    count: "6",
    workflowTitle: "Expense review",
    blueprintSlug: "finance-approvals",
    demo: financePreviewDemo(),
    supportsLiveRun: false,
  },
];

export function getProductStageWorkspace(id: ProductStageWorkspaceId) {
  return productStageWorkspaces.find((workspace) => workspace.id === id)!;
}

export function createStepStatusesForWorkspace(workspace: ProductStageWorkspace) {
  const nodeCount = workspace.demo?.nodes.length ?? 0;
  return Array.from({ length: nodeCount }, () => "pending" as const);
}
