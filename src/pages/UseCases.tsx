import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { homeContent } from "../content";

const detailedUseCases = [
  {
    title: "Customer support automation",
    description:
      "Auto-route customer conversations with KB-enriched responses and supervisor checkpoints.",
    impact: "75% faster response times, 90% CSAT",
    bullets: ["KB integration", "Sentiment-aware routing", "Supervisor approvals", "Escalation workflows"],
  },
  {
    title: "IoT & robotics orchestration",
    description: "Coordinate sensors and command sequences across fleets with failover handling.",
    impact: "40% downtime reduction, 3x faster deployment",
    bullets: ["Device coordination", "Health checks", "Failover & retries", "Remote diagnostics"],
  },
  {
    title: "Data processing pipelines",
    description: "Schema-validated ETL with resilient retries and quality checks baked in.",
    impact: "85% fewer pipeline failures, 50% faster processing",
    bullets: ["Schema validation", "Error handling", "Auto retries", "Data quality checks"],
  },
  {
    title: "AI-driven workflows",
    description: "Dynamic decision trees blending LLMs and business logic with human oversight.",
    impact: "60% fewer manual reviews, 4x process speed",
    bullets: ["Decision trees", "Context adaptation", "Human-in-loop", "Audit trails"],
  },
];

export const UseCasesPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="usecases-hero">
          <div className="image-overlay" />
          <div className="shell usecases-hero-inner">
            <h1 className="section-title">Real-world use cases</h1>
            <p className="section-subtitle">
              Proven patterns across support, IoT, data pipelines, and AI decisioning—all with guardrails and
              supervision baked in.
            </p>
            <div className="cta-actions">
              <a className="primary-button giant" href="/pricing">
                Start free
              </a>
              <a className="ghost-button giant" href={documentationUrl}>
                See docs
              </a>
            </div>
          </div>
        </section>

        <section className="usecases-grid">
          <div className="shell">
            <div className="detailed-usecases">
              {detailedUseCases.map((item, idx) => (
                <article key={item.title} className="usecase-card" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="usecase-meta">
                    <span className="badge">Industry solution</span>
                    <span className="impact">{item.impact}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="usecases-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">Ready to launch a pilot?</h2>
            <p className="section-subtitle">
              Talk to us about supervised workflows tailored to your stack and SLAs.
            </p>
            <div className="cta-actions">
              <a className="primary-button giant" href={consoleUrl}>
                Start free trial
              </a>
              <a className="ghost-button giant" href={`mailto:${contactEmail}`}>
                Talk to sales
              </a>
            </div>
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


