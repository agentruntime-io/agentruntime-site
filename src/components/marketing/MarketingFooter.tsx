import { Link } from "react-router-dom";
import { CONSOLE_APP_URL, DOCS_APP_URL } from "@/config/site";

const externalProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container">
        <div className="marketing-footer-grid">
          <div className="marketing-footer-brand">
            <Link className="marketing-brand" to="/" aria-label="AgentRuntime home">
              <img src="/agentruntime-logo.svg" alt="" aria-hidden="true" />
              <span>AgentRuntime</span>
            </Link>
            <p>
              Production infrastructure for AI workflows that cross agents,
              tools, business rules, and people.
            </p>
            <a
              className="marketing-footer-email"
              href="mailto:hello@agentruntime.io"
            >
              hello@agentruntime.io
            </a>
          </div>

          <div className="marketing-footer-column">
            <h4>Product</h4>
            <Link to="/platform">Product overview</Link>
            <Link to="/platform#workflow-studio">Workflow Studio</Link>
            <Link to="/platform#command-center">Command Center</Link>
            <Link to="/integrations">Integrations</Link>
            <Link to="/enterprise">Enterprise</Link>
          </div>

          <div className="marketing-footer-column">
            <h4>Solutions</h4>
            <Link to="/solutions">All solutions</Link>
            <Link to="/solutions#product-engineering">
              Product &amp; engineering
            </Link>
            <Link to="/solutions#operations">Operations</Link>
            <Link to="/solutions#customer-teams">Customer teams</Link>
            <Link to="/solutions#implementation-partners">
              Implementation partners
            </Link>
          </div>

          <div className="marketing-footer-column">
            <h4>Build</h4>
            <Link to="/developers">Developers</Link>
            <a href={DOCS_APP_URL} {...externalProps}>
              Documentation ↗
            </a>
            <Link to="/api-reference">API reference</Link>
          </div>

          <div className="marketing-footer-column">
            <h4>Company</h4>
            <Link to="/company">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <a href={CONSOLE_APP_URL} {...externalProps}>
              Open console ↗
            </a>
          </div>

          <div className="marketing-footer-column">
            <h4>Legal</h4>
            <Link to="/legal">Legal</Link>
            <Link to="/legal/privacy-policy">Privacy</Link>
            <Link to="/legal/terms-and-conditions">Terms</Link>
          </div>
        </div>

        <div className="marketing-footer-bottom">
          <span>© 2026 AgentRuntime Labs LLC</span>
          <span>Built for production AI work.</span>
        </div>
      </div>
    </footer>
  );
}
