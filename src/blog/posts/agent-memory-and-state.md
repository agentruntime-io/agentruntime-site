# The Agent Memory Problem: State, Context, and Recall

LLMs are stateless. Every call starts from a blank slate. The context window is the only memory the model has, and it is finite, expensive, and gone the moment the call ends.

Building AI agents that maintain coherent state across steps — across multiple LLM calls, across time, across sessions — is one of the hardest problems in production agent infrastructure. Most implementations get it wrong in ways that only become visible at scale.

## The three kinds of memory your agent needs

**Working memory** is what the current step needs to execute. The inputs passed to this step, the outputs of previous steps, the tool results accumulated so far. This lives in the context window. It is ephemeral by design.

**Run memory** is the accumulated state of the current workflow execution. Every step's inputs and outputs, the decisions made, the branches taken. This needs to outlive the LLM call and survive crashes. It belongs in a persistent store, not in-memory variables.

**Long-term memory** is context that should inform future runs — facts learned about a specific user, entity data extracted from previous executions, cached results that are still valid. This is retrieval, not context injection, and it requires a different storage model than run state.

Most agent implementations conflate all three. They stuff everything into the context window, which breaks when the window fills, costs more than necessary, and makes the agent's behavior harder to predict and audit.

## The context window is not a database

A common pattern in early-stage agents: pass the entire history of previous steps as a growing message array. This works in a demo. In production it creates several problems.

First, cost grows linearly with run depth. A workflow with thirty steps passes thirty step outputs to every subsequent LLM call, even when most are irrelevant.

Second, models degrade at the edges of long contexts. The middle of a large context window is processed less reliably than the beginning and end. Injecting everything does not mean the model uses everything.

Third, the data is not persisted anywhere besides the context array. A crash loses it. There is no audit trail. Replaying the run means re-inferring every step.

## What persistent run state looks like

Each step in a durable workflow should read its required inputs from a run state store and write its outputs back to it. The LLM call gets only what that step needs — not the entire history.

This makes the workflow inspectable: you can load any run and see exactly what was known at each step. It makes it debuggable: you can replay a single step with modified inputs. It makes it resumable: a crash mid-run restarts from the last committed step, not from the beginning.

## Selective context injection

For long-running agents, not every piece of prior state is relevant to every step. A summarization step at a natural breakpoint — producing a compact summary of what has been learned so far — reduces token usage and keeps the working context focused.

Some workflows benefit from retrieval-augmented context: instead of injecting all prior outputs, a vector search over run history surfaces the three or four most relevant prior results for the current step. This is more complex to implement but the right model for agents that accumulate substantial history over time.

## Long-term memory as infrastructure

Knowledge that should persist across runs — user preferences, entity facts, cached API responses — should be treated as infrastructure, not as a feature to bolt on later. This means a retrieval layer: a vector store or key-value store with explicit write and read operations, not an ever-growing context.

The boundary between run memory and long-term memory is a design decision that affects cost, correctness, and privacy. Getting it right early is much easier than refactoring it after the fact.

---

AgentRuntime manages run state as durable, step-committed records in PostgreSQL. Every step reads from and writes to run state explicitly, keeping context windows focused and runs fully inspectable. [Join the waitlist](/waitlist) for early access.
