import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { homeContent } from "../content";

export const SecurityPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const controls = [
    "RBAC, SSO, and audit logging",
    "Encryption in transit and at rest",
    "Tenant isolation and policy-as-code",
    "Network controls and least-privilege access",
    "Backups, disaster recovery, and status transparency",
  ];

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="feature-hero">
          <div className="image-overlay" />
          <div className="shell feature-hero-inner">
            <h1 className="section-title">Security</h1>
            <p className="section-subtitle">
              Built for supervised, production AI—security and compliance at the core.
            </p>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <div className="feature-grid-page">
              {controls.map((item, idx) => (
                <article key={item} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{item}</h3>
                  <p>
                    We enforce strong identity, isolation, and monitoring to keep your workloads safe and auditable.
                  </p>
                </article>
              ))}
            </div>
            <div className="feature-cta-card" style={{ marginTop: "32px" }}>
              <h2 className="section-title">Report or inquire</h2>
              <p className="section-subtitle">
                For security questions, compliance reviews, or incident reports, contact {contactEmail}.
              </p>
              <div className="cta-actions">
                <a className="primary-button giant" href={`mailto:${contactEmail}`}>
                  Contact security
                </a>
                <a className="ghost-button giant" href={statusUrl}>
                  View status
                </a>
              </div>
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

