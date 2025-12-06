import { homeContent, docsContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageSection } from "../components/layout/PageSection";

export const DocsPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <PageSection align="center">
          {docsContent.hero.badge ? <div className="hero-badge">{docsContent.hero.badge}</div> : null}
          <h1 className="section-title">{docsContent.hero.title}</h1>
          {docsContent.hero.subtitle ? <p className="section-subtitle">{docsContent.hero.subtitle}</p> : null}
        </PageSection>

        <PageSection>
          <h2 className="section-title">Quickstart</h2>
          <ol className="quickstart-list">
            {docsContent.quickstart.map((step, index) => (
              <li key={step}>
                <span className="hero-step-index">{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </PageSection>

        <PageSection variant="muted">
          <h2 className="section-title">SDKs & Tooling</h2>
          <div className="card-grid">
            {docsContent.sdks.map((sdk) => (
              <article key={sdk.name}>
                <h3>{sdk.name}</h3>
                <p>{sdk.description}</p>
                <a className="text-link" href={sdk.url}>
                  View docs
                </a>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <h2 className="section-title">Resources</h2>
          <div className="card-grid">
            {docsContent.resources.map((resource) => (
              <article key={resource.title}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a className="text-link" href={resource.url}>
                  Open resource
                </a>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection align="center">
          <div className="cta-card">
            <h2>{docsContent.cta.title}</h2>
            {docsContent.cta.subtitle ? <p>{docsContent.cta.subtitle}</p> : null}
            <div className="pricing-actions">
              <a className="primary-button giant" href={docsContent.cta.primaryCtaUrl}>
                {docsContent.cta.primaryCtaLabel}
              </a>
              {docsContent.cta.secondaryCtaLabel && docsContent.cta.secondaryCtaUrl ? (
                <a className="ghost-button giant" href={docsContent.cta.secondaryCtaUrl}>
                  {docsContent.cta.secondaryCtaLabel}
                </a>
              ) : null}
            </div>
          </div>
        </PageSection>
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


