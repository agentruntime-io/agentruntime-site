# SLA Design for AI-Powered Products: Setting Expectations That Hold

Software products have decades of practice defining SLAs: uptime percentages, response time percentiles, error rate budgets. AI-powered products inherit all of these requirements and add several that the traditional model does not account for.

Getting SLA design wrong for AI products creates a specific kind of trust problem: users who experience AI that "works sometimes" develop lower trust than users of a system that fails clearly and consistently.

## The dimensions of an AI SLA

A complete SLA for an AI-powered feature covers at least four dimensions:

**Availability.** The percentage of time the feature is operational. This is the traditional SLA metric and carries over directly. AI systems have a new wrinkle: partial availability. If the LLM is slow but not down, the feature may be "available" in a narrow sense while being effectively unusable. Define what availability means for your specific feature — just uptime, or uptime within a latency threshold.

**Latency.** P50, P95, and P99 latency are the right metrics. Averages are misleading for AI workloads because LLM call latency has a very long tail. A workflow with a 2-second median and a 45-second P99 will generate support tickets even if the median looks fine.

**Quality.** The output of an AI workflow is not deterministic. Quality SLAs express a commitment about output quality over a population of inputs, not individual outputs. Common quality SLA forms: "X% of support ticket classifications will match human reviewer classification," or "Extraction recall will exceed Y% on documents matching our standard templates."

**Consistency.** For the same input, an AI system may produce different outputs on different runs. Some variation is acceptable; some is not. Consistency SLAs define acceptable variation bounds and flag regressions.

## Why traditional availability SLAs are insufficient

A 99.9% availability SLA permits ~8.7 hours of downtime per year. For a synchronous API endpoint, this is well understood. For an AI workflow that runs in the background, "availability" needs more precision.

Consider: the workflow endpoint returns HTTP 200 (available), but the underlying LLM provider is degraded, producing low-quality outputs with elevated latency. Traditional availability metrics say the service is up. The user experience says otherwise.

Production AI SLAs should track the full stack: API availability + LLM provider health + output quality metrics. A dashboard that shows green on availability but red on output quality tells a more honest story.

## Setting quality SLAs without overpromising

Quality SLAs are the hardest to set because output quality is partially outside your control — it depends on model behavior, which changes with provider updates, prompt sensitivity, and input distribution shift.

Practical approach:

1. Establish a baseline quality metric on a representative evaluation set before launch
2. Set the SLA at the baseline minus a reasonable buffer (not at the baseline itself — you will violate it immediately)
3. Run the evaluation continuously in production, sampling a small fraction of real outputs
4. Define what happens when quality drops below the SLA threshold: alert, fallback, human review escalation

The "define what happens" step is the one most teams skip. An SLA that has no consequence when violated is not an SLA — it is a suggestion.

## Communicating AI limitations to users

The hardest SLA conversation is with users who expect deterministic output from a non-deterministic system. "The AI might get this wrong" is true but not a useful thing to put in a product.

More useful framing: tell users what class of inputs the AI handles reliably (high-confidence zone), what class requires review (low-confidence zone), and what class it does not handle (out of scope). This sets expectations correctly and makes quality issues a system behavior rather than a random event.

---

AgentRuntime tracks run-level outcomes, latency per step, and step-level quality signals, giving product teams the data they need to measure against their AI SLAs continuously. [Join the waitlist](/waitlist) for early access.
