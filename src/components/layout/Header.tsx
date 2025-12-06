import { FC } from "react";

interface HeaderProps {
  documentationUrl: string;
  consoleUrl: string;
}

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "https://docs.agentruntime.io" },
];

export const Header: FC<HeaderProps> = ({ documentationUrl, consoleUrl }) => {
  return (
    <header className="site-header">
      <div className="shell">
        <a className="brand" href="#top">
          <span className="brand-mark">AR</span>
          <span className="brand-name">AgentRuntime</span>
        </a>
        <nav className="nav">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="ghost-button" href={documentationUrl} target="_blank" rel="noreferrer">
            Documentation
          </a>
          <a className="primary-button" href={consoleUrl}>
            Launch Console
          </a>
        </div>
      </div>
    </header>
  );
};

