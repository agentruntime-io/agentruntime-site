import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { homeContent } from "../content";

export const TermsPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const items = [
    "Use of service is subject to acceptable use and export controls.",
    "Uptime targets and support levels follow the plan you choose.",
    "You retain ownership of your data; we process it to provide the service.",
    "Liability is limited; enterprise plans include SLAs and DPAs upon request.",
  ];

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="feature-hero">
          <div className="image-overlay" />
          <div className="shell feature-hero-inner">
            <h1 className="section-title">Terms of Service</h1>
            <p className="section-subtitle">
              Key terms governing use of AgentRuntime. For full legal text, contact us.
            </p>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <div className="feature-grid-page">
              {items.map((item, idx) => (
                <article key={item} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <div className="feature-cta-card" style={{ marginTop: "32px" }}>
              <h2 className="section-title">Need the full agreement?</h2>
              <p className="section-subtitle">Email {contactEmail} for the full legal terms or DPAs.</p>
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

