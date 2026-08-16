import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { getIntegrationDetail } from "@/lib/integrationDetails";
import { getIntegrationLogoPath } from "@/lib/integrationLogos";
import {
  getIntegrationMark,
  integrationCategories,
  integrationCount,
  integrations,
  type IntegrationCategory,
} from "@/lib/marketingCatalog";
import { seoCopy } from "@/seo/metadata";

type CategoryFilter = "All" | IntegrationCategory;

export default function Integrations() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All");

  const filteredIntegrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return integrations.filter((integration) => {
      const matchesCategory =
        activeCategory === "All" || integration.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        integration.name.toLowerCase().includes(normalizedQuery) ||
        integration.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="marketing-page">
      <Seo {...seoCopy.integrations} canonicalPath="/integrations" />
      <PageHero
        centered
        eyebrow={`${integrationCount} catalogued connectors`}
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
              Catalog coverage changes quickly. Confirm connector availability
              and deployment requirements with the team before production use.
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
                placeholder="Search by name or category"
              />
            </label>

            <div
              className="marketing-integration-filters"
              aria-label="Filter integrations by category"
            >
              {(["All", ...integrationCategories] as const).map((category) => (
                <button
                  type="button"
                  key={category}
                  data-active={activeCategory === category}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="marketing-integration-results" aria-live="polite">
            <span>
              {filteredIntegrations.length}{" "}
              {filteredIntegrations.length === 1 ? "connector" : "connectors"}
            </span>
            {(query || activeCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredIntegrations.length > 0 ? (
            <div className="marketing-integration-grid">
              {filteredIntegrations.map((integration) => {
                const detail = getIntegrationDetail(integration.slug);
                const logoPath =
                  detail?.logoPath ?? getIntegrationLogoPath(integration.slug);

                return (
                  <Link
                    className="marketing-integration-card"
                    to={`/integrations/${integration.slug}`}
                    aria-label={`View ${integration.name} integration details`}
                    key={integration.slug}
                  >
                    <span
                      className="marketing-integration-mark"
                      data-logo={logoPath ? "true" : undefined}
                      aria-hidden="true"
                    >
                      {logoPath ? (
                        <img src={logoPath} alt="" />
                      ) : (
                        getIntegrationMark(integration.name)
                      )}
                    </span>
                    <div>
                      <h3>{integration.name}</h3>
                      <p>{integration.category}</p>
                    </div>
                    <span className="marketing-integration-status">
                      <i aria-hidden="true" />
                      {detail ? "Connector profile" : "View details"}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="marketing-integration-empty">
              <strong>No connector matches those filters.</strong>
              <p>
                Clear the filters or tell us which system your workflow needs.
              </p>
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
