/**
 * Blog manifest. Maps URL slugs to Markdown content and metadata.
 * Add new posts by adding a `.md` file under `posts/` and an entry here.
 */

import introducingRaw from "@/blog/posts/introducing-the-agentruntime-blog.md?raw";
import whyAgentsFailRaw from "@/blog/posts/why-ai-agents-fail-in-production.md?raw";
import whatIsMcpRaw from "@/blog/posts/what-is-mcp-and-why-it-matters.md?raw";
import humanInTheLoopRaw from "@/blog/posts/human-in-the-loop-ai-workflows.md?raw";
import simulateBeforeDeployRaw from "@/blog/posts/simulate-before-you-deploy.md?raw";
import observabilityRaw from "@/blog/posts/observability-for-ai-agents.md?raw";
import vsDiyRaw from "@/blog/posts/agentruntime-vs-diy-orchestration.md?raw";
import versioningRaw from "@/blog/posts/versioning-ai-workflows.md?raw";
import credentialMgmtRaw from "@/blog/posts/credential-management-for-ai-agents.md?raw";
import customerSupportRaw from "@/blog/posts/building-customer-support-automation.md?raw";
import parallelExecutionRaw from "@/blog/posts/parallel-execution-in-ai-workflows.md?raw";
import multiTenantRaw from "@/blog/posts/multi-tenant-ai-infrastructure.md?raw";
import promptEngineeringRaw from "@/blog/posts/prompt-engineering-for-production.md?raw";
import multiAgentRaw from "@/blog/posts/multi-agent-systems.md?raw";
import piiHandlingRaw from "@/blog/posts/pii-data-handling.md?raw";
import promptInjectionRaw from "@/blog/posts/prompt-injection-defense.md?raw";
import zeroDowntimeRaw from "@/blog/posts/zero-downtime-workflow-deployments.md?raw";
import providerPortabilityRaw from "@/blog/posts/provider-portability.md?raw";
import queueDesignRaw from "@/blog/posts/queue-design-for-ai-workloads.md?raw";
import workflowDebuggingRaw from "@/blog/posts/workflow-debugging.md?raw";
import researchAssistantRaw from "@/blog/posts/building-ai-research-assistant.md?raw";
import invoiceProcessingRaw from "@/blog/posts/invoice-processing-pipeline.md?raw";
import hrAutomationRaw from "@/blog/posts/hr-automation-with-ai.md?raw";
import contentModerationRaw from "@/blog/posts/ai-content-moderation.md?raw";
import contentGenerationRaw from "@/blog/posts/content-generation-pipeline.md?raw";
import ecommerceOrderRaw from "@/blog/posts/ecommerce-order-automation.md?raw";
import aiMonitoringRaw from "@/blog/posts/ai-monitoring-pipeline.md?raw";
import coldStartRaw from "@/blog/posts/cold-start-problem.md?raw";
import roiMeasurementRaw from "@/blog/posts/measuring-ai-workflow-roi.md?raw";
import tracingVsLoggingRaw from "@/blog/posts/ai-workflow-tracing-vs-logging.md?raw";
import workflowCodeConfigRaw from "@/blog/posts/workflow-as-code-vs-config.md?raw";
import documentProcessingRaw from "@/blog/posts/document-processing-pipeline.md?raw";
import contextWindowRaw from "@/blog/posts/context-window-management.md?raw";
import gracefulDegradationRaw from "@/blog/posts/graceful-degradation.md?raw";
import webhookSecurityRaw from "@/blog/posts/webhook-security.md?raw";
import selfHostedLlmRaw from "@/blog/posts/self-hosted-llm-tradeoffs.md?raw";
import codeReviewAgentRaw from "@/blog/posts/ai-code-review-agent.md?raw";
import chainingVsSingleStepRaw from "@/blog/posts/chaining-vs-single-step.md?raw";
import slaDesignRaw from "@/blog/posts/sla-design-for-ai-products.md?raw";
import complianceRaw from "@/blog/posts/ai-agents-for-compliance.md?raw";
import retryLogicRaw from "@/blog/posts/retry-logic-for-ai-agents.md?raw";
import agentMemoryRaw from "@/blog/posts/agent-memory-and-state.md?raw";
import rateLimitsRaw from "@/blog/posts/rate-limits-and-cost-control.md?raw";
import testingWorkflowsRaw from "@/blog/posts/testing-ai-workflows.md?raw";
import timeoutsRaw from "@/blog/posts/timeouts-and-deadlines.md?raw";
import structuredOutputRaw from "@/blog/posts/structured-output-from-llms.md?raw";
import notebookToProdRaw from "@/blog/posts/from-notebook-to-production.md?raw";
import eventDrivenRaw from "@/blog/posts/event-driven-ai-workflows.md?raw";
import choosingLlmRaw from "@/blog/posts/choosing-the-right-llm-per-step.md?raw";
import leadEnrichmentRaw from "@/blog/posts/building-lead-enrichment-pipeline.md?raw";
import type { BlogPost } from "@/blog/types";

