import type { LandingPageContent } from "./types";

export const fallbackLandingPage: LandingPageContent = {
  slug: "main",
  locale: "en",
  heroVariants: [
    {
      scenario: "default",
      badge: "Launch faster • Operate safer • Scale confidently",
      title: "The control plane for reliable, multi-agent automation.",
      subtitle:
        "AgentRuntime lets you compose, supervise, and scale autonomous agents with enterprise guardrails. Connect LLMs, APIs, humans-in-the-loop, and lineage tracking—without duct tape.",
      footnote:
        "Trusted by platform, ops, and AI teams delivering outcomes across finance, SaaS, and modern commerce.",
      primaryCta: { label: "Book a demo", url: "#pricing" },
      secondaryCta: {
        label: "View documentation",
        url: "https://docs.agentruntime.io",
      },
      steps: [
        {
          title: "Intake and classification",
          description: "Reason over incoming signals with chain-of-thought guardrails.",
        },
        {
          title: "Contextual grounding",
          description: "Auto-fetch RAG, CRM, and knowledge graph context without brittle scripts.",
        },
        {
          title: "Decision + action orchestration",
          description: "Route to API tools, human approval, or follow-up agents based on policy.",
        },
        {
          title: "Outcome evaluation",
          description: "Score results, log lineage, and trigger rework or escalation automatically.",
        },
      ],
    },
  ],
  featuresHeading: {
    title: "Ship production-grade agents without losing sleep.",
    subtitle:
      "AgentRuntime packages everything you need to design, deploy, and govern autonomous workflows—no more piecing together schedulers, secrets, and ad-hoc monitors.",
  },
  features: [
    {
      headline: "Visual composer + IaC bridge",
      description:
        "Drag and drop multi-agent flows or define them in code. Export infrastructure-as-code blueprints that keep prod environments reproducible.",
      iconLabel: "01",
    },
    {
      headline: "Policy-aware runtime",
      description:
        "Enforce compliance, data residency, and RBAC at every hop. Observability hooks give you full lineage, redaction, and replay controls.",
      iconLabel: "02",
    },
    {
      headline: "LLM + tool mesh",
      description:
        "Plug in any foundation model, structured tool, or SaaS service. Monitor success metrics and cost per run in a single pane.",
      iconLabel: "03",
    },
  ],
  useCasesHeading: {
    title: "Where teams win with AgentRuntime",
  },
  useCases: [
    {
      title: "Customer operations copilot",
      description:
        "Resolve tickets end-to-end with supervised agents that orchestrate LLMs, knowledge bases, and internal APIs.",
      ctaLabel: "Explore playbook →",
      ctaUrl: "#pricing",
    },
    {
      title: "Developer productivity",
      description: "Automate incident response, runbooks, and release checklists with dependable multi-step flows.",
      ctaLabel: "Explore playbook →",
      ctaUrl: "#pricing",
    },
    {
      title: "Data intelligence",
      description:
        "Compose data pipelines that fetch, validate, and narrate insights using governed, auditable agents.",
      ctaLabel: "Explore playbook →",
      ctaUrl: "#pricing",
    },
  ],
  metricsHeading: {
    title: "AgentRuntime by the numbers",
  },
  metrics: [
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
  ],
  architectureHeading: {
    title: "Reference architecture",
    subtitle:
      "Bring your agents, tools, and human reviews together on a resilient backbone. AgentRuntime handles scheduling, retries, observability, and compliance so your team focuses on what the agent should achieve—not how to keep it online.",
  },
  architecturePanels: [
    {
      heading: "Northbound interfaces",
      description: "Console · CLI · Terraform Provider · REST / Webhooks",
      points: [],
    },
    {
      heading: "Control plane",
      points: ["Tenant-aware BFF", "Workflow runtime", "Observation + tracing"],
    },
    {
      heading: "Execution mesh",
      points: ["LLM & tool adapters", "Secrets + vault", "Safety & Guardrails"],
    },
  ],
  pricingHeading: {
    title: "Simple tiers, transparent economics.",
    subtitle:
      "Start in minutes with a generous builder plan. Scale into dedicated control planes, custom SLAs, and on-prem deployments when autonomy moves from experiment to mission critical.",
  },
  pricingTiers: [
    {
      name: "Builder",
      priceDisplay: "$0",
      summary: "3 projects, shared runtime, community support.",
      features: [],
      ctaLabel: "Get started",
      ctaUrl: "#contact",
    },
    {
      name: "Growth",
      priceDisplay: "$899/mo",
      summary: "20 projects, granular RBAC, audit exports, SOC 2, priority support.",
      highlight: true,
      features: [],
      ctaLabel: "Talk to sales",
      ctaUrl: "mailto:hello@agentruntime.io",
    },
    {
      name: "Enterprise",
      priceDisplay: "Custom",
      summary: "Dedicated VPC, hybrid/on-prem agent hosts, compliance add-ons.",
      features: [],
      ctaLabel: "Request quote",
      ctaUrl: "mailto:hello@agentruntime.io",
    },
  ],
  footerCopy: "AgentRuntime gives teams a production-ready foundation for orchestrating AI-first operations.",
  documentationUrl: "https://docs.agentruntime.io",
  statusPageUrl: "https://status.agentruntime.io",
  consoleUrl: "/console",
  contactEmail: "hello@agentruntime.io",
};

