# AI Agents for Compliance: Why Auditability Is the Whole Game

Compliance use cases are among the most compelling applications for AI agents: reviewing contracts for regulatory clauses, flagging transactions against sanctions lists, monitoring communications for policy violations, auditing vendor certifications. The volume is high, the work is repetitive, and the cost of manual review is well understood.

They are also among the most demanding from an infrastructure perspective. In compliance, the audit trail is not a nice-to-have — it is the primary deliverable.

## What makes compliance different

In most AI workflows, the output is what matters. A customer support agent that drafts a good reply, a lead enrichment pipeline that scores a prospect correctly — the output is the product.

In compliance, the process is equally important to the output. When a regulator asks "how did you determine this transaction was not reportable?", "the AI said so" is not an acceptable answer. The acceptable answer is: here is what data was reviewed, here is the policy that was applied, here is the specific clause that the AI flagged or cleared, and here is the human who reviewed and approved the AI's determination.

This fundamentally changes the infrastructure requirements.

## The auditability stack

A compliance AI workflow needs to record, per run:

- **Input data**: exactly what was reviewed, including a hash or reference to the source document
- **Policy version**: which version of the regulatory rules or policy definitions was applied
- **Step-by-step reasoning**: not just the final determination, but the intermediate steps — which clauses were flagged, which were cleared, and why
- **Human review record**: who reviewed the AI determination, when, and what they decided
- **Final outcome**: the determined status with a complete provenance chain

This is different from general-purpose observability. General observability answers "what happened and why did it fail?" Compliance auditability answers "what was decided and can we prove it was decided correctly?"

## Immutability requirements

Audit records in compliance contexts cannot be modified after the fact. The record of what the AI determined — and what the human reviewer decided — must be immutable.

This has specific implications for storage: append-only writes, no soft deletes, cryptographic hashing of record contents to detect tampering. A compliance workflow built on a system where audit records can be updated (even with good intentions) does not satisfy the regulatory requirement.

## Policy versioning

Regulatory rules change. A transaction that was reportable under last year's rules may not be under this year's, or vice versa. When rules change, historical decisions must remain interpretable under the rules that were in effect at the time.

This requires versioning the policy definitions used at each run — not just "the AI said yes," but "the AI said yes using policy version 3.2.1, which was in effect from date X to date Y."

## Human-in-the-loop is mandatory, not optional

Unlike many AI use cases where human review is a quality enhancement, compliance workflows typically require human sign-off on AI determinations before any action is taken or any record is considered final. The AI is a first-pass reviewer and a documentation tool, not an autonomous decision maker.

This means the human review queue is a core component of the compliance workflow, not an exception path. The workflow pauses at the human review step, the reviewer receives the AI's determination with its supporting evidence, and the workflow resumes only after the reviewer approves or overrides.

## The cost of getting it wrong

The downside risk in compliance is asymmetric. An AI that misclassifies a transaction and the error is caught by a human reviewer in the workflow costs a few minutes. An AI that misclassifies a transaction, the error is not caught, and a regulator finds it months later costs a great deal more.

This changes the appropriate confidence threshold for AI determinations. In compliance, the right response to uncertainty is human escalation — not a best guess.

---

AgentRuntime's durable execution model records full step-level state per run, and its human task bus provides the review and approval infrastructure that compliance workflows require. Immutable run records with full provenance chains are a first-class concern. [Join the waitlist](/waitlist) for early access.
