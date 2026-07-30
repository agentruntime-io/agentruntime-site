import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CONSOLE_APP_URL, DOCS_APP_URL } from "@/config/site";
import {
  productSurfaces,
  solutionAudiences,
  workflowSolutions,
} from "@/lib/marketingCatalog";

const directNavItems = [
  { path: "/integrations", label: "Integrations" },
  { path: "/developers", label: "Developers" },
  { path: "/enterprise", label: "Enterprise" },
] as const;

const externalProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

type OpenMenu = "product" | "solutions" | null;

export function MarketingNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen && !openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setOpenMenu(null);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (
        openMenu &&
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen, openMenu]);

  const isProductActive = location.pathname === "/platform";
  const isSolutionsActive = location.pathname === "/solutions";

  return (
    <header
      className="marketing-nav-wrap"
      data-open={isOpen || Boolean(openMenu)}
      data-scrolled={isScrolled}
    >
      <div className="marketing-container" ref={navigationRef}>
        <nav className="marketing-nav" aria-label="Primary navigation">
          <Link className="marketing-brand" to="/" aria-label="AgentRuntime home">
            <img src="/agentruntime-logo.svg" alt="" aria-hidden="true" />
            <span>AgentRuntime</span>
          </Link>

          <div className="marketing-nav-links">
            <div className="marketing-nav-group">
              <button
                className="marketing-nav-link marketing-nav-trigger"
                type="button"
                data-active={isProductActive}
                aria-expanded={openMenu === "product"}
                aria-controls="marketing-product-menu"
                onClick={() =>
                  setOpenMenu((current) =>
                    current === "product" ? null : "product",
                  )
                }
              >
                Product
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div
                className="marketing-nav-dropdown"
                id="marketing-product-menu"
                data-open={openMenu === "product"}
                data-kind="product"
              >
                <div className="marketing-nav-dropdown-head">
                  <div>
                    <span>Product</span>
                    <strong>One system for the full execution path.</strong>
                  </div>
                  <Link to="/platform">
                    Product overview <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="marketing-nav-product-grid">
                  {productSurfaces.map((surface) => (
                    <Link
                      to={`/platform#${surface.id}`}
                      key={surface.id}
                      onClick={() => setOpenMenu(null)}
                    >
                      <span>{surface.stage}</span>
                      <strong>{surface.title}</strong>
                      <small>{surface.description}</small>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="marketing-nav-group">
              <button
                className="marketing-nav-link marketing-nav-trigger"
                type="button"
                data-active={isSolutionsActive}
                aria-expanded={openMenu === "solutions"}
                aria-controls="marketing-solutions-menu"
                onClick={() =>
                  setOpenMenu((current) =>
                    current === "solutions" ? null : "solutions",
                  )
                }
              >
                Solutions
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div
                className="marketing-nav-dropdown"
                id="marketing-solutions-menu"
                data-open={openMenu === "solutions"}
                data-kind="solutions"
              >
                <div className="marketing-nav-dropdown-head">
                  <div>
                    <span>Solutions</span>
                    <strong>Start from the team or workflow you own.</strong>
                  </div>
                  <Link to="/solutions">
                    All solutions <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="marketing-nav-solution-columns">
                  <div>
                    <span className="marketing-nav-column-label">By team</span>
                    {solutionAudiences.map((audience) => (
                      <Link
                        to={`/solutions#${audience.id}`}
                        key={audience.id}
                        onClick={() => setOpenMenu(null)}
                      >
                        <strong>{audience.label}</strong>
                        <small>{audience.description}</small>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <span className="marketing-nav-column-label">
                      By workflow
                    </span>
                    {workflowSolutions.map((solution) => (
                      <Link
                        to={`/solutions#${solution.id}`}
                        key={solution.id}
                        onClick={() => setOpenMenu(null)}
                      >
                        <strong>{solution.label}</strong>
                        <small>{solution.description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {directNavItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  className="marketing-nav-link"
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="marketing-nav-actions">
            <a
              className="marketing-button marketing-button-secondary"
              href={CONSOLE_APP_URL}
              {...externalProps}
            >
              Open console
            </a>
            <Link
              className="marketing-button marketing-button-primary"
              to="/contact"
            >
              Book a conversation <span aria-hidden="true">→</span>
            </Link>
            <button
              className="marketing-menu-button"
              type="button"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
              aria-controls="marketing-mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <div
          className="marketing-mobile-menu"
          id="marketing-mobile-navigation"
          data-open={isOpen}
        >
          <details className="marketing-mobile-nav-group">
            <summary>
              Product <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div>
              <Link to="/platform">Product overview</Link>
              {productSurfaces.map((surface) => (
                <Link to={`/platform#${surface.id}`} key={surface.id}>
                  {surface.title}
                </Link>
              ))}
            </div>
          </details>
          <details className="marketing-mobile-nav-group">
            <summary>
              Solutions <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div>
              <Link to="/solutions">Solutions overview</Link>
              <span className="marketing-mobile-nav-label">By team</span>
              {solutionAudiences.map((audience) => (
                <Link to={`/solutions#${audience.id}`} key={audience.id}>
                  {audience.label}
                </Link>
              ))}
              <span className="marketing-mobile-nav-label">By workflow</span>
              {workflowSolutions.map((solution) => (
                <Link to={`/solutions#${solution.id}`} key={solution.id}>
                  {solution.label}
                </Link>
              ))}
            </div>
          </details>
          {directNavItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
          <Link to="/blog">Blog</Link>
          <a href={DOCS_APP_URL} {...externalProps}>
            Documentation ↗
          </a>
          <div className="marketing-mobile-actions">
            <a
              className="marketing-button marketing-button-secondary"
              href={CONSOLE_APP_URL}
              {...externalProps}
            >
              Open console
            </a>
            <Link
              className="marketing-button marketing-button-primary"
              to="/contact"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
