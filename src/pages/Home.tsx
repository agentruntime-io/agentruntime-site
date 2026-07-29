import { Link } from "react-router-dom";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { Seo } from "@/components/Seo";
import {
  ActionLink,
  CallToAction,
  Eyebrow,
  ProductStage,
} from "@/components/marketing/MarketingPrimitives";
import { seoCopy } from "@/seo/metadata";

const operationalProblems = [
  {
    number: "01",
    title: "AI stays isolated",
    description:
      "The assistant can answer questions, but cannot reliably participate in the systems where work happens.",
  },
  {
    number: "02",
    title: "Automation breaks at exceptions",
    description:
      "Rigid flows fail when judgment, missing data, a failed tool, or an unexpected situation appears.",
  },
  {
    number: "03",
    title: "Nobody can safely let go",
    description:
      "Without control, visibility, and ownership, every important action still returns to a person.",
  },
];

const executionModel = [
  {
    pill: "AI agents",
    title: "Interpret, reason, and create",
    description:
      "Use models where the work needs context, judgment, synthesis, or natural-language interaction.",
    dark: true,
  },
  {
    pill: "Tools + rules",
    title: "Execute with precision",
    description:
      "Call APIs and MCP tools while enforcing schemas, permissions, and deterministic business rules.",
  },
  {
    pill: "People",
    title: "Keep humans where they matter",
    description:
      "Pause for review, approvals, or exceptions and route the work to the exact responsible person.",
  },
];

export default function Home() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.home} canonicalPath="/" />
      <HomeJsonLd />

      <section className="marketing-hero">
        <div className="marketing-container">
          <Eyebrow>Infrastructure for production AI work</Eyebrow>
          <h1>Put AI inside the way your business actually runs.</h1>
          <p className="marketing-hero-copy">
            AgentRuntime connects your tools, business rules, agents, and people
            into reliable workflows that can operate for minutes, days, or
            continuously.
          </p>
          <div className="marketing-hero-actions">
            <ActionLink
              label="Start with one workflow →"
              to="/contact"
              variant="primary"
            />
            <ActionLink
              label="Explore the platform"
              to="/platform"
              variant="secondary"
            />
          </div>
          <p className="marketing-hero-note">
            Built for real operations — not isolated prompts or one-off demos.
          </p>
        </div>
      </section>

      <ProductStage />

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">The operational wall</div>
          <h2>Most AI projects stop exactly where real business begins.</h2>
          <p className="marketing-section-intro">
            A useful demo can call a model and return an answer. A production
            process must survive rules, approvals, failures, context changes,
            long-running work, and human responsibility.
          </p>
          <div className="marketing-ruled-grid" data-columns="3">
            {operationalProblems.map((problem) => (
              <article className="marketing-card" key={problem.number}>
                <div className="marketing-card-number">{problem.number}</div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">The execution model</div>
          <h2>Route every step to the right kind of intelligence.</h2>
          <p className="marketing-section-intro">
            One runtime carries context and state while agents, deterministic
            logic, connected software, and people each do the work they are best
            suited for.
          </p>
          <div className="marketing-grid-3">
            {executionModel.map((item) => (
              <article
                className="marketing-card"
                data-compact="true"
                data-tone={item.dark ? "dark" : undefined}
                key={item.title}
              >
                <span className="marketing-pill">{item.pill}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-statement">
        <div className="marketing-container">
          <h2>
            The goal is not to remove people from the process.{" "}
            <span>
              It is to remove people from every step that no longer needs them.
            </span>
          </h2>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">
            One platform, two entry points
          </div>
          <h2>
            Adopt AgentRuntime from the workflow or from the infrastructure.
          </h2>
          <div className="marketing-grid-2">
            <article className="marketing-card" data-compact="true">
              <span className="marketing-pill">For operations</span>
              <h3>Start with a real process</h3>
              <p>
                Map one process across systems, decisions, and owners. Introduce
                AI step by step without rebuilding the business around a chatbot.
              </p>
              <Link
                className="marketing-button marketing-button-secondary"
                to="/workflows"
              >
                Explore workflows →
              </Link>
            </article>
            <article
              className="marketing-card"
              data-compact="true"
              data-tone="dark"
            >
              <span className="marketing-pill">For builders</span>
              <h3>Build on a production runtime</h3>
              <p>
                Use APIs, webhooks, schedules, tools, and observable execution
                instead of assembling the control plane around every agent
                yourself.
              </p>
              <Link
                className="marketing-button marketing-button-ghost-dark"
                to="/developers"
              >
                Explore developers →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CallToAction
        tone="soft"
        title="Start with one workflow that matters."
        description="Show us a process that crosses tools, people, and decisions. We will map where agents, rules, and human judgment belong."
        primary={{ label: "Book a conversation →", to: "/contact" }}
        secondary={{ label: "See the runtime", to: "/platform" }}
      />
    </div>
  );
}
