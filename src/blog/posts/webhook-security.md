# Webhook Security for AI Workflows: What Most Teams Miss

Webhooks are the front door of most event-driven AI systems. A payment succeeds, a ticket is created, a form is submitted — an external service sends an HTTP POST to your endpoint, and your workflow begins.

The security requirements for webhook receivers are well understood in theory. In practice, most implementations skip at least one of them, and the skipped one is usually the one that matters.

## Signature verification

Every serious webhook provider (Stripe, GitHub, Twilio, Slack, PagerDuty) signs their payloads with an HMAC signature using a secret you configure. The signature is sent in a header — typically `X-Signature` or `X-Hub-Signature-256` — and allows you to verify that the request genuinely came from the provider and was not tampered with in transit.

Verifying the signature is the single most important webhook security control. Without it, anyone who knows your endpoint URL can send arbitrary payloads and trigger workflow execution.

```
expected = HMAC-SHA256(secret, raw_request_body)
if not constant_time_compare(expected, header_signature):
    return HTTP 401
```

Two details matter here: use the **raw** request body for the HMAC, not a parsed version (JSON parsing can change byte representation), and use **constant-time comparison** to prevent timing attacks.

## Replay attack prevention

A valid, signed webhook payload can be captured and replayed. An attacker who intercepts a legitimate "payment succeeded" webhook can re-send it hours later and trigger duplicate processing.

The defense is a timestamp check: most providers include the event timestamp in the payload or a header. Reject any request where the timestamp is more than 5 minutes old. Combined with signature verification, this prevents replay attacks because a captured payload cannot be re-sent after the timestamp window closes.

## Idempotency for duplicate delivery

Webhook providers guarantee at-least-once delivery. The same event may be delivered more than once — immediately after the original, or days later if the provider retried after your endpoint returned an error.

Every webhook handler should be idempotent: processing the same event twice should produce the same result as processing it once. This means deriving a stable event ID from the payload and deduplicating before triggering workflow execution.

Most providers include a unique event ID in the payload or headers. Use it. If your provider doesn't, derive one deterministically from the event content.

## Endpoint authentication

Your webhook endpoint should not be publicly discoverable. While signature verification prevents spoofed payloads, a publicly discoverable endpoint invites scanning, probing, and denial-of-service attempts.

Options in order of preference: a shared secret in the URL path (not query string — path parameters are less likely to appear in access logs), IP allowlisting for providers that publish their IP ranges, or mTLS for high-security environments.

## What to do with invalid requests

Log and discard, but do not expose why the request was rejected. A response of `HTTP 401 Unauthorized` with no body is correct. Do not return "invalid signature" or "timestamp expired" — that information helps attackers understand what controls are in place.

Also: return `HTTP 200` or `HTTP 202` quickly, before doing any workflow processing. If your endpoint is slow to respond, the provider may retry or mark the webhook as failed. Queue the work and process asynchronously.

## The most commonly skipped control

Signature verification is the one most teams implement. The most commonly skipped is the replay check. It requires additional state (storing recently seen event IDs) and feels low-priority until the incident report asks why a charge was processed twice.

The correct posture: implement all four controls (signature verification, timestamp check, idempotency, endpoint obscurity) before your webhook endpoint accepts production traffic.

---

AgentRuntime's webhook trigger handler performs signature verification and derives idempotency keys from the triggering event, preventing duplicate workflow runs from repeated delivery. [Join the waitlist](/waitlist) for early access.
