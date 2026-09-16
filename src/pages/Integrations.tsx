import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { getIntegrationContent } from "@/lib/integrationContent";
import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import { getIntegrationMark } from "@/lib/marketingCatalog";
import {
  MarketingLoadingCount,
  MarketingLoadingGraphic,
} from "@/components/marketing/MarketingLoadingGraphic";
import { usePublicConnectors } from "@/hooks/usePublicConnectors";
import type { PublicConnector } from "@/api/connectors";
import { seoCopy } from "@/seo/metadata";

function IntegrationConnectorGrid({
  connectors,
}: {
  connectors: readonly PublicConnector[];
}) {
  return (
    <div className="marketing-integration-grid">
      {connectors.map((connector) => {
        const content = getIntegrationContent(connector.slug);
        const logoPath =
          content?.logoPath ??
          connector.icon_url ??
          getIntegrationLogoPath(connector.slug);
        const isComposio = connector.source === "composio";

        return (
          <Link
            className="marketing-integration-card"
            to={`/integrations/${connector.slug}`}
            aria-label={`View ${connector.name} integration details`}
            key={connector.slug}
          >
            <span
              className="marketing-integration-mark"
              data-logo={logoPath ? "true" : undefined}
              aria-hidden="true"
            >
              {logoPath ? <img src={logoPath} alt="" /> : getIntegrationMark(connector.name)}
            </span>
            <div>
              <h3>{connector.name}</h3>
              <p>
                {connector.tool_count > 0
                  ? `${connector.tool_count} tools`
                  : "Platform connector"}
              </p>
            </div>
            <span
              className="marketing-integration-status"
              data-source={isComposio ? "composio" : undefined}
            >
              <i aria-hidden="true" />
              {content
                ? "Connector profile"
                : isComposio
                  ? "Composio catalog"
                  : "View details"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Integrations() {
  const [query, setQuery] = useState("");
  const { data: connectors = [], isLoading, isError } = usePublicConnectors();

  const filteredIntegrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return connectors.filter((connector) => {
      if (normalizedQuery.length === 0) {
        return true;
      }

      return (
        connector.name.toLowerCase().includes(normalizedQuery) ||
        connector.slug.toLowerCase().includes(normalizedQuery) ||
        (connector.description?.toLowerCase().includes(normalizedQuery) ?? false)
      );
    });
  }, [connectors, query]);

  const firstPartyConnectors = useMemo(
    () => filteredIntegrations.filter((connector) => connector.source !== "composio"),
    [filteredIntegrations],
  );
  const composioConnectors = useMemo(
    () => filteredIntegrations.filter((connector) => connector.source === "composio"),
    [filteredIntegrations],
  );

  const integrationCount = connectors.length;
  const firstPartyCount = connectors.filter((connector) => connector.source !== "composio").length;
  const composioCount = connectors.length - firstPartyCount;

  return (
    <div className="marketing-page">
      <Seo {...seoCopy.integrations} canonicalPath="/integrations" />
      <PageHero
        centered
        eyebrow={
          isError || isLoading
            ? "Connector catalog"
            : `${integrationCount} catalogued connectors`
        }
        title="Connect the systems where the work already happens."
        description="Bring communication, data, developer tools, business software, and model services into governed AgentRuntime workflows."
        primary={{ label: "Discuss an integration →", to: "/contact" }}
        secondary={{ label: "Explore developer model", to: "/developers" }}
      />

      <section
        className="marketing-section marketing-integrations-section"
        data-flush-top="true"
      >
        <div className="marketing-container">
          <div className="marketing-integration-directory-head">
            <div>
              <div className="marketing-section-label">Connector directory</div>
              <h2>Find the systems your workflow needs.</h2>
            </div>
            <p>
              AgentRuntime first-party connectors are listed first, followed by
              Composio-backed catalog entries published to the platform. Tool
              lists on each page come from the committed platform catalog.
            </p>
          </div>

          <div className="marketing-integrations-toolbar">
            <label className="marketing-integration-search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search integrations</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or slug"
              />
            </label>
          </div>

          <div className="marketing-integration-results" aria-live="polite">
            <span>
              {isLoading ? (
                <MarketingLoadingCount />
              ) : (
                `${filteredIntegrations.length} ${
                  filteredIntegrations.length === 1 ? "connector" : "connectors"
                }`
              )}
            </span>
            {query && (
              <button type="button" onClick={() => setQuery("")}>
                Clear search
              </button>
            )}
          </div>

          {isError ? (
            <div className="marketing-integration-empty">
              <strong>Connector catalog is temporarily unavailable.</strong>
              <p>Refresh the page or contact us if you need a specific system.</p>
            </div>
          ) : isLoading ? (
            <MarketingLoadingGraphic variant="integrations" />
          ) : filteredIntegrations.length > 0 ? (
            <>
              {firstPartyConnectors.length > 0 ? (
                <div className="marketing-integration-catalog-section">
                  <div className="marketing-integration-catalog-head">
                    <h3>AgentRuntime connectors</h3>
                    <p>{firstPartyCount} first-party integrations in the platform catalog.</p>
                  </div>
                  <IntegrationConnectorGrid connectors={firstPartyConnectors} />
                </div>
              ) : null}

              {composioConnectors.length > 0 ? (
                <div className="marketing-integration-catalog-section" data-tone="soft">
                  <div className="marketing-integration-catalog-head">
                    <h3>Composio catalog</h3>
                    <p>
                      {composioCount} Composio-backed integrations published to the
                      platform catalog.
                    </p>
                  </div>
                  <IntegrationConnectorGrid connectors={composioConnectors} />
                </div>
              ) : null}
            </>
          ) : (
            <div className="marketing-integration-empty">
              <strong>No connector matches that search.</strong>
              <p>Clear the search or tell us which system your workflow needs.</p>
            </div>
          )}
        </div>
      </section>

      <CallToAction
        tone="dark"
        title="Do not see the system your workflow depends on?"
        description="AgentRuntime also supports custom MCP servers and internal APIs. Bring us the system, the actions, and the access boundary."
        primary={{ label: "Request an integration →", to: "/contact" }}
        secondary={{ label: "Developer overview", to: "/developers" }}
      />
    </div>
  );
}
