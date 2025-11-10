import "./styles.css";

const navLinks = [
    {label: "Platform", href: "#platform"},
    {label: "Use cases", href: "#use-cases"},
    {label: "Architecture", href: "#architecture"},
    {label: "Pricing", href: "#pricing"},
    {label: "Docs", href: "#docs"},
];

const useCases = [
    {
        title: "Customer operations copilot",
        description:
            "Resolve tickets end-to-end with supervised agents that orchestrate LLMs, knowledge bases, and internal APIs.",
    },
    {
        title: "Developer productivity",
        description:
            "Automate incident response, runbooks, and release checklists with dependable multi-step flows.",
    },
    {
        title: "Data intelligence",
        description:
            "Compose data pipelines that fetch, validate, and narrate insights using governed, auditable agents.",
    },
];

const highlights = [
    {
        metric: "3.2M+",
        caption: "Agent executions scheduled through AgentRuntime each month.",
    },
    {
        metric: "99.95%",
        caption: "Uptime backed by regional failover and deterministic retries.",
    },
    {
        metric: "<112 ms",
        caption: "Average decision latency across supervised agent workflows.",
    },
];

function App() {
    return (
        <div className="page">
            <header className="site-header">
                <div className="shell">
                    <a className="brand" href="#">
                        <span className="brand-mark">AR</span>
                        <span className="brand-name">AgentRuntime</span>
                    </a>
                    <nav className="nav">
                        {navLinks.map(({label, href}) => (
                            <a key={label} href={href}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="nav-actions">
                        <a className="ghost-button" href="https://docs.agentruntime.io" target="_blank" rel="noreferrer">
                            Documentation
                        </a>
                        <a className="primary-button" href="/console">
                            Launch Console
                        </a>
                    </div>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="shell hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge">Launch faster • Operate safer • Scale confidently</div>
                            <h1 className="hero-title">
                                The control plane for reliable, multi-agent automation.
                            </h1>
                            <p className="hero-subtitle">
                                AgentRuntime lets you compose, supervise, and scale autonomous agents with enterprise
                                guardrails. Connect LLMs, APIs, humans-in-the-loop, and lineage tracking—without duct
                                tape.
                            </p>
                            <div className="hero-actions">
                                <a className="primary-button giant" href="#pricing">
                                    Book a demo
                                </a>
                                <a className="ghost-button giant" href="https://docs.agentruntime.io" target="_blank" rel="noreferrer">
                                    View documentation
                                </a>
                            </div>
                            <div className="hero-footnote">
                                Trusted by platform, ops, and AI teams delivering outcomes across finance, SaaS, and
                                modern commerce.
                            </div>
                        </div>
                        <div className="hero-card">
                            <div className="hero-card-header">
                                <span>Workflow timeline</span>
                                <span className="hero-chip">Supervised</span>
                            </div>
                            <ol className="hero-card-list">
                                <li>
                                    <span className="hero-step-index">01</span>
                                    <div>
                                        <h4>Intake and classification</h4>
                                        <p>Reason over incoming signals with chain-of-thought guardrails.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="hero-step-index">02</span>
                                    <div>
                                        <h4>Contextual grounding</h4>
                                        <p>Auto-fetch RAG, CRM, and knowledge graph context without brittle scripts.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="hero-step-index">03</span>
                                    <div>
                                        <h4>Decision + action orchestration</h4>
                                        <p>Route to API tools, human approval, or follow-up agents based on policy.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="hero-step-index">04</span>
                                    <div>
                                        <h4>Outcome evaluation</h4>
                                        <p>Score results, log lineage, and trigger rework or escalation automatically.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <section id="platform" className="section">
                    <div className="shell">
                        <h2 className="section-title">Ship production-grade agents without losing sleep.</h2>
                        <p className="section-subtitle">
                            AgentRuntime packages everything you need to design, deploy, and govern autonomous
                            workflows—no more piecing together schedulers, secrets, and ad-hoc monitors.
                        </p>

                        <div className="feature-grid">
                            <article>
                                <div className="feature-icon">01</div>
                                <h3>Visual composer + IaC bridge</h3>
                                <p>
                                    Drag and drop multi-agent flows or define them in code. Export infrastructure-as-code
                                    blueprints that keep prod environments reproducible.
                                </p>
                            </article>
                            <article>
                                <div className="feature-icon">02</div>
                                <h3>Policy-aware runtime</h3>
                                <p>
                                    Enforce compliance, data residency, and RBAC at every hop. Observability hooks give
                                    you full lineage, redaction, and replay controls.
                                </p>
                            </article>
                            <article>
                                <div className="feature-icon">03</div>
                                <h3>LLM + tool mesh</h3>
                                <p>
                                    Plug in any foundation model, structured tool, or SaaS service. Monitor success
                                    metrics and cost per run in a single pane.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="use-cases" className="section muted">
                    <div className="shell">
                        <h2 className="section-title">Where teams win with AgentRuntime</h2>
                        <div className="card-grid">
                            {useCases.map((item) => (
                                <article key={item.title}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <a href="#pricing" className="text-link">
                                        Explore playbook →
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="shell stats-grid">
                        {highlights.map((highlight) => (
                            <div key={highlight.metric} className="stat-card">
                                <div className="stat-metric">{highlight.metric}</div>
                                <p className="stat-caption">{highlight.caption}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="architecture" className="section muted">
                    <div className="shell architecture">
                        <div>
                            <h2 className="section-title">Reference architecture</h2>
                            <p className="section-subtitle">
                                Bring your agents, tools, and human reviews together on a resilient backbone. AgentRuntime
                                handles scheduling, retries, observability, and compliance so your team focuses on what
                                the agent should achieve—not how to keep it online.
                            </p>
                            <ul className="architecture-list">
                                <li>Multi-tenant context enforcement via the BFF and policy-as-code.</li>
                                <li>Workflows orchestrated by a battle-tested event bus with at-least-once delivery.</li>
                                <li>Realtime collaboration overlays for supervisors to approve, annotate, or reroute.</li>
                                <li>Pluggable evaluation loops (auto QA, human scoring, or synthetic monitors).</li>
                            </ul>
                        </div>
                        <div className="architecture-diagram">
                            <div className="diagram-panel">
                                <h4>Northbound interfaces</h4>
                                <p>Console · CLI · Terraform Provider · REST / Webhooks</p>
                            </div>
                            <div className="diagram-panel">
                                <h4>Control plane</h4>
                                <ul>
                                    <li>Tenant-aware BFF</li>
                                    <li>Workflow runtime</li>
                                    <li>Observation + tracing</li>
                                </ul>
                            </div>
                            <div className="diagram-panel">
                                <h4>Execution mesh</h4>
                                <ul>
                                    <li>LLM & Tool adapters</li>
                                    <li>Secrets + vault</li>
                                    <li>Safety & Guardrails</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="section">
                    <div className="shell pricing-card">
                        <div>
                            <h2>Simple tiers, transparent economics.</h2>
                            <p>
                                Start in minutes with a generous builder plan. Scale into dedicated control planes, custom
                                SLAs, and on-prem deployments when autonomy moves from experiment to mission critical.
                            </p>
                        </div>
                        <ul>
                            <li>
                                Builder — <strong>$0</strong> — 3 projects, shared runtime, community support.
                            </li>
                            <li>
                                Growth — <strong>$899/mo</strong> — 20 projects, granular RBAC, audit exports, SOC 2, priority support.
                            </li>
                            <li>
                                Enterprise — <strong>Custom</strong> — Dedicated VPC, hybrid/on-prem agent hosts, compliance add-ons.
                            </li>
                        </ul>
                        <div className="pricing-actions">
                            <a className="primary-button giant" href="mailto:hello@agentruntime.io">
                                Talk to sales
                            </a>
                            <a className="ghost-button giant" href="/console">
                                Launch console
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="shell footer-grid">
                    <div>
                        <div className="brand mark-only">AR</div>
                        <p className="footer-copy">
                            AgentRuntime gives teams a production-ready foundation for orchestrating AI-first operations.
                        </p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h4>Product</h4>
                            <a href="#platform">Platform</a>
                            <a href="#use-cases">Use cases</a>
                            <a href="#architecture">Architecture</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href="mailto:careers@agentruntime.io">Careers</a>
                            <a href="mailto:press@agentruntime.io">Press</a>
                            <a href="mailto:hello@agentruntime.io">Contact</a>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <a href="https://docs.agentruntime.io" target="_blank" rel="noreferrer">
                                Documentation
                            </a>
                            <a href="https://status.agentruntime.io" target="_blank" rel="noreferrer">
                                Status
                            </a>
                            <a href="/console">Console</a>
                        </div>
                    </div>
                </div>
                <div className="shell footer-bottom">
                    <span>© {new Date().getFullYear()} AgentRuntime. All rights reserved.</span>
                    <span className="footer-bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Security</a>
                        <a href="#">Terms</a>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default App;

