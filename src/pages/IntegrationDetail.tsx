import { Navigate, useParams } from "react-router-dom";
import { IntegrationDetailPage } from "@/components/marketing/IntegrationDetailPage";
import { MarketingLoadingGraphic } from "@/components/marketing/MarketingLoadingGraphic";
import { getIntegrationContent } from "@/lib/integrationContent";
import {
  findPublicConnector,
  usePublicConnectorDetail,
  usePublicConnectors,
} from "@/hooks/usePublicConnectors";
import {
  usePublicAgentPackages,
  usePublicWorkflowPackages,
} from "@/hooks/usePublicMarketplace";
import type { Integration } from "@/lib/marketingCatalog";

export default function IntegrationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: connector, isLoading, isError } = usePublicConnectorDetail(slug);
  const { data: connectors = [] } = usePublicConnectors();
  const { data: exampleWorkflows = [], isLoading: workflowsLoading } =
    usePublicWorkflowPackages(slug);
  const { data: exampleAgents = [], isLoading: agentsLoading } =
    usePublicAgentPackages(slug);

  if (isLoading) {
    return (
      <div className="marketing-page">
        <div className="marketing-container">
          <MarketingLoadingGraphic variant="detail" />
        </div>
      </div>
    );
  }

  if (isError || !connector) {
    return <Navigate to="/integrations" replace />;
  }

  const content = getIntegrationContent(connector.slug);
  const related: Integration[] = (content?.relatedConnectorSlugs ?? []).flatMap(
    (relatedSlug) => {
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
    },
  );

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
