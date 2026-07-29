/**
 * Page-level title + meta descriptions for SEO.
 * Titles are short; `Seo` appends ` | AgentRuntime` unless `title` already includes the site name.
 */

export const seoCopy = {
  home: {
    title: "Run AI Workflows in Production",
    description:
      "Connect AI agents, tools, business rules, and people in reliable, stateful workflows built for real production operations.",
  },
  platform: {
    title: "AI Workflow Runtime",
    description:
      "Explore the stateful, observable AgentRuntime execution platform for AI agents, tools, deterministic rules, and human decisions.",
  },
  workflows: {
    title: "Production AI Workflows",
    description:
      "See how AgentRuntime coordinates agents, tools, rules, and people across customer operations, support, finance, and embedded agent products.",
  },
  developers: {
    title: "Developers",
    description:
      "Build production agent workflows with AgentRuntime APIs, SDKs, MCP tools, events, stateful execution, and end-to-end observability.",
  },
  enterprise: {
    title: "Enterprise AI Workflow Control",
    description:
      "Govern AI workflow execution with explicit permissions, human approvals, auditability, policies, and operational visibility.",
  },
  company: {
    title: "Company",
    description:
      "Learn why AgentRuntime is building the production execution layer for AI workflows that cross tools, business rules, and people.",
  },
  features: {
    title: "Features",
    description:
      "Register agents via API or UI, simulate flows, and run production workloads with monitoring, versioning, and enterprise-grade security.",
  },
  howItWorks: {
    title: "How It Works",
    description:
      "Connect agents, validate schemas and simulations, then execute and orchestrate runs with tracing, pause/resume, and full observability.",
  },
  pricing: {
    title: "Pricing",
    description:
      "Plans for individuals, teams, and enterprise - from free developer tier to dedicated support, SLAs, and custom integrations.",
  },
  useCases: {
    title: "Use Cases",
    description:
      "Customer support, IoT and robotics, data pipelines, and more - see how teams deploy reliable agent workflows with AgentRuntime.",
  },
  documentation: {
    title: "Documentation",
    description:
      "Quickstarts, API reference, WebSocket and CLI docs, plus guides to authenticate, deploy, and operate agents in production.",
  },
  about: {
    title: "About",
    description:
      "Mission, team, and values behind AgentRuntime - building dependable infrastructure for AI agent orchestration.",
  },
  contact: {
    title: "Discuss a Workflow",
    description:
      "Bring AgentRuntime one workflow, agent product, or production execution problem and start a technical conversation with the team.",
  },
  waitlist: {
    title: "Join the Waitlist",
    description:
      "Sign up for early access to AgentRuntime and be notified when new capabilities and regions launch.",
  },
  careers: {
    title: "Careers",
    description:
      "Open roles and applications at AgentRuntime - help build the future of AI agent orchestration.",
  },
  legal: {
    title: "Legal",
    description:
      "Terms, privacy, acceptable use, security, billing, and other policies governing use of the AgentRuntime platform.",
  },
  blog: {
    title: "Blog",
    description:
      "Product updates, engineering notes, and guidance for running AI agents in production on AgentRuntime.",
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you requested could not be found.",
  },
} as const;
