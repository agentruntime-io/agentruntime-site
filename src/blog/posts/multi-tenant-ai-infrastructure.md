# Multi-Tenant AI Infrastructure: Isolating Workflows Across Customers

If you are building an AI product that serves multiple customers — a SaaS platform, an enterprise software company, an agency — your agent infrastructure needs to be multi-tenant from the beginning. Retrofitting multi-tenancy into an existing single-tenant system is one of the most expensive re-engineering projects a team can take on.

This post covers what multi-tenancy means for AI workflow infrastructure, the failure modes of naive implementations, and the architectural patterns that work.

## What multi-tenancy means in practice

A multi-tenant AI infrastructure means that multiple customers share the same underlying infrastructure — the same workflow engine, the same message brokers, the same observability stack — but each customer's data, credentials, and execution are completely isolated from every other customer's.

Isolation must hold across:

- **Data** — Customer A cannot read Customer B's workflow definitions, run history, inputs, or outputs
- **Execution** — A high-volume customer cannot degrade the performance experienced by other customers
- **Credentials** — Customer A's API keys are not accessible to Customer B's workflows
- **Observability** — Logs and traces for Customer A's runs do not appear in Customer B's dashboards

Breaking any of these is a serious incident, either a security breach (data leakage) or an availability problem (noisy neighbour).

## The naive approach and why it fails

The most common naive implementation is a single deployment with a tenant ID column in the database. All runs go into the same table, filtered by `tenant_id`. All events go through the same message broker topics. All credentials live in the same secrets manager path.

This works until it does not:

**At the database level:** A slow query from a high-volume tenant holds locks that delay other tenants. Without proper indexing and query isolation, one tenant's load affects everyone.

**At the message broker level:** A single event stream means one tenant's burst traffic can starve other tenants of processing capacity. Consumer groups help, but a truly noisy tenant with a large backlog creates tail latency for all.

**At the credential level:** If a single vault path compromise can expose all tenants' credentials, your isolation is theoretical rather than actual.

**At the observability level:** Without tenant-scoped log streams and trace filtering, a security review or a debugging session exposes other tenants' data to whoever is doing the review.

## The patterns that work

### Stream-level tenant isolation

Rather than routing all events through a shared stream, give each tenant isolated stream prefixes. In Redis Streams, this looks like `tenant:{id}:workflow:events` rather than `workflow:events`. Consumer groups per tenant mean that one tenant's backlog has no effect on another tenant's processing latency.

This is additive infrastructure: a new tenant is onboarded by creating their stream namespace. Removing a tenant is clean namespace deletion.

### Per-tenant credential scopes

Credentials in a secrets manager should be scoped under tenant-specific paths: `vault/data/{tenant_id}/mcp/{tool_id}`. This means:

- A breach of one tenant's secret path does not expose another's
- Access control policies can be written per tenant
- Audit logs show which tenant accessed which credential

### Tenant context propagation

Every event, log line, and trace span should carry the tenant identifier. This is not just for filtering — it is for accountability. When you receive a security inquiry or a compliance audit request for a specific tenant, you need to be able to produce all data associated with that tenant cleanly and completely.

In practice: every API request carries a tenant header that is injected into the context at the entry point and propagated through all downstream processing, including log structured data and OpenTelemetry span attributes.

### Execution limits per tenant

Multi-tenancy without execution limits is one noisy neighbour away from a service degradation incident. Each tenant should have configurable limits:

- Concurrent run limit: how many workflow runs can this tenant have in flight simultaneously
- Rate limits: how many workflow starts per minute
- Resource limits: maximum workflow execution time per run

These limits protect other tenants from being affected by one tenant's unusual load patterns, and they protect you from unexpected infrastructure costs when a tenant runs a batch job that is 10x their normal volume.

## The SLA challenge

In a multi-tenant system, your SLA is only as strong as your worst-performing isolation boundary. If one tenant can reliably degrade another tenant's throughput, your 99.9% uptime guarantee is effectively a 99.9% uptime guarantee for the average case, not for any specific tenant in the presence of load from others.

Production multi-tenant AI infrastructure requires explicit SLO monitoring per tenant — not just aggregate uptime, but per-tenant throughput, latency, and error rates. When a tenant is consistently at their limit, that is a signal to have a conversation about plan upgrades, not a signal to ignore until they start affecting other tenants.

## Starting right

The architectural changes required to move from single-tenant to multi-tenant infrastructure are significant. The right time to make them is before you have customers, not after.

The three things to get right from the start:

1. **Tenant-scoped event streams** — isolate message passing per tenant from day one
2. **Credential namespacing** — never store credentials in a shared path
3. **Tenant context propagation** — every event, log, and span carries the tenant identifier

Everything else can be added incrementally. These three are structural decisions that are expensive to retrofit.

---

AgentRuntime uses isolated Redis Stream prefixes per tenant, HashiCorp Vault credential namespacing, and tenant-scoped OpenTelemetry context propagation. Multi-tenancy is a first-class design constraint, not an afterthought. [Learn more in the documentation](/docs) or [join the waitlist](/waitlist).
