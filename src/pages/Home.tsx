import { useMemo } from "react";
import { homeContent, selectHeroVariant } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { UseCasesSection } from "../components/sections/UseCasesSection";
import { MetricsSection } from "../components/sections/MetricsSection";

function getScenarioFromLocation() {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return params.get("scenario") ?? undefined;
}

export const HomePage = () => {
  const scenario = useMemo(() => getScenarioFromLocation(), []);
  const heroVariant = selectHeroVariant(homeContent, scenario);

  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page" id="top">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <HeroSection variant={heroVariant} />
        <FeaturesSection heading={homeContent.featuresHeading} features={homeContent.features} />
        <UseCasesSection heading={homeContent.useCasesHeading} useCases={homeContent.useCases} />
        <section className="collaboration-band">
          <div className="image-overlay" />
          <div className="shell collaboration-inner">
            <div className="collaboration-header">
              <h2 className="section-title">Human-AI collaboration</h2>
              <p className="section-subtitle">
                Friendly AI agents that work alongside humans: approvals, transparency, and adaptive learning baked in.
              </p>
            </div>
            <div className="collaboration-grid">
              {[
                "Intuitive interfaces",
                "Transparent decisions",
                "Human oversight",
                "Adaptive learning",
              ].map((item) => (
                <div key={item} className="collaboration-chip">
                  <span className="usecase-icon">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="cta-actions">
              <a className="primary-button giant" href="/features">
                Learn more
              </a>
            </div>
          </div>
        </section>
        <section className="testimonials">
          <div className="shell">
            <div className="testimonials-header">
              <h2 className="section-title">Trusted by engineering teams</h2>
              <p className="section-subtitle">What teams say about shipping with AgentRuntime</p>
            </div>
            <div className="testimonials-grid">
              {(homeContent.testimonials ?? []).map((item, idx) => (
                <article key={`${item.author}-${idx}`} className="testimonial-card">
                  <div className="quote-mark">“</div>
                  <p className="quote">{item.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">AR</div>
                    <div>
                      <div className="author-name">{item.author}</div>
                      {item.role ? <div className="author-role">{item.role}</div> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {homeContent.finalCta ? (
          <section className="final-cta">
            <div className="image-overlay" />
            <div className="shell final-cta-card">
              {homeContent.finalCta.icon ? (
                <div className="final-cta-icon">{homeContent.finalCta.icon}</div>
              ) : null}
              <h2 className="section-title">{homeContent.finalCta.title}</h2>
              {homeContent.finalCta.subtitle ? (
                <p className="section-subtitle">{homeContent.finalCta.subtitle}</p>
              ) : null}
              <div className="cta-actions">
                <a className="primary-button giant" href={homeContent.finalCta.primaryCtaUrl}>
                  {homeContent.finalCta.primaryCtaLabel}
                </a>
                {homeContent.finalCta.secondaryCtaLabel && homeContent.finalCta.secondaryCtaUrl ? (
                  <a className="ghost-button giant" href={homeContent.finalCta.secondaryCtaUrl}>
                    {homeContent.finalCta.secondaryCtaLabel}
                  </a>
                ) : null}
              </div>
              {homeContent.finalCta.footnote ? (
                <p className="final-cta-footnote">{homeContent.finalCta.footnote}</p>
              ) : null}
            </div>
          </section>
        ) : null}
        <MetricsSection heading={homeContent.metricsHeading} metrics={homeContent.metrics} />
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

