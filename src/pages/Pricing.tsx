import { homeContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const plans = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    description: "For individuals and small projects.",
    features: ["5 agents", "100 runs/month", "Community support", "Basic analytics", "API access"],
    highlight: false,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For growing teams in production.",
    features: ["25 agents", "10,000 runs/month", "Email support", "Advanced analytics", "Custom webhooks", "Team collaboration"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For advanced security and scale.",
    features: ["Unlimited agents & runs", "Dedicated manager", "SLA & priority support", "Custom integrations", "SSO & audit logs"],
    highlight: false,
  },
];

const faq = [
  {
    q: "Can I change plans anytime?",
    a: "Yes. Upgrades/downgrades take effect immediately with pro-rated billing.",
  },
  {
    q: "What if I exceed plan limits?",
    a: "We notify you before limits; you can upgrade or add capacity to avoid interruption.",
  },
  {
    q: "Do you offer on-prem or VPC isolation?",
    a: "Enterprise plans support custom deployment models and network isolation.",
  },
];

export const PricingPage = () => {
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
            <h1 className="section-title">Simple, transparent pricing</h1>
            <p className="section-subtitle">Start free, scale with usage. Every plan includes API access and status alerts.</p>
            <div className="cta-actions">
              <a className="primary-button giant" href={consoleUrl}>Start free</a>
              <a className="ghost-button giant" href={`mailto:${contactEmail}`}>Talk to sales</a>
            </div>
          </div>
        </section>

        <section className="pricing-grid-section">
          <div className="shell pricing-grid">
            {plans.map((plan, idx) => (
              <article
                key={plan.name}
                className={`pricing-card-page ${plan.highlight ? "popular" : ""}`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {plan.highlight ? <div className="badge-popular">Most popular</div> : null}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="pricing-price">
                    <span className="amount">{plan.price}</span>
                    {plan.period ? <span className="period">{plan.period}</span> : null}
                  </div>
                  <p>{plan.description}</p>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <a className={plan.highlight ? "primary-button giant" : "ghost-button giant"} href={consoleUrl}>
                  {plan.highlight ? "Start Team trial" : "Choose plan"}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-include">
          <div className="shell feature-cta-card">
            <h2 className="section-title">All plans include</h2>
            <div className="pricing-include-grid">
              <div>API access</div>
              <div>Versioning & rollback</div>
              <div>24/7 status alerts</div>
              <div>Audit-friendly logs</div>
              <div>Policy enforcement</div>
              <div>Supervisor checkpoints</div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="shell">
            <h2 className="section-title">FAQ</h2>
            <div className="faq-grid">
              {faq.map((item) => (
                <article key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">Need a custom plan?</h2>
            <p className="section-subtitle">We’ll tailor pricing, deployment, and support to your stack and SLAs.</p>
            <div className="cta-actions">
              <a className="primary-button giant" href={`mailto:${contactEmail}`}>Contact sales</a>
              <a className="ghost-button giant" href={documentationUrl}>View docs</a>
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

