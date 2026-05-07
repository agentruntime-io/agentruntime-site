# Rate Limits Are Not Your Problem — Until They Are

LLM API rate limits are invisible in development. Your test suite runs sequentially, your staging environment gets light traffic, and the endpoints respond in milliseconds. Then you ship to production, a workflow triggers for five hundred users simultaneously, and everything backs up behind a wall of HTTP 429s.

Rate limit handling is one of those infrastructure concerns that feels like a future problem until suddenly it is your only problem.

## What rate limits actually govern

Different providers enforce limits differently, but most apply constraints across several dimensions simultaneously:

- **Requests per minute (RPM)** — the number of API calls you can make per time window
- **Tokens per minute (TPM)** — the total input + output tokens across all calls in the window
- **Tokens per day (TPD)** — a longer horizon cap that catches sustained high-volume usage
- **Concurrent requests** — some providers also limit inflight requests at a point in time

In an AI workflow, a single run can touch all of these. A workflow that makes four LLM calls per execution, triggered by a thousand concurrent events, will hit TPM limits before RPM limits — but the symptoms look identical from the outside: failed requests with a 429 response.

## The naive approach and why it breaks

Most teams handle this initially by catching 429 responses and retrying after a fixed interval. This works when rate limits are occasional. It fails when you hit sustained limits: all workers back up simultaneously, retry at the same time, and the storm of retries amplifies the original pressure.

The better approach is a shared rate limit budget managed ahead of the call, not a retry loop after the 429. A token budget estimator — rough but functional, since output tokens are unpredictable — reserves capacity before making the call. When the budget is exhausted, the workflow waits at a controlled queue rather than attempting and failing.

## Tiered model selection as a cost lever

Rate limits and cost are two sides of the same coin. The most effective single lever for both is routing lower-complexity tasks to smaller, faster, cheaper models.

A workflow that uses a frontier model for every step — classification, extraction, summarization, final generation — is using a sledgehammer for tasks that a smaller model handles correctly and cheaply. A routing layer that maps task type to model tier can reduce cost by 60-80% without affecting output quality on simpler steps, while also distributing load across different rate limit buckets.

## Prompt caching

Several providers now support prompt caching: when the same long prefix appears in multiple calls, the provider serves the cached KV activations at reduced cost and latency. For workflows with a large, stable system prompt, this can meaningfully reduce both cost and latency without any change to output behavior.

The catch is that caching is per-provider and requires specific prompt construction patterns. It needs to be an explicit design consideration, not a happy accident.

## What a production cost model looks like

Teams serious about LLM cost management track several metrics:

- **Cost per run** by workflow type
- **Token distribution** — what fraction of cost is input vs output
- **Model tier usage** — what fraction of calls use which model
- **Cache hit rate** for providers that support it
- **Rate limit rejection rate** — 429s as a fraction of total calls

Without these, cost optimization is guesswork. With them, it becomes an engineering problem with clear levers.

---

AgentRuntime records token usage per step, per run, and per workflow type, and supports per-step model configuration so routing decisions are explicit in the workflow definition rather than scattered across application code. [Join the waitlist](/waitlist) for early access.
