import { Navigate, useParams } from "react-router-dom";
import { IntegrationDetailPage } from "@/components/marketing/IntegrationDetailPage";
import { getIntegrationContent } from "@/lib/integrationContent";
import {
  findPublicConnector,
  usePublicConnectors,
} from "@/hooks/usePublicConnectors";
import {
  usePublicAgentPackages,
  usePublicWorkflowPackages,
} from "@/hooks/usePublicMarketplace";
import type { Integration } from "@/lib/marketingCatalog";

export default function IntegrationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: connectors = [], isLoading, isError } = usePublicConnectors();
  const connector = findPublicConnector(connectors, slug);
  const { data: exampleWorkflows = [], isLoading: workflowsLoading } =
    usePublicWorkflowPackages(slug);
  const { data: exampleAgents = [], isLoading: agentsLoading } =
    usePublicAgentPackages(slug);

  if (isLoading) {
    return (
      <div className="marketing-page">
        <div className="marketing-container marketing-integration-empty">
          <strong>Loading connector details...</strong>
        </div>
      </div>
    );
  }

  if (isError || !connector) {
    return <Navigate to="/integrations" replace />;
  }

  const content = getIntegrationContent(connector.slug);
  const relatedSlugs =
    content?.relatedConnectorSlugs ??
    connectors
      .filter((item) => item.slug !== connector.slug)
      .slice(0, 4)
      .map((item) => item.slug);

  const related: Integration[] = relatedSlugs.flatMap((relatedSlug) => {
    const match = findPublicConnector(connectors, relatedSlug);
    if (!match) {
      return [];
    }
    return [
      {
        slug: match.slug,
        name: match.name,
        category: content?.category ?? "Productivity",
      },
    ];
  });

  return (
    <IntegrationDetailPage
      connector={connector}
      related={related}
      exampleWorkflows={exampleWorkflows}
      workflowsLoading={workflowsLoading}
      exampleAgents={exampleAgents}
      agentsLoading={agentsLoading}
    />
  );
}
