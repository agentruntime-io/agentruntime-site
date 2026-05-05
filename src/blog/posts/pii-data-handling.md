# AI Agents and PII: Data Handling Patterns That Keep You Compliant

AI workflows process sensitive data by design. A customer support agent reads ticket content that includes names, email addresses, account numbers, and complaint details. A document processing pipeline ingests contracts with employee compensation. A lead enrichment workflow handles prospect information.

Every piece of personal data that flows through an AI workflow is in scope for GDPR, CCPA, HIPAA (if healthcare), and whatever regulations apply to your industry and geography. Getting this wrong is not a technical debt problem — it is a legal and reputational one.

## Map the data flows before writing code

The most important step in building a privacy-respecting AI workflow happens before any code is written: map every piece of personal data, where it comes from, where it goes, how long it is retained, and who can access it.

For each piece of PII in the workflow:
- What is the legal basis for processing it?
- Is it being sent to a third-party LLM provider?
- Is it being stored in run state? For how long?
- Who has access to run history and traces?
- Is it being used to train or fine-tune any model?

Most teams answer "I don't know" to several of these. The time to find out is before the workflow processes its first production record.

## LLM providers and data processing agreements

When you send data to an LLM API, you are sharing it with a third party. Most enterprise LLM providers offer data processing agreements (DPAs) and options to opt out of training data use. This is non-negotiable for any workflow that processes PII.

Before putting personal data through any LLM provider, verify:
- A signed DPA is in place
- The provider's retention policy for API inputs matches your obligations
- Your data residency requirements are satisfied by the provider's available regions

"We just use the API" is not a sufficient answer for a compliance audit.

## PII minimization in prompts

Send only what the LLM needs for the task. If a classification step only needs the subject line of a support ticket to route it to the right queue, do not pass the full ticket body including the customer's account details.

PII minimization reduces exposure surface. If a prompt does not contain a customer's full name and account number, they cannot be leaked through the model's output or retained in the provider's infrastructure.

Automated PII detection — running inputs through a pattern matcher or a specialized detection model before passing them to the main LLM — can flag or redact sensitive fields as an additional layer.

## Run state and trace retention

Every step's inputs and outputs stored in run state is potentially storing PII. Retention policies for run state and traces need to be as intentional as retention policies for production databases.

Define:
- How long is run state retained?
- Is PII in run state anonymized or pseudonymized after the primary processing is complete?
- Does the right-to-erasure (GDPR Article 17) requirement extend to run history? If a customer requests deletion, does that include their data in workflow run records?

These questions are easier to answer before the system is built than after.

## Access control for run history

Run traces and state records are observability data but they often contain the same PII as the operational data. Access to run history should be scoped to the same roles that have access to the underlying data, not treated as a globally accessible debugging tool.

An engineer who does not have access to customer records in production should not have unrestricted access to workflow traces that contain those same records.

---

AgentRuntime's run state model supports configurable retention policies per workflow type, and access to run history is scoped by project and role. [Join the waitlist](/waitlist) for early access.
