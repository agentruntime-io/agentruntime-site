# Human-in-the-Loop: How to Build Approval Gates Into AI Workflows

The phrase "AI automation" often implies removing humans from the process. The best production AI systems do the opposite — they put humans exactly where they are needed, and get them out of the way everywhere else.

This is what human-in-the-loop (HITL) design means in practice. Not a safety disclaimer. Not a UI checkbox. A first-class architectural pattern that decides which decisions an AI can make autonomously and which ones require a human to review before execution continues.

## Why HITL is not optional for high-stakes workflows

An AI agent that can send emails, modify database records, process refunds, or update customer accounts is powerful. It is also capable of making consequential errors at machine speed.

The question is not whether AI agents make mistakes. They do, and they will. The question is: which mistakes are recoverable and which are not?

A miscategorised support ticket is recoverable. A batch of incorrect refunds, a legal document sent to the wrong recipient, or a configuration change pushed to production — these are not. High-stakes steps in a workflow need a human gate.

## Three patterns for human approval gates

### Pattern 1: Approve before irreversible action

The most common pattern. The workflow reaches a point where the next action has real-world consequences that cannot be undone. Rather than executing immediately, it pauses, notifies a reviewer, and waits for an explicit approval before continuing.

```
Step A: Analyse customer complaint
Step B: Draft resolution (LLM)
Step C: [HUMAN REVIEW] Approve or reject resolution
Step D: If approved → send response and issue refund
```

The workflow is suspended after Step B. The reviewer sees the AI's draft, decides whether it is correct, and either approves (workflow continues to D) or rejects (workflow routes to a fallback).

### Pattern 2: Review on threshold

The workflow runs autonomously for most inputs but escalates to a human when a confidence score, risk level, or value threshold is exceeded.

```
Step A: Process loan application
Step B: Score application (LLM + rules engine)
Step C: If score >= 85 → auto-approve
         If score < 85 → [HUMAN REVIEW] manual underwriter decision
```

This is the pattern that gets teams to 80% automation without eliminating oversight on the cases that actually need it.

### Pattern 3: Audit trail with async review

Some workflows do not need synchronous approval but do need a human to review what happened. The workflow completes, and a separate review task is created that a human closes after verification.

This pattern is common in regulated industries where actions must be auditable even when speed is required.

## What HITL needs from the infrastructure

A human approval gate is not just a `sleep` call in your code. To be reliable and useful, it needs:

**Durable suspension.** The workflow must be able to pause indefinitely — minutes, hours, days — without losing its state. When the human approves, execution resumes exactly where it left off with all prior context intact.

**A completion API.** The reviewer needs a way to submit their decision. This is usually a REST endpoint that accepts `approve` or `reject` along with optional notes. That API call must reliably resume the suspended workflow.

**Timeout handling.** If no reviewer acts within the expected window, the workflow needs a defined fallback — escalate to a manager, route to a different queue, or cancel with a notification.

**Audit log.** Who reviewed, what decision they made, what the workflow state was at the time of review, and when it happened. This is the thing compliance teams will ask for.

**Context for the reviewer.** The human being asked to review needs to see enough information to make a good decision quickly — the inputs that led to this point, the AI's recommendation, and the consequences of each choice.

## The design principle

Human-in-the-loop is not about making AI less capable. It is about deploying AI capability in a way that earns trust — from your team, your users, and your regulators.

The goal is not to have a human approve everything. The goal is to have a human approve exactly the things that need it, with full context, in a way that is reliably tracked. Everything else can be automated.

Teams that get this right end up with workflows that are faster than fully manual processes, more reliable than fully autonomous ones, and defensible to anyone who asks how decisions were made.

---

AgentRuntime has a native `human_task` step type that suspends workflow execution, exposes pending tasks via API, and resumes the run on completion. Review and approval decisions are stored as part of the run event log. [Learn more in the documentation](/docs) or [join the waitlist](/waitlist).
