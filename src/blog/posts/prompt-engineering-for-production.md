# Prompt Engineering for Production: Beyond "It Worked Once"

Prompt engineering has a reputation problem. In demos, a cleverly worded instruction reliably produces the right output. In production, the same prompt fails on 3% of inputs, produces differently-formatted results after a model update, and breaks completely when the input distribution shifts slightly from what was tested.

Production prompt engineering is a different discipline from demo prompt engineering. Here is what actually matters.

## Prompts are code — treat them that way

The most important shift is treating prompts as versioned artifacts, not strings in a config file or comments in a notebook. A prompt that drives a production workflow should be:

- **Version controlled**: every change tracked, with history
- **Reviewed**: prompt changes reviewed before deployment, the same as code changes
- **Tested**: a prompt change should run against the evaluation set before it ships
- **Deployed separately**: the ability to roll back a prompt independently of application code

Teams that treat prompts as "just text" discover this problem when a model provider quietly updates their model, the prompt that worked last week produces different output today, and there is no record of what changed or when.

## Specificity beats cleverness

The most reliable prompts are the most specific ones. Clever techniques — chain of thought, few-shot examples, role-playing personas — work in demos and for genuinely complex reasoning tasks. For structured production tasks, specificity is more valuable.

A prompt that precisely defines the output format, provides explicit handling for edge cases, and states what to do when the task is ambiguous will outperform a clever prompt that works well on the average case but fails unpredictably at the edges.

## Few-shot examples are the highest-leverage tool

For most production tasks, well-chosen few-shot examples are the single highest-leverage prompt engineering technique. Three to five examples of input/output pairs for the task — particularly examples that cover common edge cases — improve reliability more than any amount of instruction text.

The examples should represent the actual distribution of production inputs, not idealized clean examples. If 10% of your production inputs have typos or unusual formatting, your few-shot examples should include some.

## Defensive prompting for structured output

For tasks that require structured output — classification, extraction, scoring — build defensive handling into the prompt itself:

- Specify the exact output format with an example
- Explicitly handle the "none of the above" case
- Specify what to do when the input is ambiguous or insufficient
- Include an instruction not to add explanation unless asked

The last point matters more than it sounds. A model that adds "Based on my analysis..." before the structured output will break a parser that expects clean JSON.

## Evaluation-driven iteration

The right process for prompt improvement:

1. Build an evaluation set of 50-200 representative inputs with labeled correct outputs
2. Establish a baseline score on the current prompt
3. Make one change at a time and re-evaluate
4. Ship only changes that improve the evaluation score

"I tested it manually on a few examples and it looked better" is not an acceptable bar for production prompt changes. The evaluation set is the bar.

## Model-specific prompt differences

Prompts are not model-agnostic. A prompt optimized for one model often produces degraded results on another. System prompt handling, instruction-following conventions, and response formatting differ meaningfully across providers.

This means prompt changes and model migrations are coupled — changing the provider requires re-evaluating and potentially re-tuning prompts for the new model's behavior.

---

AgentRuntime's step configuration model stores prompts as explicit, versioned artifacts per step, with the evaluation harness integrated into the deployment workflow. [Join the waitlist](/waitlist) for early access.
