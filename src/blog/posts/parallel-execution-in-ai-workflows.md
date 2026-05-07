# Parallel Execution in AI Workflows: When to Fan Out and When Not To

Sequential workflows are the intuitive starting point. Do Step A, then Step B, then Step C. They are easy to reason about, easy to debug, and correct for many use cases.

They are also slow when the steps do not depend on each other.

Parallel execution — running multiple steps simultaneously — is the primary lever for reducing end-to-end workflow latency. Used correctly, it can cut execution time by 60–80% on workflows with independent branches. Used incorrectly, it introduces race conditions, resource contention, and debugging complexity that outweighs the gains.

This post covers when to fan out, how to do it correctly, and the common mistakes teams make.

## When parallel execution makes sense

The rule is simple: steps that do not depend on each other's outputs can run in parallel. Steps that do must run sequentially.

**Good candidates for parallelisation:**

- Fetching data from multiple independent sources (CRM, billing system, analytics platform) before passing the combined result to an LLM
- Running the same analysis against multiple items in a batch (processing 50 customer records simultaneously instead of one at a time)
- Calling multiple LLMs with the same prompt and comparing results
- Generating multiple draft outputs and picking the best one

**Poor candidates:**

- Steps where the output of one is the input of the next — these are inherently sequential
- Steps that write to the same resource (database row, file, external record) — parallelising these creates race conditions
- Steps where one step's success is required before the next has meaning

## The fan-out / fan-in pattern

The standard pattern for parallel execution in workflow orchestration:

1. **Fan-out:** A single step triggers N parallel sub-workflows or parallel branches
2. **Execute:** All N branches run concurrently
3. **Fan-in:** A merge step waits for all branches to complete and aggregates their results

```json
{
  "id": "enrich-customer",
  "type": "parallel",
  "branches": [
    {
      "id": "get-crm-data",
      "type": "mcp_call",
      "tool": "crm.get_customer",
      "inputs": { "email": "{{input.email}}" }
    },
    {
      "id": "get-billing-data",
      "type": "mcp_call",
      "tool": "billing.get_subscription",
      "inputs": { "email": "{{input.email}}" }
    },
    {
      "id": "get-usage-data",
      "type": "mcp_call",
      "tool": "analytics.get_usage",
      "inputs": { "email": "{{input.email}}" }
    }
  ],
  "merge": "wait_all"
}
```

The `merge: "wait_all"` means the workflow does not proceed until all three branches complete. Downstream steps can then access `{{steps.enrich-customer.branches.get-crm-data.result}}` and so on.

Alternative merge strategies:
- `wait_all` — proceed when every branch completes (or any branch fails)
- `wait_first` — proceed when the fastest branch completes, cancel the rest
- `wait_n` — proceed when N of M branches complete

## Nested runs for batch processing

Parallel branches are useful for a fixed set of concurrent operations. For variable-size batches — process all 500 items in this list — you need nested runs: spawning a child workflow run for each item and waiting for all child runs to complete before the parent continues.

```json
{
  "id": "process-batch",
  "type": "nested_runs",
  "workflow_id": "process-single-item",
  "inputs_array": "{{input.items}}",
  "concurrency_limit": 20
}
```

The `concurrency_limit` is critical. Without it, processing a 10,000-item batch spawns 10,000 simultaneous runs, immediately saturating your external API rate limits and your own infrastructure.

## The failure handling problem

Parallel execution introduces a failure handling dimension that sequential workflows do not have: what happens when one branch fails while the others are still running?

**Options:**

1. **Fail fast** — cancel all running branches immediately, fail the workflow. Good when all branches are required and there is no point continuing if one fails.

2. **Complete and report** — let all branches complete, then fail the workflow with a report of which branches succeeded and which failed. Good when you want to process as much as possible and report on failures.

3. **Best effort** — let all branches complete, proceed with whatever succeeded. Good when some data is better than no data.

Choosing the wrong strategy — usually defaulting to "fail fast" when "complete and report" is more appropriate — is one of the most common mistakes in parallel workflow design.

## Resource contention and rate limits

The most common production problem with parallel execution is hitting external API rate limits. Your workflow fans out to 50 parallel branches, each of which calls the same external API, and all 50 calls land simultaneously. The API returns 429 errors. Your retry logic runs 50 simultaneous exponential backoffs, all converging at similar times. You have built an accidental DDoS against your own dependency.

The solutions:
- Set a concurrency limit on parallel branches
- Add jitter to retry delays
- Use a semaphore or token bucket at the workflow level for rate-limited tools

These are the kinds of concerns a runtime handles at the infrastructure level — so your workflow definition does not need to implement rate limiting logic itself.

## When sequential is the right call

Not everything should be parallelised. Sequential execution has real advantages:

- Simpler to reason about and debug
- Easier to implement correct error handling
- Lower peak resource usage
- Appropriate when steps are naturally ordered

The goal is not maximum parallelism. The goal is correct behaviour at the right speed. Start sequential, add parallelism where the latency data shows it is needed, and test the failure paths before deploying.

---

AgentRuntime supports parallel step execution, nested runs with concurrency limits, configurable merge strategies, and rate-limit-aware retry logic. [See the workflow schema reference](/api-reference) or [join the waitlist](/waitlist).
