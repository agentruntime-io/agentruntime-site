import { Search } from "lucide-react";
import type { PublicConnector } from "@/api/connectors";

type MarketplaceCatalogToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  connectorFilter: string;
  onConnectorFilterChange: (value: string) => void;
  connectors: readonly PublicConnector[];
  searchLabel: string;
};

export function MarketplaceCatalogToolbar({
  query,
  onQueryChange,
  connectorFilter,
  onConnectorFilterChange,
  connectors,
  searchLabel,
}: MarketplaceCatalogToolbarProps) {
  return (
    <div className="marketing-integrations-toolbar marketing-marketplace-toolbar">
      <label className="marketing-integration-search">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">{searchLabel}</span>
        <input
          id="marketplace-search"
          type="search"
          placeholder={searchLabel}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <div className="marketing-marketplace-filter">
        <label className="marketing-marketplace-filter-label" htmlFor="marketplace-connector">
          Connector
        </label>
        <select
          id="marketplace-connector"
          className="marketing-marketplace-filter-select"
          value={connectorFilter}
          onChange={(event) => onConnectorFilterChange(event.target.value)}
        >
          <option value="">All connectors</option>
          {connectors.map((connector) => (
            <option key={connector.slug} value={connector.slug}>
              {connector.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
