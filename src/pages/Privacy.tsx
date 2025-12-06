import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { homeContent } from "../content";

export const PrivacyPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const sections = [
    {
      title: "Data we collect",
      body:
        "Account details, usage telemetry, and support interactions to operate and improve the service. We do not train models on your runtime data.",
    },
    {
      title: "How we use data",
      body:
        "To provide the service, monitor reliability, secure accounts, and improve features. We do not sell or share data with third parties for advertising.",
    },
    {
      title: "Your controls",
      body:
        "Access/export, correction, deletion requests, and workspace-level data retention settings. Contact us for DSRs and compliance inquiries.",
    },
  ];

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="feature-hero">
          <div className="image-overlay" />
          <div className="shell feature-hero-inner">
            <h1 className="section-title">Privacy</h1>
            <p className="section-subtitle">
              How we handle your data and the controls you have over it.
            </p>
          </div>
        </section>

        <section className="docs-sections">
          <div className="shell">
            <div className="feature-grid-page">
              {sections.map((item, idx) => (
                <article key={item.title} className="feature-card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="feature-cta-card" style={{ marginTop: "32px" }}>
              <h2 className="section-title">Questions?</h2>
              <p className="section-subtitle">Reach us at {contactEmail} for privacy or compliance inquiries.</p>
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

