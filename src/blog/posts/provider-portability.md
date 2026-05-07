# Provider Portability: Building LLM-Agnostic AI Workflows

The LLM provider landscape is moving fast. A model that leads on reasoning benchmarks today may be surpassed in six months. Pricing changes. Providers have outages. New open-weight models become viable alternatives.

Teams that couple their AI workflows tightly to a single provider's API surface discover this the hard way: a provider outage takes down their entire system, or a price increase makes the product unit economics suddenly unworkable, and migrating is a multi-month project.

Building provider-portable AI workflows is not a premature optimization — it is basic operational resilience.

## What tight coupling looks like

Provider coupling shows up in several forms, not all obvious:

**Direct SDK usage throughout**: calling `openai.ChatCompletion.create()` directly in step logic rather than through an abstraction layer. When the provider or the SDK changes, every step needs to be updated.

**Provider-specific parameters embedded in prompts**: some models respond differently to specific phrases, formatting conventions, or XML tags. Prompts written specifically for one model's behavior may degrade significantly on another.

**Vendor-specific features as load-bearing dependencies**: structured outputs, function calling conventions, system prompt handling, and tool use all have provider-specific implementations. A workflow that relies on OpenAI's specific structured outputs format may not port cleanly to Anthropic's tool-use response format.

**Provider-specific token limits and context windows**: a prompt design that fits within one provider's context window may exceed another's, requiring architectural changes rather than just swapping the client.

## The abstraction layer

The foundation of portable AI workflows is a thin abstraction layer between your step logic and the provider SDK:

```
LLMClient.complete(model, messages, options) → response
```

The step logic calls the abstraction. The abstraction maps to the provider's API. Switching providers means updating the abstraction, not every step.

This pattern is not novel — it is the same as abstracting database access behind a repository interface. The insight is applying it to LLM clients before you need it, not after.

## Prompt portability

The harder portability problem is prompts. A prompt engineered for one model may produce significantly different output on another due to differences in instruction-following, formatting conventions, and sensitivity to specific phrasings.

The practical approach: write prompts to be as model-agnostic as possible, relying on clear specification rather than model-specific tricks. Maintain a small evaluation set per step. When evaluating a new provider, run the eval set before switching — not after.

Some divergence between provider-specific prompt variants is acceptable. The goal is not a single prompt that works identically everywhere, but a system where switching providers requires prompt re-evaluation rather than architectural changes.

## Fallback routing in production

Beyond migration, provider portability enables production failover: when the primary provider is degraded, route requests to a secondary. This is a circuit breaker pattern applied to LLM calls.

This requires that the secondary provider's response is close enough in quality and format that the downstream step can handle it. For most structured tasks — classification, extraction, summarization — this holds well enough. For tasks that depend on provider-specific behavior, it may not.

## Cost arbitrage

Once portability is in place, it becomes possible to route different tasks to different providers based on cost-performance tradeoffs. Route high-volume, straightforward tasks to the most cost-efficient model. Reserve expensive frontier models for tasks that genuinely need them.

This is not possible in a tightly coupled system. With an abstraction layer and per-step model configuration, it is a configuration change rather than a code change.

---

AgentRuntime's LLM configuration model is provider-agnostic: each step specifies provider, model, and parameters through a unified interface, enabling per-step routing and failover without changes to step logic. [Join the waitlist](/waitlist) for early access.
