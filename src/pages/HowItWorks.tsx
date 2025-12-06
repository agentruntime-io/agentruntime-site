import { homeContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const steps = [
  {
    title: "Connect your agents",
    description:
      "Register via API or UI, fetch tool definitions automatically, and map dependencies with validation.",
    details: ["API/Swagger import", "Tool extraction", "Schema validation", "Dependency mapping"],
  },
  {
    title: "Configure & validate",
    description: "Run pre-flight checks, simulate flows, and ensure policies are enforced before deployment.",
    details: ["Pre-flight checks", "Flow simulation", "Policy gates", "Secrets & env setup"],
  },
  {
    title: "Execute & orchestrate",
    description: "Trigger workflows, parallelize steps, and manage pause/resume with real-time controls.",
    details: ["Parallel execution", "Pause/resume", "Loop controls", "Live overrides"],
  },
  {
    title: "Monitor & trace",
    description: "Structured logs and traces with drilldowns, live status, and mid-run edits.",
    details: ["Live status", "Tracing & spans", "Structured logs", "Mid-run edits"],
  },
  {
    title: "Analyze & optimize",
    description: "Spot bottlenecks, tune patterns, and measure cost/quality with dashboards and alerts.",
    details: ["Performance analytics", "Cost insights", "Pattern tuning", "Alerts"],
  },
];

const codeExample = `import agentruntime

client = agentruntime.Client(api_key="YOUR_KEY")

run = client.workflows.start(
    workflow_id="customer-support-v2",
    inputs={
        "customer_query": "Need help with billing",
        "priority": "high"
    },
    context={
        "session_id": "sess_123",
        "user_id": "user_456"
    }
)

for event in client.runs.stream(run.id):
    print(event.type, event.data)`;

export const HowItWorksPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="how-hero">
          <div className="shell">
            <h1 className="section-title">How it works</h1>
            <p className="section-subtitle">
              Five steps from registration to observability—with supervision and guardrails throughout.
            </p>
          </div>
        </section>

        <section className="how-steps">
          <div className="shell">
            {steps.map((step, idx) => (
              <div key={step.title} className={`how-step ${idx % 2 ? "reverse" : ""}`}>
                <div className="how-step-copy">
                  <div className="step-number">{String(idx + 1).padStart(2, "0")}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul>
                    {step.details.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="how-step-visual">
                  <div className="code-card">
                    <pre>
                      <code>{codeExample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-cta">
          <div className="shell feature-cta-card">
            <h2 className="section-title">Ready to see it live?</h2>
            <p className="section-subtitle">Try the sandbox or jump into the docs for SDK and API examples.</p>
            <div className="cta-actions">
              <a className="primary-button giant" href={consoleUrl}>
                Launch sandbox
              </a>
              <a className="ghost-button giant" href={documentationUrl}>
                Read the docs
              </a>
              <a className="ghost-button giant" href={`mailto:${contactEmail}`}>
                Talk to us
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

