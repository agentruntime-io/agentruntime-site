# When to Chain LLM Calls and When Not To

The default assumption in AI workflow design is that more steps means more capability. Break the problem down, use one LLM call per sub-task, chain the outputs together. This produces better results than asking a single model to do everything — until it does not.

Knowing when to chain and when to collapse is one of the more counterintuitive skills in production AI system design.

## Why chaining works

Chaining — breaking a complex task into sequential LLM steps — works for several well-understood reasons:

**Focused context.** Each step operates on a narrow, relevant context. A step that only sees the input it needs to process is less likely to be distracted by irrelevant information.

**Intermediate validation.** Between steps, you can validate intermediate outputs. If step 2 produces a malformed result, you can detect and correct it before it contaminates steps 3 and 4.

**Different prompts for different concerns.** Extraction, reasoning, formatting, and critique are distinct concerns that benefit from distinct prompts. Combining them in a single prompt requires the model to mentally juggle multiple objectives simultaneously.

**Cost and latency optimization.** Earlier steps can use cheaper, faster models for preprocessing (classification, filtering) and reserve expensive models for the steps that genuinely need them.

## Why chaining fails

Chaining also introduces costs that compound with each step:

**Error propagation.** A mistake in step 2 is passed to step 3, which builds on it, and so on. By step 5, a small early error can produce a completely wrong final output. In a single-step approach, the error is contained.

**Latency accumulation.** Each additional LLM step adds latency. A five-step chain with 3-second steps has a 15-second minimum latency even with perfect performance. For user-facing workflows, this is often unacceptable.

**Context loss at boundaries.** Each handoff between steps requires the next step's prompt to reconstruct relevant context from the previous step's output. Information that was implicit in the original input can be lost if it was not explicitly captured in the intermediate output.

**Cost multiplication.** Each step has its own input token cost. A chain that processes a 2,000-token document at five steps passes and re-processes that context multiple times.

## The guideline: chain for separation of concerns, not for complexity

The right reason to chain LLM calls is **separation of concerns** — when steps have fundamentally different objectives, different appropriate models, or when intermediate validation is genuinely valuable.

The wrong reason to chain is **hoping the model can handle complexity in pieces that it should handle as a whole**. Modern frontier models are capable of substantial multi-step reasoning in a single call when given a well-structured prompt. Artificially decomposing a reasoning problem into steps can actually hurt quality by forcing intermediate serialization of information that the model handles better internally.

A useful diagnostic: if removing a step and folding its objective into an adjacent step produces the same quality output, the step should be removed.

## Dynamic step counts

The most powerful chaining patterns are dynamic — the number of steps is determined at runtime, not hardcoded. A research agent that iterates until a confidence threshold is met, a validation loop that retries extraction with a repair prompt on schema failure, a hierarchical decomposition that spawns sub-agents based on problem structure.

Static chains are easy to reason about. Dynamic chains require careful termination conditions and loop budgets — an agent that can iterate indefinitely is an on-call incident waiting to happen.

---

AgentRuntime's workflow graph supports both static multi-step chains and dynamic patterns (loops, conditional branches, variable fan-out) with per-step model configuration and explicit termination conditions. [Join the waitlist](/waitlist) for early access.
