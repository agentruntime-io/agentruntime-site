import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { homeContent } from "../content";

const featureDetails = [
  {
    title: "Agent registration",
    description:
      "Import agents via API, Swagger, or manual form. Automatic schema extraction, dependency mapping, and validation.",
    points: ["Swagger/OpenAPI import", "Schema linting", "Dependency resolution", "Versioning & rollback"],
  },
  {
    title: "Simulation & compile",
    description:
      "Pre-flight checks, dry-runs, and dependency analysis before production. Catch errors early with structured testing.",
    points: ["Dry-run validation", "Flow simulation", "Pre-flight checks", "Safety rails"],
  },
  {
    title: "Runtime controls",
    description:
      "Programmatic triggers, pause/resume, controlled looping, parallel and nested runs with real-time monitoring.",
    points: ["Parallel execution", "Pause/resume", "Loop controls", "Run-time overrides"],
  },
  {
    title: "Observability",
    description:
      "Structured logs, traces, and run-level drilldowns. OpenTelemetry/Jaeger support with real-time dashboards.",
    points: ["Tracing & spans", "Structured logs", "Live dashboards", "Alerts & status"],
  },
  {
    title: "Security & tenancy",
    description:
      "RBAC, policy-as-code, circuit breakers, and tenant isolation. Built for enterprise deployments.",
    points: ["RBAC & audit", "Policy-as-code", "Circuit breakers", "Tenant isolation"],
  },
  {
    title: "Data handling",
    description:
      "Schema validation, encrypted transports, large payload refs. Safe, efficient data processing at scale.",
    points: ["Schema validation", "Encrypted transport", "Payload refs", "Retention controls"],
  },
];

export const FeaturesPage = () => {
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
            <h1 className="section-title">Features built for production AI</h1>
            <p className="section-subtitle">
              Register, test, and run supervised AI agents with policy-aware orchestration, deep observability, and
              enterprise-grade controls.
            </p>
            <div className="cta-actions">
              <a className="primary-button giant" href={consoleUrl}>
                Launch console
              </a>
              <a className="ghost-button giant" href={documentationUrl}>
                View docs
              </a>
            </div>
          </div>
        </section>

        <section className="feature-grid-section">
          <div className="shell">
            <div className="feature-grid-page">
              {featureDetails.map((item, idx) => (
                <article key={item.title} className="feature-card" style={{ animationDelay: `${idx * 80}ms` }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">Ready to explore the full API?</h2>
            <p className="section-subtitle">Dive into docs and ship your first supervised workflow in minutes.</p>
            <div className="cta-actions">
              <a className="primary-button giant" href={documentationUrl}>
                Explore API docs
              </a>
              <a className="ghost-button giant" href={consoleUrl}>
                Start free
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

