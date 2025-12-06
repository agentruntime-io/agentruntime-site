import { FC } from "react";

interface FooterProps {
  documentationUrl: string;
  consoleUrl: string;
  statusUrl: string;
  contactEmail: string;
  footerCopy?: string;
}

export const Footer: FC<FooterProps> = ({
  documentationUrl,
  consoleUrl,
  statusUrl,
  contactEmail,
  footerCopy,
}) => {
  const domain = contactEmail.split("@")[1] ?? "agentruntime.io";

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
              <div className="brand mark-only">
                <img className="brand-mark-img" src="/brand/mark-512.png" alt="AgentRuntime mark" />
              </div>
          <p className="footer-copy">
            {footerCopy ??
              "AgentRuntime gives teams a production-ready foundation for orchestrating AI-first operations."}
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="/features">Platform</a>
            <a href="/use-cases">Use cases</a>
            <a href="/how-it-works">Architecture</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href={`mailto:careers@${domain}`}>Careers</a>
            <a href={`mailto:press@${domain}`}>Press</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href={documentationUrl} target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a href={statusUrl} target="_blank" rel="noreferrer">
              Status
            </a>
            <a href={consoleUrl}>Console</a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} AgentRuntime. All rights reserved.</span>
        <span className="footer-bottom-links">
          <a href="/privacy">Privacy</a>
          <a href="/security">Security</a>
          <a href="/terms">Terms</a>
        </span>
      </div>
    </footer>
  );
};