const postMap: Record<string, BlogPost> = {
  "introducing-the-agentruntime-blog": {
    slug: "introducing-the-agentruntime-blog",
    title: "Introducing the AgentRuntime blog",
    description:
      "Product updates, engineering notes, and practical guidance for running AI agents in production on AgentRuntime.",
    publishedAt: "2026-04-20",
    tags: ["Product"],
    coverImage: "/blog/blog-introducing.png",
    content: introducingRaw,
  },
  "why-ai-agents-fail-in-production": {
    slug: "why-ai-agents-fail-in-production",
    title: "Why AI Agents Fail in Production (And What to Do About It)",
    description:
      "The four infrastructure failure modes that break AI agents in production — and the patterns that fix them.",
    publishedAt: "2026-04-28",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-why-agents-fail.png",
    content: whyAgentsFailRaw,
  },
  "what-is-mcp-and-why-it-matters": {
    slug: "what-is-mcp-and-why-it-matters",
    title: "What Is MCP and Why It Changes How AI Agents Use Tools",
    description:
      "Model Context Protocol explained: what it is, why it was needed, and what native MCP support means for production agent infrastructure.",
    publishedAt: "2026-05-01",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-what-is-mcp.png",
    content: whatIsMcpRaw,
  },
  "human-in-the-loop-ai-workflows": {
    slug: "human-in-the-loop-ai-workflows",
    title: "Human-in-the-Loop: How to Build Approval Gates Into AI Workflows",
    description:
      "Three HITL patterns for AI workflows — approve before irreversible action, review on threshold, and async audit — with the infrastructure they require.",
    publishedAt: "2026-05-02",
    tags: ["How-to"],
    coverImage: "/blog/blog-human-in-the-loop.png",
    content: humanInTheLoopRaw,
  },
  "simulate-before-you-deploy": {
    slug: "simulate-before-you-deploy",
    title: "Simulate Before You Deploy: Why Pre-Flight Validation Saves Production Incidents",
    description:
      "Schema validation, dependency checks, and graph linting for AI workflows — why simulation is the missing step between development and production.",
    publishedAt: "2026-05-03",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-simulate-before-deploy.png",
    content: simulateBeforeDeployRaw,
  },
  "observability-for-ai-agents": {
    slug: "observability-for-ai-agents",
    title: "Observability for AI Agents: What to Trace and Why",
    description:
      "The three layers of observability for AI workflows — run-level traces, step-level spans, and structured logs — and the questions each one lets you answer.",
    publishedAt: "2026-05-04",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-observability.png",
    content: observabilityRaw,
  },
  "agentruntime-vs-diy-orchestration": {
    slug: "agentruntime-vs-diy-orchestration",
    title: "AgentRuntime vs. DIY Orchestration: What You Are Actually Building",
    description:
      "An honest account of what production AI agent orchestration requires — and why DIY implementations accumulate hidden costs faster than most teams expect.",
    publishedAt: "2026-05-05",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-diy-vs-runtime.png",
    content: vsDiyRaw,
  },
  "versioning-ai-workflows": {
    slug: "versioning-ai-workflows",
    title: "Versioning AI Workflows: Why Immutability Matters",
    description:
      "Why mutable workflow definitions create debugging nightmares, compliance gaps, and rollback problems — and what immutable versioning looks like in practice.",
    publishedAt: "2026-05-05",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-versioning-immutability.png",
    content: versioningRaw,
  },
  "credential-management-for-ai-agents": {
    slug: "credential-management-for-ai-agents",
    title: "Credential Management for AI Agents: Beyond Environment Variables",
    description:
      "Why environment variables are the wrong answer for AI agent credentials — and the four properties of a production-grade secrets architecture.",
    publishedAt: "2026-05-05",
    tags: ["Security"],
    coverImage: "/blog/blog-credential-management.png",
    content: credentialMgmtRaw,
  },
  "building-customer-support-automation": {
    slug: "building-customer-support-automation",
    title: "Building a Customer Support Automation with AgentRuntime",
    description:
      "A step-by-step walkthrough of a production customer support workflow: classification, CRM enrichment, LLM drafting, human review, and escalation.",
    publishedAt: "2026-05-05",
    tags: ["Use Case"],
    coverImage: "/blog/blog-customer-support.png",
    content: customerSupportRaw,
  },
  "parallel-execution-in-ai-workflows": {
    slug: "parallel-execution-in-ai-workflows",
    title: "Parallel Execution in AI Workflows: When to Fan Out and When Not To",
    description:
      "The fan-out/fan-in pattern, nested runs for batch processing, failure handling strategies, and rate limit pitfalls for parallel AI workflows.",
    publishedAt: "2026-05-05",
    tags: ["How-to"],
    coverImage: "/blog/blog-parallel-execution.png",
    content: parallelExecutionRaw,
  },
  "multi-tenant-ai-infrastructure": {
    slug: "multi-tenant-ai-infrastructure",
    title: "Multi-Tenant AI Infrastructure: Isolating Workflows Across Customers",
    description:
      "What multi-tenancy means for AI workflow infrastructure, why naive implementations fail, and the three architectural decisions to get right from the start.",
    publishedAt: "2026-05-05",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-multi-tenant.png",
    content: multiTenantRaw,
  },
  "retry-logic-for-ai-agents": {
    slug: "retry-logic-for-ai-agents",
    title: "Retry Logic for AI Agents: Beyond try/catch",
    description:
      "Why naive retries cause duplicate actions in AI workflows, and how idempotency keys, exponential backoff, and dead-letter queues make retries safe.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-retry-logic.png",
    content: retryLogicRaw,
  },
  "agent-memory-and-state": {
    slug: "agent-memory-and-state",
    title: "The Agent Memory Problem: State, Context, and Recall",
    description:
      "Working memory, run memory, and long-term memory are three different problems. Most agents conflate them — and pay the price at scale.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-agent-memory.png",
    content: agentMemoryRaw,
  },
  "rate-limits-and-cost-control": {
    slug: "rate-limits-and-cost-control",
    title: "Rate Limits Are Not Your Problem — Until They Are",
    description:
      "How LLM API rate limits work, why they become production problems, and the strategies for managing cost and throughput at scale.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-rate-limits.png",
    content: rateLimitsRaw,
  },
  "testing-ai-workflows": {
    slug: "testing-ai-workflows",
    title: "How to Test AI Workflows Before They Hit Production",
    description:
      "A four-layer testing strategy for AI workflows: unit tests, mocked integration tests, snapshot tests, and evaluation harnesses.",
    publishedAt: "2026-05-06",
    tags: ["How-to"],
    coverImage: "/blog/blog-testing-workflows.png",
    content: testingWorkflowsRaw,
  },
  "timeouts-and-deadlines": {
    slug: "timeouts-and-deadlines",
    title: "Timeouts and Deadlines for AI Agents: Setting SLAs That Actually Hold",
    description:
      "The difference between timeouts and deadlines, how the stuck-workflow problem emerges, and what a production timeout strategy looks like.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-timeouts.png",
    content: timeoutsRaw,
  },
  "structured-output-from-llms": {
    slug: "structured-output-from-llms",
    title: "Structured Output from LLMs: Why JSON Mode Is Not Enough",
    description:
      "JSON mode guarantees valid JSON, not correct JSON. Schema validation, structured output APIs, and retry-on-failure patterns for reliable LLM output.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-structured-output.png",
    content: structuredOutputRaw,
  },
  "from-notebook-to-production": {
    slug: "from-notebook-to-production",
    title: "From Notebook to Production: The AI Agent Deployment Gap",
    description:
      "What a Jupyter notebook doesn't model — concurrency, partial failures, state persistence, observability — and the migration checklist for getting to production.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-notebook-to-prod.png",
    content: notebookToProdRaw,
  },
  "event-driven-ai-workflows": {
    slug: "event-driven-ai-workflows",
    title: "Event-Driven AI Workflows: Building Agents That React",
    description:
      "Why polling breaks at scale, how event queues and webhooks work with AI workflows, and why idempotency is non-negotiable for event-driven systems.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-event-driven.png",
    content: eventDrivenRaw,
  },
  "choosing-the-right-llm-per-step": {
    slug: "choosing-the-right-llm-per-step",
    title: "Choosing the Right LLM for Each Step in Your Workflow",
    description:
      "A tiered model selection strategy for AI workflows: when frontier models are worth it, when they are not, and how latency changes the calculus.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-choosing-llm.png",
    content: choosingLlmRaw,
  },
  "building-lead-enrichment-pipeline": {
    slug: "building-lead-enrichment-pipeline",
    title: "Building a Lead Enrichment Pipeline with AgentRuntime",
    description:
      "A five-stage lead enrichment workflow: intake, company research, ICP scoring, personalization signals, and CRM write-back — with the reliability patterns that make it production-ready.",
    publishedAt: "2026-05-06",
    tags: ["Use Case"],
    coverImage: "/blog/blog-lead-enrichment.png",
    content: leadEnrichmentRaw,
  },
  "workflow-as-code-vs-config": {
    slug: "workflow-as-code-vs-config",
    title: "Workflow as Code vs. Workflow as Config: What the Trade-off Actually Is",
    description:
      "YAML vs code for defining AI workflows — the genuine trade-offs, why visual-first tools are often the worst of both worlds, and how to choose.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-workflow-code-config.png",
    content: workflowCodeConfigRaw,
  },
  "document-processing-pipeline": {
    slug: "document-processing-pipeline",
    title: "Building a Document Processing Pipeline with AgentRuntime",
    description:
      "A five-stage production pipeline for processing documents with AI: ingestion, chunking, extraction, validation, and output routing — with the reliability patterns that matter at scale.",
    publishedAt: "2026-05-06",
    tags: ["Use Case"],
    coverImage: "/blog/blog-document-processing.png",
    content: documentProcessingRaw,
  },
  "context-window-management": {
    slug: "context-window-management",
    title: "Context Window Management at Scale: What Breaks and How to Fix It",
    description:
      "Larger context windows don't eliminate the need to manage context deliberately. The three failure modes and the strategies that fix them.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-context-window.png",
    content: contextWindowRaw,
  },
  "graceful-degradation": {
    slug: "graceful-degradation",
    title: "Graceful Degradation in AI Systems: When the Model Is Not Available",
    description:
      "Circuit breakers, fallback strategies, and the failure spectrum for AI workflows — how to fail informatively and partially rather than completely.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-graceful-degradation.png",
    content: gracefulDegradationRaw,
  },
  "webhook-security": {
    slug: "webhook-security",
    title: "Webhook Security for AI Workflows: What Most Teams Miss",
    description:
      "Signature verification, replay attack prevention, and idempotency for webhook-triggered AI workflows — the four controls every handler needs.",
    publishedAt: "2026-05-06",
    tags: ["Security"],
    coverImage: "/blog/blog-webhook-security.png",
    content: webhookSecurityRaw,
  },
  "self-hosted-llm-tradeoffs": {
    slug: "self-hosted-llm-tradeoffs",
    title: "The Hidden Costs of Self-Hosting LLMs",
    description:
      "GPU infrastructure, inference engineering, and model update overhead — the complete cost model most teams miss before deciding to self-host.",
    publishedAt: "2026-05-06",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-self-hosted-llm.png",
    content: selfHostedLlmRaw,
  },
  "ai-code-review-agent": {
    slug: "ai-code-review-agent",
    title: "Building an AI Code Review Agent: What Actually Works",
    description:
      "Why most code review bots get disabled and how to build one that gets adopted — narrow scope, confidence filtering, and a feedback loop.",
    publishedAt: "2026-05-06",
    tags: ["Use Case"],
    coverImage: "/blog/blog-code-review-agent.png",
    content: codeReviewAgentRaw,
  },
  "chaining-vs-single-step": {
    slug: "chaining-vs-single-step",
    title: "When to Chain LLM Calls and When Not To",
    description:
      "Chaining works for separation of concerns, not for hoping a model can handle complexity in pieces. When multi-step helps and when it hurts.",
    publishedAt: "2026-05-06",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-chaining-vs-single.png",
    content: chainingVsSingleStepRaw,
  },
  "sla-design-for-ai-products": {
    slug: "sla-design-for-ai-products",
    title: "SLA Design for AI-Powered Products: Setting Expectations That Hold",
    description:
      "Availability, latency, quality, and consistency — the four SLA dimensions for AI products, and why traditional uptime metrics are insufficient.",
    publishedAt: "2026-05-06",
    tags: ["Product"],
    coverImage: "/blog/blog-sla-design.png",
    content: slaDesignRaw,
  },
  "ai-agents-for-compliance": {
    slug: "ai-agents-for-compliance",
    title: "AI Agents for Compliance: Why Auditability Is the Whole Game",
    description:
      "In compliance, the audit trail is the deliverable. What that means for AI workflow infrastructure: immutable records, policy versioning, and mandatory human review.",
    publishedAt: "2026-05-06",
    tags: ["Security"],
    coverImage: "/blog/blog-compliance.png",
    content: complianceRaw,
  },
  "prompt-engineering-for-production": {
    slug: "prompt-engineering-for-production",
    title: "Prompt Engineering for Production: Beyond 'It Worked Once'",
    description:
      "Prompts are code. Version them, test them, review them. The production prompt engineering discipline that makes AI workflows reliable.",
    publishedAt: "2026-05-07",
    tags: ["How-to"],
    coverImage: "/blog/blog-prompt-engineering.png",
    content: promptEngineeringRaw,
  },
  "multi-agent-systems": {
    slug: "multi-agent-systems",
    title: "How to Build a Multi-Agent System That Actually Works",
    description:
      "The orchestrator pattern, communication strategies, shared state, and failure isolation for multi-agent AI architectures.",
    publishedAt: "2026-05-07",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-multi-agent.png",
    content: multiAgentRaw,
  },
  "pii-data-handling": {
    slug: "pii-data-handling",
    title: "AI Agents and PII: Data Handling Patterns That Keep You Compliant",
    description:
      "Mapping data flows, LLM provider DPAs, PII minimization in prompts, and retention policies for run state — what every AI workflow team needs to get right.",
    publishedAt: "2026-05-07",
    tags: ["Security"],
    coverImage: "/blog/blog-pii-handling.png",
    content: piiHandlingRaw,
  },
  "prompt-injection-defense": {
    slug: "prompt-injection-defense",
    title: "Prompt Injection Attacks: How to Defend AI Workflows",
    description:
      "Structural separation, output validation, privilege separation, and monitoring — the four defense layers against prompt injection in production AI systems.",
    publishedAt: "2026-05-07",
    tags: ["Security"],
    coverImage: "/blog/blog-prompt-injection.png",
    content: promptInjectionRaw,
  },
  "zero-downtime-workflow-deployments": {
    slug: "zero-downtime-workflow-deployments",
    title: "Zero-Downtime Deployments for AI Workflows",
    description:
      "Drain strategies, version-aware execution, and backward-compatible migrations — how to deploy new workflow versions without losing in-flight runs.",
    publishedAt: "2026-05-07",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-zero-downtime.png",
    content: zeroDowntimeRaw,
  },
  "provider-portability": {
    slug: "provider-portability",
    title: "Provider Portability: Building LLM-Agnostic AI Workflows",
    description:
      "The abstraction layer, prompt portability, production failover, and cost arbitrage that come from not coupling tightly to a single LLM provider.",
    publishedAt: "2026-05-07",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-provider-portability.png",
    content: providerPortabilityRaw,
  },
  "queue-design-for-ai-workloads": {
    slug: "queue-design-for-ai-workloads",
    title: "Queue Design for AI Workloads: Why Standard Patterns Need Adjustment",
    description:
      "Cost heterogeneity, LLM rate limit back-pressure, priority queuing, fan-out management, and dead-letter observability for AI workflow queues.",
    publishedAt: "2026-05-07",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-queue-design.png",
    content: queueDesignRaw,
  },
  "workflow-debugging": {
    slug: "workflow-debugging",
    title: "Workflow Debugging: How to Find What Broke",
    description:
      "The debugging hierarchy, step replay, structured error classification, and cross-run correlation — the observability stack that makes AI workflow debugging systematic.",
    publishedAt: "2026-05-07",
    tags: ["How-to"],
    coverImage: "/blog/blog-workflow-debugging.png",
    content: workflowDebuggingRaw,
  },
  "building-ai-research-assistant": {
    slug: "building-ai-research-assistant",
    title: "Building an AI Research Assistant with AgentRuntime",
    description:
      "Query decomposition, parallel information gathering, synthesis, and citation annotation — the four phases of a production AI research workflow.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-research-assistant.png",
    content: researchAssistantRaw,
  },
  "invoice-processing-pipeline": {
    slug: "invoice-processing-pipeline",
    title: "Building an AI Invoice Processing Pipeline",
    description:
      "Intake, extraction, PO matching, GL coding, and approval routing — how to build an AP automation pipeline that handles real-world invoice variance reliably.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-invoice-processing.png",
    content: invoiceProcessingRaw,
  },
  "hr-automation-with-ai": {
    slug: "hr-automation-with-ai",
    title: "AI Agents for HR: Resume Screening and Interview Scheduling",
    description:
      "The right way to build AI-assisted hiring workflows: scoring for human review, scheduling automation, and the compliance layer that makes it legally deployable.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-hr-automation.png",
    content: hrAutomationRaw,
  },
  "ai-content-moderation": {
    slug: "ai-content-moderation",
    title: "AI-Powered Content Moderation: Building Systems That Scale",
    description:
      "Layered classification, context-aware moderation, appeal workflows, and the dual error trade-off — how to build content moderation that is both scalable and fair.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-content-moderation.png",
    content: contentModerationRaw,
  },
  "content-generation-pipeline": {
    slug: "content-generation-pipeline",
    title: "Building a Content Generation Pipeline That Maintains Quality at Scale",
    description:
      "Brief generation, differentiation injection, quality evaluation, and brand voice enforcement — the infrastructure behind consistent AI content at volume.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-content-generation.png",
    content: contentGenerationRaw,
  },
  "ecommerce-order-automation": {
    slug: "ecommerce-order-automation",
    title: "AI Agents for E-Commerce: Automating Order Management",
    description:
      "Fraud review, exception handling, customer inquiry triage, and returns processing — where AI adds value in order management workflows.",
    publishedAt: "2026-05-07",
    tags: ["Use Case"],
    coverImage: "/blog/blog-ecommerce-orders.png",
    content: ecommerceOrderRaw,
  },
  "ai-monitoring-pipeline": {
    slug: "ai-monitoring-pipeline",
    title: "Building an AI Monitoring Pipeline: Using Agents to Watch Your Systems",
    description:
      "Why threshold alerting misses complex incidents, and how LLM correlation analysis detects multi-signal degradation before individual metrics cross thresholds.",
    publishedAt: "2026-05-07",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-ai-monitoring.png",
    content: aiMonitoringRaw,
  },
  "cold-start-problem": {
    slug: "cold-start-problem",
    title: "The Cold Start Problem for AI Agents: What Breaks Before You Have Data",
    description:
      "Over-automation risk, edge case distribution gaps, shadow mode, and gradual rollout thresholds — how to reach steady-state reliability without a painful cold start.",
    publishedAt: "2026-05-07",
    tags: ["Infrastructure"],
    coverImage: "/blog/blog-cold-start.png",
    content: coldStartRaw,
  },
  "measuring-ai-workflow-roi": {
    slug: "measuring-ai-workflow-roi",
    title: "Measuring AI Workflow ROI: The Metrics That Actually Matter",
    description:
      "Baseline cost, quality-adjusted throughput, time-to-value, and what to do when the ROI is negative — a rigorous framework for AI investment measurement.",
    publishedAt: "2026-05-07",
    tags: ["Product"],
    coverImage: "/blog/blog-roi-measurement.png",
    content: roiMeasurementRaw,
  },
  "ai-workflow-tracing-vs-logging": {
    slug: "ai-workflow-tracing-vs-logging",
    title: "Why Workflow-Level Tracing Beats Function-Level Logging for AI Systems",
    description:
      "Logging tells you what happened at a line of code. Tracing tells you what happened during an entire operation. For AI workflows, the difference is the difference between debugging and guessing.",
    publishedAt: "2026-05-07",
    tags: ["Deep Dive"],
    coverImage: "/blog/blog-tracing-vs-logging.png",
    content: tracingVsLoggingRaw,
  },
};

export const BLOG_POSTS: BlogPost[] = Object.values(postMap).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = postMap[slug];
  return post ? { ...post } : undefined;
}

export function getBlogSlugs(): string[] {
  return Object.keys(postMap);
}
