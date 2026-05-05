# AgentRuntime vs. DIY Orchestration: What You Are Actually Building

When teams start building AI agents, the first instinct is to write the orchestration themselves. It seems straightforward — a few API calls, some conditional logic, maybe a retry loop. How hard can it be?

Six months later, the same team is maintaining 3,000 lines of custom infrastructure code that has nothing to do with their actual product. This post is an honest account of what DIY orchestration involves and where the hidden costs accumulate.

## What "simple" orchestration actually requires

Let us say you have a workflow with three steps: call an LLM, call an external API with the LLM's output, then send a notification.

Here is what the naive implementation looks like:

```python
result = llm.complete(prompt)
api_result = external_api.call(result)
notify(api_result)
```

And here is what production-grade orchestration of the same workflow actually requires:

**Durability.** If the process crashes between Step 2 and Step 3, you need to know that Step 2 already completed and not call it again. This requires persisting step completion events to a durable store before proceeding.

**Idempotency.** If the API call in Step 2 times out, you retry. But what if it actually succeeded and the timeout was on the response? Without an idempotency key tied to the run ID and step number, you call the API twice. For billing APIs, inventory systems, or email senders, this is a serious bug.

**Error handling with backoff.** Naive retry loops hammer a failed service. You need exponential backoff, jitter, and a maximum retry count, with different strategies for different error types (transient vs. permanent failures).

**Credential management.** The external API key should not be in your code, your environment variables, or your Kubernetes secret. It should be in a secrets manager with audit logging, rotation support, and least-privilege access.

**Observability.** When Step 2 starts failing intermittently, you need to know the error rate, the latency distribution, the specific inputs that cause failures, and whether the problem is on your side or the external API's side.

**Stuck run detection.** A workflow that starts but never completes — because a step is hung waiting on a response that will never come — will consume resources indefinitely without a watchdog that detects and terminates stuck runs.

**Human oversight.** If any step requires human review before execution continues, you need a suspension mechanism, a review interface, a completion API, timeout handling, and audit logging for decisions.

Each of these is a solved problem. Each one also takes real engineering time to do correctly.

## The actual cost

The dirty secret of DIY orchestration is that the infrastructure work — durability, idempotency, observability, credential management, error handling — routinely accounts for 60% or more of the total engineering effort on an agent project.

That is engineering time that produces no differentiation for your product. Your users do not care that you wrote a robust retry loop. They care about what the agent does for them.

The accumulation of this infrastructure also creates maintenance burden. Every new workflow inherits the same patterns. When you discover a bug in your idempotency logic, you fix it in every workflow. When you want to add structured logging, you add it everywhere.

## What a runtime gives you instead

A purpose-built workflow runtime handles all of this once, correctly, and upgrades it over time independently of your workflow logic. Your job becomes: define the DAG, write the business logic for each step, deploy. The runtime handles durability, idempotency, credentials, observability, retries, and stuck-run recovery.

This is the same trade-off teams make when they use a database instead of writing their own storage engine, or a message broker instead of writing their own pub/sub system. The infrastructure is a solved problem. The value is in building on top of it.

## When DIY is the right answer

There are legitimate cases for DIY:

- Your workflow is a single step with no failure modes that matter
- You have very specific infrastructure constraints a runtime cannot meet
- You are in an exploratory phase and want maximum flexibility before committing to a pattern

None of these cases describe a team with multiple workflows running in production serving real users. At that point, the question is not whether to adopt a runtime — it is when.

## The honest comparison

| Concern | DIY | Runtime |
|---------|-----|---------|
| Initial setup | Fast | Moderate |
| First production incident | Painful | Handled |
| Third workflow | Still fast | Fast |
| Tenth workflow | Fragile | Consistent |
| Debugging in production | Hard | Straightforward |
| Compliance audit | Stressful | Documented |

The crossover happens earlier than most teams expect. Usually around the second production incident.

---

AgentRuntime provides the runtime layer so your team builds agent logic, not orchestration infrastructure. [See what it covers in the documentation](/docs) or [join the waitlist](/waitlist) for early access.
