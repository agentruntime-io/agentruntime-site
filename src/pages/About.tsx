import { homeContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const values = [
  { title: "Openness", description: "Transparent development, open APIs, and collaborative ecosystem." },
  { title: "Reliability", description: "Enterprise-grade uptime, policy controls, and observability by default." },
  { title: "Innovation", description: "Constantly pushing AI orchestration and supervision forward." },
];

const milestones = [
  { label: "Founded", value: "2023" },
  { label: "Companies", value: "500+" },
  { label: "Agent runs", value: "1M+" },
  { label: "Uptime", value: "99.9%" },
];

export const AboutPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="about-hero">
          <div className="image-overlay" />
          <div className="shell about-hero-inner">
            <h1 className="section-title">About AgentRuntime</h1>
            <p className="section-subtitle">
              We build the supervised AI operations layer: policy-aware orchestration, human-in-the-loop controls, and
              production observability for agent workflows.
            </p>
          </div>
        </section>

        <section className="about-story">
          <div className="shell">
            <div className="story-grid">
              <div className="story-copy">
                <h2>Our mission</h2>
                <p>
                  Empower developers to orchestrate AI agents with confidence and scale. Production safety, reliability,
                  and enterprise rollout are at the core of everything we build.
                </p>
                <p>
                  Born from shipping AI in production, we focus on the tools teams need to make supervised AI a reality:
                  policy enforcement, observability, and human oversight.
                </p>
              </div>
              <div className="story-stats">
                {milestones.map((m) => (
                  <div key={m.label} className="stat-block">
                    <div className="stat-value">{m.value}</div>
                    <div className="stat-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="shell">
            <h2 className="section-title">Our values</h2>
            <div className="values-grid">
              {values.map((v) => (
                <article key={v.title} className="value-card">
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">Join the journey</h2>
            <p className="section-subtitle">We’re hiring builders who care about safe, production AI.</p>
            <div className="cta-actions">
              <a className="primary-button giant" href={`mailto:${contactEmail}`}>
                Contact us
              </a>
              <a className="ghost-button giant" href={consoleUrl}>
                Launch console
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

