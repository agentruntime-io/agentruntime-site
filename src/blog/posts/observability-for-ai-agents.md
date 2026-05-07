# Observability for AI Agents: What to Trace and Why

Observability has a well-established meaning in backend engineering: the ability to understand the internal state of a system from its external outputs. Metrics, logs, and traces. RED method for services, USE method for resources. Tools like Prometheus, Jaeger, and Grafana.

Most teams building AI agents apply none of this. They have `print()` statements. Maybe a log file. When something goes wrong, they read through raw output and try to reconstruct what happened.

This does not scale. Here is what proper observability for AI agents actually looks like.

## The three layers you need

### Layer 1: Workflow-level traces

A workflow run is the top-level unit. Your trace should capture:

- Run ID, workflow ID, and version
- Start time, end time, and final status
- Input payload (sanitised for PII)
- Which branch the workflow took through the DAG
- Total duration and cost (tokens used, external API calls made)

This layer answers: "Did this run succeed? How long did it take? What did it do at a high level?"

### Layer 2: Step-level spans

Every step in the workflow is a child span of the run trace:

- Step name and type (`mcp_call`, `llm_call`, `human_task`, `lua_script`)
- Start and end time for the step
- Input to the step and output from the step
- For `mcp_call`: which tool server, which tool, latency, success/failure
- For `llm_call`: model, prompt template, token count, response
- For `human_task`: created timestamp, reviewer, decision, decision timestamp

This layer answers: "Which step failed? How long did each step take? What exactly did the LLM respond with?"

### Layer 3: Structured logs

Structured logs — JSON-formatted entries that machines can query — are the complement to traces. While traces give you the timeline, structured logs give you the detail at each point.

Critical log events for AI agents:
- Workflow started / completed / failed / cancelled
- Step started / completed / failed
- Human task created / completed
- Tool call made / returned (with latency)
- LLM call made / returned (with token counts)
- Retry triggered (with reason)
- Stuck-run watchdog fired

Every log entry should carry the `run_id` and `workflow_id` so you can filter to a specific run instantly.

## What OpenTelemetry gives you

OpenTelemetry is the open standard for distributed tracing, now broadly supported across backends (Jaeger, Honeycomb, Datadog, Grafana Tempo). Using it for AI workflow traces means:

- **Vendor-neutral instrumentation** — your traces are not locked to a single observability vendor
- **Automatic context propagation** — a trace started in your API gateway carries through the workflow engine and into every tool call
- **Span relationships** — the parent-child relationship between workflow → steps is standard and visualised correctly by every OTel-compatible backend
- **Sampling control** — keep 100% of failed traces, sample successful ones at your preferred rate

## The questions good observability lets you answer

**Debugging:** "Run `run_01abc` failed at Step 3 — what input did Step 3 receive, and what did the tool return?"

**Performance:** "Which step is the bottleneck across our last 10,000 runs? Is it the LLM call or the MCP tool?"

**Cost:** "How many tokens did we spend on customer support workflows last week? Which workflow definition is the most expensive?"

**Reliability:** "What percentage of runs complete successfully? Which workflows have the highest failure rates? Is there a correlation with specific input types?"

**Compliance:** "Show me every run that included a human approval step. Who approved each one, and when?"

None of these questions can be answered without structured, queryable observability data at the run and step level.

## The gap most teams have

The most common pattern in AI agent deployments today is: the run either succeeds or fails, and if it fails, you look at the last log line and guess. There is no step-level trace, no structured log, no run history to query.

This works until you have more than a handful of workflows running more than a handful of times per day. After that, debugging becomes archaeology — and incidents become long.

The teams that ship reliable AI agents in production have treated observability as a first-class concern from the beginning. Not because it is interesting, but because it is the thing that lets them move fast without being afraid of what they are deploying.

---

AgentRuntime instruments every workflow run with OpenTelemetry traces at the workflow and step level, ships structured logs via Fluent Bit, and exposes run history and context snapshots via API. [See the documentation](/docs) or [join the waitlist](/waitlist).
