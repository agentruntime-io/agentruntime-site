import { Link, useLocation } from "react-router-dom";

const tabs = [
  { path: "/marketplace/workflows", label: "Workflows" },
  { path: "/marketplace/agents", label: "Agents" },
  { path: "/marketplace/bundles", label: "Bundles" },
] as const;

export function MarketplaceNav() {
  const location = useLocation();

  return (
    <nav className="marketing-marketplace-nav" aria-label="Marketplace sections">
      {tabs.map((tab) => {
        const active =
          location.pathname === tab.path ||
          location.pathname.startsWith(`${tab.path}/`);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            aria-current={active ? "page" : undefined}
            data-active={active ? "true" : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
