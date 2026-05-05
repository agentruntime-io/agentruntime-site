import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { featureFlags } from "@/config/featureFlags";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/blog") {
      return location.pathname === "/blog" || location.pathname.startsWith("/blog/");
    }
    return location.pathname === path;
  };

  const navItems = [
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/blog", label: "Blog" },
    ...(featureFlags.showAboutPage ? [{ path: "/about", label: "About" }] : []),
    { path: "/contact", label: "Contact" },
    // How It Works and Use Cases are accessible from within Features/Homepage — not needed in primary nav
  ];

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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary dark:hover:glow-text ${
                  isActive(item.path) ? "text-primary dark:glow-text" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            </div>
          </div>

          {/* Desktop CTAs - pushed right */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <ThemeToggle />
              <Button variant="outline" size="sm" asChild className="dark:border-primary/50 dark:hover:bg-primary/10">
                <Link to="/docs">Docs</Link>
              </Button>
              <Button variant="hero" size="sm" className="dark:shadow-glow" asChild>
                <Link to="/waitlist">Get Started Free</Link>
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
              {navItems.map((item) => (
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
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" asChild className="w-full dark:border-primary/50 dark:hover:bg-primary/10">
                  <Link to="/docs">Documentation</Link>
                </Button>
                <Button variant="hero" size="sm" className="w-full dark:shadow-glow" asChild>
                  <Link to="/waitlist">Get Started Free</Link>
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
