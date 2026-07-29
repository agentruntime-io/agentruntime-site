import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CONSOLE_APP_URL, DOCS_APP_URL } from "@/config/site";

const navItems = [
  { path: "/platform", label: "Platform" },
  { path: "/workflows", label: "Workflows" },
  { path: "/developers", label: "Developers" },
  { path: "/enterprise", label: "Enterprise" },
  { path: "/company", label: "Company" },
] as const;

const externalProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

export function MarketingNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      className="marketing-nav-wrap"
      data-open={isOpen}
      data-scrolled={isScrolled}
    >
      <div className="marketing-container">
        <nav className="marketing-nav" aria-label="Primary navigation">
          <Link className="marketing-brand" to="/" aria-label="AgentRuntime home">
            <img src="/agentruntime-logo.svg" alt="" aria-hidden="true" />
            <span>AgentRuntime</span>
          </Link>

          <div className="marketing-nav-links">
            {navItems.map((item) => {
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
          {navItems.map((item) => (
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
