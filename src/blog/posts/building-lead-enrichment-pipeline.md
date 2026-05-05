# Building a Lead Enrichment Pipeline with AgentRuntime

Sales teams have a data problem: new leads come in with a name, an email, and a company name. Reps need to know the company size, funding stage, tech stack, relevant news, and whether the ICP matches before they invest time on outreach. Manually researching each lead takes 15–30 minutes. At 50 new leads per day, that is more time than most reps have.

AI-powered lead enrichment solves this — but implementing it reliably requires more than a few LLM calls. Here is how to build it properly.

## The workflow

A production lead enrichment pipeline has five stages:

**1. Intake and deduplication**
A new lead arrives via webhook — from a web form, a CRM integration, or a list import. Before doing anything, check if this lead has already been enriched recently. Deduplication at intake prevents redundant enrichment work and avoids re-charging for the same API calls.

**2. Company research**
Pull publicly available information about the company: funding history from Crunchbase or PitchBook, LinkedIn headcount, recent news, technology signals from job postings. This stage calls multiple external APIs, so each call needs its own retry policy and idempotency key. If the company is not found in one source, the workflow continues with partial data rather than failing.

**3. Fit scoring**
Pass the collected company signals to an LLM with your ICP definition. Ask it to score the lead against each dimension of your ICP (company size, industry, growth signals, tech stack fit) and produce a structured score with a brief rationale per dimension. Use schema-constrained output — you need a numeric score per dimension, not a paragraph of prose.

**4. Personalization signals**
For leads that score above threshold, run a second LLM step to generate three to five specific personalization points: recent company announcements, relevant use cases given their industry, specific pain points implied by their tech stack. These are not generated email copy — they are research signals for the rep.

**5. CRM write-back**
Write the enrichment data back to the CRM record: fit score, signal summary, personalization points, and a timestamp. Flag the lead for rep review if the fit score exceeds your threshold.

## The reliability requirements

A lead enrichment pipeline runs at high volume and touches multiple external APIs. Getting the infrastructure right matters:

**Each external API call needs its own idempotency key.** If the workflow crashes after the Crunchbase call but before the CRM write, the retry should not re-call Crunchbase — it should resume from the CRM write step.

**Partial failure should not fail the whole run.** If LinkedIn rate-limits the company lookup, enrich with the data available and note the missing signal in the output. A partially enriched lead is more useful than an un-enriched one.

**The LLM scoring step should validate its output.** Define a schema for the fit score object — numeric scores per dimension, a total score, a brief rationale string — and validate every response before writing to the CRM.

**High-value leads can route to human review.** When the LLM identifies a lead that looks like a very strong ICP match but some signals are ambiguous, route to a human review queue rather than auto-publishing. A rep can confirm in 30 seconds and the lead lands in their priority list.

## What this looks like at scale

At 50 leads per day, this workflow is a minor background process. At 5,000 leads per day — common for a company running paid acquisition — it requires proper queue management, rate limit handling across multiple external APIs, and cost control on the LLM calls.

The enrichment cost per lead at scale is a unit economics question: if enrichment takes 30 minutes of rep time at $100/hour without automation, and costs $0.15 in API calls with automation, the ROI is straightforward. But only if the enrichment quality is reliable enough that reps trust and act on it.

---

AgentRuntime's durable execution model handles the multi-step, multi-API nature of enrichment pipelines: each external call is committed before the next begins, partial failures don't fail the run, and human review gates integrate natively with the workflow. [Join the waitlist](/waitlist) for early access.
