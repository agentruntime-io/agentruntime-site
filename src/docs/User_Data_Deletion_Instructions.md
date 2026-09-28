# USER DATA DELETION INSTRUCTIONS

**Effective Date:** September 28, 2026  
**Last Updated:** September 28, 2026

This page describes how to delete or remove **personal data** that **AgentRuntime Labs Ltd** ("**AgentRuntime**," "**we**," "**us**") processes when you use the AgentRuntime console, APIs, and related services (collectively, the "**Services**").

It applies to data we collect and store as part of operating the platform—not only data from third-party integrations.

For rights, retention principles, and contact details, see our [Privacy Policy](/legal/privacy-policy) (especially Section 8).

### Quick reference

| Your goal | What to do |
| --- | --- |
| Remove one integration (WhatsApp, Gmail, etc.) and its stored tokens | **Section 1(a)** — Connections → delete/disconnect |
| Remove connector/MCP config or automation data you control | **Section 1(b)–(c)** — MCP / workflows / webhooks in the console |
| Delete your **entire user account** or all personal data we hold | **Section 2** — email **privacy@agentruntime.io** (required today; not a one-click console action) |
| Stop Meta from sharing more data + delete Meta copies we store | **Section 4** + Section 1(a) or 2 |
| How long deletion takes and what we may keep | **Section 3** |

---

## 1. WHAT YOU CAN DELETE YOURSELF (CONSOLE)

If you have access to [https://console.agentruntime.io/](https://console.agentruntime.io/), you can remove many categories of data without contacting support:

### (a) Integration connections and credentials

1. Open **Connections** (or **Integrations → Connections**).
2. Select the integration (for example **WhatsApp**, Gmail, Slack, or another connector).
3. **Disconnect**, **remove**, or **delete** the connection for that workspace.

This deletes or disconnects stored credentials (including tokens and integration identifiers) for that connection and stops further sync or messaging through AgentRuntime for that link.

### (b) MCP / connector configuration

1. Open **MCP** or **Connectors** (product navigation may vary by workspace).
2. Remove configuration profiles, archive instances, or delete connection templates you no longer need.

Removing a connection or profile deletes associated Vault-backed secrets for that resource where our product is designed to do so.

### (c) Workflows, webhooks, and automation data

1. Delete workflows, inbound webhook subscriptions, or other resources you created that process personal data.
2. Delete or export run history where the product provides those controls.

Workspace admins control what remains in the tenant; deleting content you own reduces stored operational and message-related data tied to your automations.

### (d) Account profile

Under **Settings** in the console, you can update certain profile fields. That does **not** delete your whole account.

---

## 2. REQUEST FULL ACCOUNT OR WORKSPACE DELETION

**Full account deletion is not self-service in the console today.** To delete your **user account** or to request deletion of **all personal data** we hold about you (including data you cannot remove in the UI):

**Email:** [privacy@agentruntime.io](mailto:privacy@agentruntime.io)

**Subject line (suggested):** Data deletion request — AgentRuntime

Please include:

- The email address associated with your AgentRuntime account.
- Your organization or workspace name (if applicable).
- Whether you are the account owner or an authorized admin.
- What you want deleted (user account only, specific workspace, or specific integration data).

We may verify your identity before processing the request.

**Organization customers:** If your company uses AgentRuntime under a B2B agreement, your admin may also manage users and data inside the tenant. Contractual or DPA terms may apply in addition to this page.

---

## 3. TIMELINE, BACKUPS, AND EXCEPTIONS

When we confirm a valid deletion request, we delete or anonymize personal data in **active systems** within a **commercially reasonable period**, typically within **30 days**, unless applicable law requires longer retention (for example, billing, tax, security, fraud prevention, or dispute records).

Encrypted **backup** copies may persist for a limited time and are purged on our normal backup rotation.

We may retain **aggregated or de-identified** data that cannot reasonably be used to identify you.

---

## 4. META (FACEBOOK / WHATSAPP) PLATFORM DATA

Meta requires apps that use Facebook Login or WhatsApp to publish data-deletion instructions. This section covers **Platform Data** we receive from **Meta** (as defined in Meta’s developer terms).

### 4.1 What Meta-related data we may hold

- Information from **Facebook Login** used to complete **WhatsApp Embedded Signup** (authentication and permissions granted during onboarding).
- **WhatsApp Business** connection data (WABA ID, phone number ID, access tokens stored as workspace credentials).
- **WhatsApp message** content and metadata processed through webhooks and automations, and delivery status events.

We do not sell Meta Platform Data.

### 4.2 Delete Meta data in AgentRuntime

Follow **Section 1(a)**: remove the **WhatsApp** (or other Meta-linked) connection in **Connections**.

For full user account deletion, follow **Section 2**.

### 4.3 Revoke access in Meta

You can stop future sharing from Meta’s side:

1. Facebook **Settings & privacy** → **Settings**.
2. **Business integrations** or **Apps and websites**.
3. Remove **AgentRuntime v1** (or the AgentRuntime app you authorized).

Revoking access in Meta does not automatically delete copies already stored in AgentRuntime; use Section 1 or 2 above.

### 4.4 Meta-specific deletion requests

When emailing **privacy@agentruntime.io** about Meta data, also include (if known):

- Facebook profile name or Facebook user ID.
- WhatsApp Business phone number or WABA ID.

---

## 5. QUESTIONS

**AgentRuntime Labs Ltd — Privacy Team**  
Email: [privacy@agentruntime.io](mailto:privacy@agentruntime.io)

---

*© 2026 AgentRuntime Labs Ltd. All rights reserved.*
