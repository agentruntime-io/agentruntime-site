import { FC, useState } from "react";

interface HeaderProps {
  documentationUrl: string;
  consoleUrl: string;
}

const navLinks = [
  { label: "Platform", href: "/features" },
  { label: "Use cases", href: "/use-cases" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

export const Header: FC<HeaderProps> = ({ documentationUrl, consoleUrl }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell">
        <a className="brand" href="#top">
          <span className="brand-mark">AR</span>
          <span className="brand-name">AgentRuntime</span>
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="nav-links">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="ghost-button" href={documentationUrl} target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a className="primary-button" href={consoleUrl}>
              Launch Console
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

