# Credential Management for AI Agents: Beyond Environment Variables

AI agents call external services. External services require credentials — API keys, OAuth tokens, database passwords, webhook secrets. How you manage those credentials is a security decision that most teams make badly, at least initially.

The default approach is environment variables. It works. It is also how credentials end up in deployment logs, in CI/CD output, in Docker image layers, and eventually in a security incident post-mortem.

This post covers what production credential management for AI agents looks like and why it matters more for agent systems than for conventional backends.

## Why agents have a harder credential problem

A conventional backend service has a fixed set of credentials. The payment service uses the Stripe key. The user service uses the database password. You configure them once, they live in a secrets manager, and they do not change often.

AI agents have a different pattern. A single workflow may call five different external services — a CRM, a document store, an email provider, a payment processor, and an internal API. Each service has its own credential. The set of services changes as you add MCP tools. Different workflows need access to different credential subsets. And because agents can make decisions autonomously, the blast radius of a compromised credential is larger — the agent may make many calls before anyone notices.

## The four properties of proper credential management

### 1. Storage isolation

Credentials should live in a dedicated secrets manager — HashiCorp Vault, AWS Secrets Manager, Azure Key Vault — not in environment variables, `.env` files, or application configuration. The secrets manager handles encryption at rest, access logging, and audit trails. The application never sees the raw credential; it requests it from the vault at runtime.

### 2. Least-privilege scoping

Each credential should be scoped to the minimum necessary access. An agent workflow that reads from a CRM should not have credentials that can write to it. An agent that processes invoices should not have credentials that can modify customer billing settings.

The practical implementation: credentials are stored per MCP tool, not per workflow. The billing tool has billing credentials. The CRM tool has CRM credentials. A workflow that uses both tools gets access to both, but only through the tool interfaces — it never handles the raw keys directly.

### 3. No credentials in workflow definitions

A workflow definition is a JSON document that describes which steps to execute and in what order. It should contain no credentials — not inline, not as references to environment variables, not in any form that would be visible to anyone who can read the workflow definition.

The workflow says "call the CRM tool." The runtime resolves which credential is needed for that tool, fetches it from the vault, and uses it for the call. The workflow author never sees the credential and cannot accidentally expose it.

### 4. Rotation without redeployment

Credentials should be rotatable without redeploying workflows. When an API key is compromised or expires, you update it in the vault. Every subsequent call from every workflow that uses that tool gets the new credential. No workflow changes, no redeployments, no coordination across teams.

## What credential sprawl looks like and why it compounds

The typical progression for a team that does not address credential management early:

1. Dev puts the API key in a `.env` file. Fine for development.
2. The same key goes into a GitHub Actions secret for CI. Okay so far.
3. The key gets hardcoded in a Dockerfile ENV for "just this deployment." Not fine.
4. Three more workflows use the same key. Now you cannot rotate it without touching five places.
5. Someone leaves the team. You do not know which keys they had access to.
6. An API provider reports your key was found in a public repository. Incident.

The solution is not better key hygiene. The solution is an architecture that makes credential sprawl structurally impossible.

## Transit encryption

Beyond storage, credentials should be encrypted in transit between the vault and the runtime. This means:

- TLS on all connections to the vault
- Short-lived vault tokens that expire after use
- No credential values written to logs, traces, or run event records

A structured log that contains `api_key: sk-...` is a credential leak, even if the log is internal. Your observability infrastructure should scrub credential-shaped strings from all logged data.

## The audit requirement

In regulated industries — financial services, healthcare, government — you need to be able to answer: "Which credential was used for this operation, by which workflow, at what time, with what result?" This requires that credential usage is logged at the vault level, tied to a run ID and step ID that links back to your workflow trace.

Most teams discover this requirement during their first compliance review, not before.

---

AgentRuntime stores per-MCP credentials in HashiCorp Vault with transit encryption, fetches them at step execution time, and never surfaces credential values in workflow definitions, logs, or run event records. [See the documentation](/docs) or [join the waitlist](/waitlist).
