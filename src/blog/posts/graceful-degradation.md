# Graceful Degradation in AI Systems: When the Model Is Not Available

Production AI systems depend on external services: LLM APIs, tool servers, vector databases, third-party data sources. Any of them can be slow, degraded, or unavailable at any time. The question is not whether failure will happen — it is what your system does when it does.

Graceful degradation is the discipline of designing systems that fail informatively and partially, rather than completely. For AI workflows, it is one of the most important and least discussed reliability properties.

## The failure spectrum

Not all failures are equal. Understanding the spectrum helps you design the right response for each:

**Transient failures** — a network timeout, a brief rate limit spike, a single 500 response from an LLM API. These resolve on their own and retry with backoff is the correct response.

**Degraded performance** — the LLM API is responding but with elevated latency. 3-second calls become 15-second calls. Retries don't help; they make things worse. The correct response is circuit breaking: stop sending requests, return a cached or simplified result, check back periodically.

**Full outage** — the provider is down. Circuit breaker trips. You need either a fallback (a different provider, a cached result, a rule-based alternative) or a graceful failure that communicates clearly to the user and queues the work for when the provider recovers.

**Model degradation** — the LLM is responding but producing lower-quality output. This is the hardest failure to detect because there is no HTTP error. It shows up as increased downstream validation failures, lower confidence scores, or user-reported quality issues. Detection requires output monitoring, not just health checks.

## Circuit breakers for LLM calls

A circuit breaker tracks the error rate for a given dependency. When the error rate exceeds a threshold, the circuit "opens" — subsequent requests are immediately rejected without attempting the call, and a fallback is invoked. After a cooldown period, the circuit transitions to "half-open" and allows a test request through. If it succeeds, the circuit closes.

For LLM calls, a circuit breaker prevents a degraded provider from consuming all available workers. Without it, a slow or failing LLM API causes every workflow to time out, stacking up in the queue until the system is effectively down.

## Fallback strategies

The right fallback depends on the step and the workflow:

**Alternative provider.** If you have access to multiple LLM providers, a circuit-breaker fallback can route to a secondary provider. This adds cost and requires the secondary to be capable enough for the task, but it maintains functionality.

**Reduced capability.** A complex LLM step (deep reasoning, multi-entity extraction) can fall back to a simpler operation (keyword extraction, rule-based classification) that is less powerful but more reliable. The user gets a lower-quality result rather than no result.

**Cached results.** For steps where the input changes slowly (company research, entity enrichment), a stale cached result from the last successful run may be acceptable — with a clear indication that it is stale.

**Deferred execution.** For non-time-sensitive workflows, enqueue the work and process it when the dependency recovers. This is often the cleanest option for background processing tasks.

## What graceful degradation requires at the infrastructure level

Graceful degradation is not something you can add to a workflow after the fact by wrapping every call in a try/catch. It requires:

- Health state tracking per dependency (circuit breaker state, recent error rate)
- Fallback logic that is explicitly configured and tested
- Clear propagation of partial results — knowing that a run completed with degraded fidelity, not just that it completed
- Monitoring that distinguishes "circuit open, serving fallback" from "circuit open, serving nothing"

Teams that implement this well have a fundamentally different on-call experience than teams that don't.

---

AgentRuntime's step execution model supports explicit fallback configuration per step, and run state captures whether each step completed with full or degraded fidelity — so downstream steps and human reviewers know exactly what quality of output they are working with. [Join the waitlist](/waitlist) for early access.
