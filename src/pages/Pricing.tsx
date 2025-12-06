import { homeContent, pricingContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PricingSection } from "../components/sections/PricingSection";
import { PageSection } from "../components/layout/PageSection";
import type { SectionHeading } from "../lib/types";

export const PricingPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const pricingHeading: SectionHeading = {
    title: pricingContent.hero.title,
    subtitle: pricingContent.hero.subtitle,
  };

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <PageSection align="center">
          {pricingContent.hero.badge ? (
            <div className="hero-badge">{pricingContent.hero.badge}</div>
          ) : null}
          <h1 className="section-title">{pricingContent.hero.title}</h1>
          {pricingContent.hero.subtitle ? (
            <p className="section-subtitle">{pricingContent.hero.subtitle}</p>
          ) : null}
        </PageSection>
        <PricingSection
          heading={pricingHeading}
          tiers={pricingContent.tiers}
          contactEmail={contactEmail}
          consoleUrl={consoleUrl}
        />
        <PageSection align="center">
          <div className="faq-grid">
            {pricingContent.faq.map((item, index) => (
              <article key={`${item.question}-${index}`}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </PageSection>
        <PageSection align="center">
          <div className="cta-card">
            <h2>{pricingContent.cta.title}</h2>
            {pricingContent.cta.subtitle ? <p>{pricingContent.cta.subtitle}</p> : null}
            <div className="pricing-actions">
              <a className="primary-button giant" href={pricingContent.cta.primaryCtaUrl}>
                {pricingContent.cta.primaryCtaLabel}
              </a>
              {pricingContent.cta.secondaryCtaLabel && pricingContent.cta.secondaryCtaUrl ? (
                <a className="ghost-button giant" href={pricingContent.cta.secondaryCtaUrl}>
                  {pricingContent.cta.secondaryCtaLabel}
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

