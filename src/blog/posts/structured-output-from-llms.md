# Structured Output from LLMs: Why JSON Mode Is Not Enough

Getting an LLM to return structured data sounds simple. Turn on JSON mode, add "respond in JSON" to your prompt, and parse the response. In a demo this works reliably. In production it breaks in ways that are predictable, preventable, and surprisingly expensive to debug.

## What JSON mode actually guarantees

Most LLM providers offer a "JSON mode" or "response format" parameter that constrains the output to valid JSON. This is useful — it eliminates the most common failure mode of the model returning conversational text around the JSON.

What it does not guarantee:

- That the keys present are the keys you expected
- That the values are the right types
- That required fields are not missing
- That enum fields contain one of the allowed values
- That numeric fields are within valid ranges

JSON mode says "this is valid JSON." It says nothing about whether the JSON matches your schema.

## Schema validation at the application layer

The first line of defense is explicit schema validation on every LLM output, before that output is used for anything.

Define your expected schema — use JSON Schema, Zod, Pydantic, or whatever your language ecosystem provides — and validate every response against it before trusting it. When validation fails, you have a choice: retry with a repair prompt, fall back to a simpler model, or surface the failure for human review.

Do not attempt to parse-and-hope. An LLM that returns `{"score": "high"}` when you expected `{"score": 0.87}` will cause a type error in the best case and silently corrupt downstream state in the worst.

## Structured output APIs go further

Several providers now support structured output APIs that go beyond JSON mode: you provide a JSON Schema and the model is constrained to produce output that conforms to it, not just output that is valid JSON. OpenAI's structured outputs and Anthropic's tool-use response format both work this way.

These are significantly more reliable than prompt-based JSON extraction for complex schemas. They shift the constraint from "the model hopefully follows the prompt" to "the sampling process is constrained by the schema." The failure rate on required fields and type conformance drops dramatically.

The tradeoff: not all models and providers support schema-constrained output, and complex schemas with deep nesting or union types can cause unexpected truncation or refusal in some models.

## Retry-on-validation-failure patterns

Even with schema-constrained output, occasional validation failures happen. A robust pattern:

1. Attempt the structured LLM call with your schema
2. Validate the response
3. On validation failure, construct a repair prompt: "Your previous response was missing the `confidence` field. Here was your response: {response}. Please respond again including all required fields."
4. Retry once with the repair prompt
5. On second failure, route to dead-letter or human review

The repair prompt approach works well because the model can often self-correct when shown its specific failure. It is much more effective than a blind retry.

## Output schemas as versioned contracts

In a production system, the schema your workflow expects is a contract. When you update the schema — adding a required field, changing a type, renaming a key — every workflow that produces or consumes that output is potentially broken.

Treat output schemas with the same rigor as API contracts: version them, migrate consumers explicitly, and do not make breaking changes silently. This is especially important in multi-step workflows where one step's output is another step's input.

---

AgentRuntime's step definition model supports explicit input and output schemas per step, with validation enforced at the runtime level before state is committed. Schema validation failures surface as structured errors with full context for debugging. [Join the waitlist](/waitlist) for early access.
