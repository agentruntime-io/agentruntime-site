import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/features", label: "Features" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/pricing", label: "Pricing" },
    { path: "/use-cases", label: "Use Cases" },
    { path: "/docs", label: "Documentation" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border dark:space-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo + Nav links grouped */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src="/agentruntime-logo.svg" alt="" className="h-8 w-auto dark:invert" aria-hidden="true" />
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

          {/* Desktop CTAs — pushed right */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <ThemeToggle />
              <Button variant="outline" size="sm" asChild className="dark:border-primary/50 dark:hover:bg-primary/10">
                <Link to="/docs">Docs</Link>
              </Button>
              <Button variant="hero" size="sm" className="dark:shadow-glow">
                Get Started Free
              </Button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-2 md:hidden ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="dark:hover:bg-primary/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border dark:space-grid">
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
                <Button variant="hero" size="sm" className="w-full dark:shadow-glow">
                  Get Started Free
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