# Simulate Before You Deploy: Why Pre-Flight Validation Saves Production Incidents

The standard cycle for deploying software involves writing code, running tests, and shipping to production. For AI agent workflows, most teams skip the middle step entirely. They register their workflow definition, assume it is correct, and find out otherwise when it fails in front of a real user.

Simulation is the missing step. It is the equivalent of a compiler catching type errors before your code runs — a chance to validate that your workflow will behave correctly before it has any real-world consequences.

## What can go wrong without simulation

### Schema mismatches

Your workflow routes the output of Step A as the input to Step B. Step A produces a field called `customer_id`. Step B expects a field called `customerId`. The workflow compiles. It runs. It fails at runtime, in production, on a real customer's request.

A schema validator that checks the output contract of each step against the input contract of its downstream steps catches this before deployment.

### Missing dependencies

Step C calls an MCP tool that was registered during development but is not available in the production environment. This fails silently until a production run reaches Step C — potentially after irreversible work has already been done in Steps A and B.

A dependency checker that validates all referenced MCP tools are registered and reachable catches this at registration time.

### Circular references and dead-end branches

A workflow graph can have logical errors that are invisible when reading the JSON definition. A branch condition that can never be satisfied, a loop with no exit condition, a parallel step that fans out but never fans in. These create stuck runs or infinite loops in production.

A graph validator that walks the DAG before deployment catches structural errors before they affect users.

### Credential gaps

Step D calls an external API that requires an OAuth token. The credential has not been stored yet. The step fails at runtime. With simulation, the preflight check validates that every tool call in the workflow has a corresponding credential available.

## What simulation actually does

A workflow simulation is a dry-run execution of the workflow graph that validates:

1. **Graph structure** — every node has valid inputs, every edge connects to a real next step, branching conditions are reachable
2. **Schema contracts** — output types of upstream steps match input types of downstream steps
3. **Dependency availability** — all referenced MCP tools are registered and responding
4. **Credential presence** — all tools that require authentication have credentials available
5. **Loop safety** — looping constructs have valid exit conditions

It does not call real external APIs. It does not process real data. It validates that if you ran this workflow with real inputs, the structure would execute correctly.

## The deployment gate

The right way to think about simulation is as a gate in your deployment pipeline. Before a workflow definition becomes active in production, it must pass its pre-flight checks. A workflow that fails simulation cannot be deployed.

This mirrors how compiled languages work. You cannot ship code that does not compile. Simulation is compilation for AI workflows.

## When simulation catches nothing (and that is fine)

Not all workflow errors are structural. Simulation cannot catch:

- An LLM that produces unexpected output despite a correct prompt
- An MCP tool that returns a valid but wrong value
- A human reviewer who approves something they should not

These are runtime concerns that require good observability, monitoring, and human oversight patterns — not simulation. Simulation and runtime observability are complements, not substitutes.

## The practical impact

Teams that add pre-flight validation to their workflow deployment process report two things: fewer production incidents caused by configuration errors, and faster iteration cycles because errors surface immediately rather than after a full staging deployment.

The first time simulation catches a schema mismatch you would have found at 3am on-call instead of during a deployment review, it earns its place permanently.

---

AgentRuntime runs schema linting, dependency checks, and graph validation automatically when you register or update a workflow. Workflows that fail validation cannot be activated. [See the documentation](/docs) or [join the waitlist](/waitlist) for early access.
