# Context Window Management at Scale: What Breaks and How to Fix It

The context window is the most constrained resource in an AI system. Frontier models have made enormous progress expanding it — 128k, 200k, 1M token windows are now available — but larger context windows do not eliminate the need to manage context deliberately. They just push the breaking point further out.

At scale, context window mismanagement is one of the most common sources of cost overruns, quality degradation, and subtle correctness bugs in AI workflows.

## The three context window failure modes

**Token limit exceeded.** The simplest failure: you pass more tokens than the model accepts and get an error. This is easy to detect and prevent with input token estimation, but teams often miss it because development workloads are smaller than production ones.

**Quality degradation in long contexts.** Most LLMs have a known phenomenon called the "lost in the middle" problem: information placed in the middle of a very long context is processed less reliably than information near the beginning or end. A workflow that works well with 10 pages of context may produce worse output with 100 pages, even if the relevant information is technically present somewhere in that 100 pages.

**Cost scaling.** Prompt tokens and completion tokens both cost money. A workflow that passes full conversation history to every step — a growing message array — accumulates cost linearly with run depth. At low volume this is invisible. At scale it is significant.

## Strategies for managing working context

**Selective injection.** For each LLM call, inject only what that step needs — not the entire run history. If step 5 needs the output of step 2, pass step 2's output explicitly. Do not include steps 1, 3, and 4 unless they are actually relevant.

**Progressive summarization.** For long-running workflows, add summarization steps at natural breakpoints. A summary step that condenses the accumulated work so far into a compact representation allows later steps to reference a short summary rather than a long history.

**Retrieval over injection.** For knowledge-intensive workflows, vector retrieval often outperforms full context injection. Instead of including the entire source document in the context, retrieve the 3-5 most semantically relevant passages for each LLM call. This reduces token usage and can actually improve quality by keeping the context focused.

**Sliding window.** For conversation-like workflows, maintain a sliding window of the N most recent turns rather than the full history. Combine with a running summary of earlier context for continuity.

## Token budgeting

Production AI workflows should have explicit token budgets at the step level: a maximum number of input tokens that triggers truncation or retrieval-based compression before the LLM call is made.

This is different from relying on the model's context limit as the hard stop. By the time you hit the context limit, you have already paid for the tokens and may have received a degraded response. Token budgeting catches the problem before the call.

## Measuring context efficiency

Context efficiency — how much of the injected context is actually relevant to the output — is worth tracking for high-volume workflows. A useful heuristic: if a step consistently uses a small fraction of its injected context, that context should be pruned. The signal is output quality changes (or lack thereof) when context is reduced.

This is not a metric most teams track today. It will be table stakes for teams managing AI at scale.

---

AgentRuntime manages run state as explicit step inputs and outputs rather than growing message arrays, keeping context windows focused and enabling selective injection by design. [Join the waitlist](/waitlist) for early access.
