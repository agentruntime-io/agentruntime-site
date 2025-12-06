import { homeContent, useCasesContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageSection } from "../components/layout/PageSection";

export const UseCasesPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <PageSection align="center">
          {useCasesContent.hero.badge ? <div className="hero-badge">{useCasesContent.hero.badge}</div> : null}
          <h1 className="section-title">{useCasesContent.hero.title}</h1>
          {useCasesContent.hero.subtitle ? (
            <p className="section-subtitle">{useCasesContent.hero.subtitle}</p>
          ) : null}
        </PageSection>

        {useCasesContent.sections.map((section, index) => (
          <PageSection key={section.id} variant={index % 2 === 1 ? "muted" : "default"}>
            <div className="usecase-section">
              <div>
                <h2 className="section-title">{section.title}</h2>
                {section.summary ? <p className="section-subtitle">{section.summary}</p> : null}
                <div className="usecase-list">
                  <h3>Pain points</h3>
                  <ul>
                    {section.painPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="usecase-list">
                  <h3>How AgentRuntime helps</h3>
                  <ul>
                    {section.solutions.map((solution) => (
                      <li key={solution}>{solution}</li>
                    ))}
                  </ul>
                </div>
                {section.ctaLabel && section.ctaUrl ? (
                  <a className="primary-button" href={section.ctaUrl}>
                    {section.ctaLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </PageSection>
        ))}

        <PageSection align="center">
          <div className="cta-card">
            <h2>{useCasesContent.cta.title}</h2>
            {useCasesContent.cta.subtitle ? <p>{useCasesContent.cta.subtitle}</p> : null}
            <div className="pricing-actions">
              <a className="primary-button giant" href={useCasesContent.cta.primaryCtaUrl}>
                {useCasesContent.cta.primaryCtaLabel}
              </a>
              {useCasesContent.cta.secondaryCtaLabel && useCasesContent.cta.secondaryCtaUrl ? (
                <a className="ghost-button giant" href={useCasesContent.cta.secondaryCtaUrl}>
                  {useCasesContent.cta.secondaryCtaLabel}
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


