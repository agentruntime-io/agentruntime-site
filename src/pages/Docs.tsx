import { homeContent, docsContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const quickLinks = [
  { title: "Changelog", description: "Latest updates and version history", url: docsContent.resources[0]?.url },
  { title: "Community Forum", description: "Get help from other developers", url: "https://community.agentruntime.io" },
  { title: "Glossary", description: "Key terms and definitions", url: docsContent.resources[0]?.url },
];

const tutorials = [
  "Build Your First Agent Pipeline",
  "Advanced Flow Branching",
  "Error Handling Best Practices",
  "Performance Optimization",
  "Multi-Tenant Setup",
  "Custom Integrations",
];

const glossaryTerms = [
  { term: "Agent", definition: "Autonomous component performing tasks within AgentRuntime." },
  { term: "MCP", definition: "Model Context Protocol for connecting AI models and agents." },
  { term: "Run ID", definition: "Unique identifier for each workflow/agent execution." },
  { term: "Context", definition: "Persistent state and memory maintained across runs." },
  { term: "Flow", definition: "Sequence of agent interactions and decision points." },
];

export const DocsPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="feature-hero">
          <div className="image-overlay" />
          <div className="shell feature-hero-inner">
            <h1 className="section-title">Documentation</h1>
            <p className="section-subtitle">
              Quickstarts, API reference, SDKs, and tutorials to ship supervised agents fast.
            </p>
            <div className="cta-actions">
              <a className="primary-button giant" href={documentationUrl}>Open docs</a>
              <a className="ghost-button giant" href={consoleUrl}>Launch console</a>
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">Quickstart</h2>
            <div className="docs-grid">
              {docsContent.quickstart.map((step, index) => (
                <article key={step} className="feature-card" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">SDKs & tooling</h2>
            <div className="feature-grid-page">
              {docsContent.sdks.map((sdk, idx) => (
                <article key={sdk.name} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{sdk.name}</h3>
                  <p>{sdk.description}</p>
                  <a className="text-link" href={sdk.url}>View docs</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">Resources</h2>
            <div className="feature-grid-page">
              {docsContent.resources.map((resource, idx) => (
                <article key={resource.title} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a className="text-link" href={resource.url}>Open resource</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">Popular tutorials</h2>
            <div className="feature-grid-page">
              {tutorials.map((title, idx) => (
                <article key={title} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{title}</h3>
                  <p>Step-by-step guides with code examples.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">Quick access</h2>
            <div className="feature-grid-page">
              {quickLinks.map((item, idx) => (
                <article key={item.title} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.url ? <a className="text-link" href={item.url}>Open</a> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <h2 className="section-title">Glossary</h2>
            <div className="feature-grid-page">
              {glossaryTerms.map((item, idx) => (
                <article key={item.term} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{item.term}</h3>
                  <p>{item.definition}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">{docsContent.cta.title}</h2>
            {docsContent.cta.subtitle ? <p className="section-subtitle">{docsContent.cta.subtitle}</p> : null}
            <div className="cta-actions">
              <a className="primary-button giant" href={docsContent.cta.primaryCtaUrl}>{docsContent.cta.primaryCtaLabel}</a>
              {docsContent.cta.secondaryCtaLabel && docsContent.cta.secondaryCtaUrl ? (
                <a className="ghost-button giant" href={docsContent.cta.secondaryCtaUrl}>{docsContent.cta.secondaryCtaLabel}</a>
              ) : null}
            </div>
            <p className="final-cta-footnote">Need help? Email {contactEmail} or open a ticket via the console.</p>
          </div>
        </section>
      </main>
      <Footer
        documentationUrl={documentationUrl}
        consoleUrl={consoleUrl}
        statusUrl={statusUrl}
        contactEmail={contactEmail}
        footerCopy={homeContent.footerCopy}
      />
    </div>
  );
};


