/**
 * Page-level title + meta descriptions for SEO.
 * Titles are short; `Seo` appends ` | AgentRuntime` unless `title` already includes the site name.
 */

export const seoCopy = {
  home: {
    title: "Put Your Agents to Work",
    description:
      "Stop experimenting. Put your agents to work. Run AI agents reliably, safely, at scale - now. Build production-ready agent workflows with confidence.",
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
    title: "Contact",
    description:
      "Reach the AgentRuntime team for product questions, partnerships, support, and enterprise engagements.",
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
