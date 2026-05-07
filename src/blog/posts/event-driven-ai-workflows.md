# Event-Driven AI Workflows: Building Agents That React

Most AI workflow tutorials show the same trigger model: a human calls an API endpoint, the workflow runs, the workflow returns a result. This works for request-response use cases. It breaks down for everything else.

Production AI systems spend most of their time reacting to things that happen: a new record is created in a database, a webhook arrives from a payment provider, a file lands in a storage bucket, a scheduled job fires, a threshold is crossed in a monitoring system. Building agents that respond to these events — reliably, at scale, without polling — requires a different architectural model.

## Why polling is not the answer

The natural first implementation is polling: run a cron job every minute, check if there is new work, process it if there is. This works at low volume. At scale it creates several problems.

Polling intervals create latency floors. If you check every minute, your median response time is thirty seconds even when the system is idle. Reducing the interval helps until it doesn't — at high frequency, polling becomes constant load rather than event-driven response.

Polling also creates fan-out problems. When there is a burst of events, a polling loop processes them sequentially. A true event-driven system can fan out processing across many concurrent workers.

## The event queue model

The more scalable model puts a durable queue between event producers and workflow consumers. When an event occurs, it is written to the queue immediately. Worker processes pull from the queue and trigger workflow runs. The queue provides:

- **Durability**: events are not lost if the consumer is temporarily unavailable
- **Fan-out**: multiple consumers can process events concurrently
- **Back-pressure**: producers do not need to wait for consumers; they write to the queue and continue
- **Replay**: for some queue implementations, the event stream is replayable, enabling backfill and debugging

For AI workflows specifically, the queue also decouples the triggering event from the workflow execution, which matters when LLM calls are slow and the triggering system cannot wait.

## Webhook reliability

Webhooks are the most common source of external events for AI workflows: a user submits a form, a payment succeeds, a ticket is created in a support system. Webhook delivery is inherently unreliable — the sending system expects a fast HTTP response, does not retry forever, and may drop events if your endpoint is slow or down.

The correct pattern: receive the webhook immediately, write the event to a durable queue, return HTTP 200, and process the event asynchronously. This makes your webhook endpoint fast and reliable regardless of how long the downstream workflow takes.

Never do synchronous LLM work in a webhook handler. The LLM call alone can exceed the timeout window most webhook senders enforce.

## Triggering workflows from database events

Change data capture (CDC) — streaming database change events to a queue — enables workflows that react to data changes without requiring the writing system to know about the workflow. A new user row triggers an onboarding workflow. A support ticket update triggers a re-classification agent. A contract status change triggers a compliance review.

This decoupling is powerful: the workflow system is a subscriber to what already exists, not a new dependency that application code needs to call.

## Idempotency is especially important for event-driven systems

At-least-once delivery is the standard guarantee for most queues. The same event may be delivered twice — on restart, after a consumer crash, or due to delivery guarantees in the queue implementation. Every workflow triggered by an external event needs to be idempotent: receiving the same event twice should produce the same result as receiving it once.

This means deriving workflow run IDs from the event itself — a deterministic hash of the event content or a deduplification key provided by the sending system — so duplicate event deliveries map to the same run ID and are safely skipped if already processed.

---

AgentRuntime's event relay layer supports multiple trigger sources — HTTP webhooks, scheduled triggers, and queue-based events — with idempotency keys derived from the triggering event. [Join the waitlist](/waitlist) for early access.
