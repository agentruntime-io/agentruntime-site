import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { featureFlags } from "@/config/featureFlags";
import { CONSOLE_APP_URL, DOCS_APP_URL } from "@/config/site";
import ThemeToggle from "./ThemeToggle";

type NavRouteItem = { kind: "route"; path: string; label: string };
type NavExternalItem = { kind: "external"; href: string; label: string };
type NavItem = NavRouteItem | NavExternalItem;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/blog") {
      return location.pathname === "/blog" || location.pathname.startsWith("/blog/");
    }
    return location.pathname === path;
  };

  /** Primary navigation */
  const navItems: NavItem[] = [
    { kind: "route", path: "/features", label: "Features" },
    { kind: "route", path: "/how-it-works", label: "How It Works" },
    { kind: "route", path: "/pricing", label: "Pricing" },
    { kind: "route", path: "/use-cases", label: "Use Cases" },
    { kind: "external", href: DOCS_APP_URL, label: "Documentation" },
    { kind: "route", path: "/blog", label: "Blog" },
    { kind: "route", path: "/contact", label: "Contact" },
    { kind: "external", href: CONSOLE_APP_URL, label: "Console" },
  ];

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors duration-200 hover:text-primary dark:hover:glow-text ${
      active ? "text-primary dark:glow-text" : "text-muted-foreground"
    }`;

  const externalNavProps = { target: "_blank" as const, rel: "noopener noreferrer" as const };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/80 dark:bg-white/60 dark:border-white/30 dark:space-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo + Nav links grouped */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/agentruntime-logo.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain dark:invert"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-foreground dark:glow-text">AgentRuntime</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.kind === "route" ? (
                  <Link key={item.path} to={item.path} className={navLinkClass(isActive(item.path))}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.href} href={item.href} className={navLinkClass(false)} {...externalNavProps}>
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Desktop CTAs - pushed right */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <ThemeToggle />
            <Button variant="hero" size="sm" className="dark:shadow-glow" asChild>
              {featureFlags.showWaitlist ? (
                <Link to="/waitlist">Get Started Free</Link>
              ) : (
                <a href={CONSOLE_APP_URL} {...externalNavProps}>
                  Get Started Free
                </a>
              )}
            </Button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-2 md:hidden ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="dark:hover:bg-primary/10 min-h-11 min-w-11"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-nav-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 border-t border-white/80 dark:bg-white/60 dark:border-white/30 dark:space-grid">
              {navItems.map((item) =>
                item.kind === "route" ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10 dark:glow-text dark:bg-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-muted dark:hover:bg-primary/10 dark:hover:glow-text"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 text-muted-foreground hover:text-primary hover:bg-muted dark:hover:bg-primary/10 dark:hover:glow-text"
                    {...externalNavProps}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="hero" size="sm" className="w-full dark:shadow-glow" asChild>
                  {featureFlags.showWaitlist ? (
                    <Link to="/waitlist" onClick={() => setIsOpen(false)}>
                      Get Started Free
                    </Link>
                  ) : (
                    <a href={CONSOLE_APP_URL} {...externalNavProps} onClick={() => setIsOpen(false)}>
                      Get Started Free
                    </a>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
