When TypeSafe AI released **Jev** this week, it immediately caught our attention.

Not because we needed another model for classifying emails or routing support tickets.

It caught our attention because the idea behind Jev is surprisingly close to something we had already been thinking about while building AgentRuntime:

**Does every intelligent decision really need to go through a large language model?**

We don't think so.

And the more capable AI systems become, the more important that distinction may become.

## LLMs are incredibly capable, but they were built for generation

Large language models have become remarkably general.

We use them to write, reason, code, analyse documents, plan tasks, call tools and increasingly control multi-step agents.

But their basic interface is still generative:

**context in → tokens out**

Even when the thing our software actually needs is much simpler.

Imagine a system trying to decide what to do with a customer request.

It might already know the available actions:

```text
REFUND
REQUEST_MORE_INFO
ESCALATE
REJECT
```

A typical LLM workflow might ask the model to analyse the situation, generate structured JSON, validate that output, extract the selected action and then branch the workflow.

That works.

But the actual problem was never really:

> What text should the model generate?

The problem was:

> Which of these actions is appropriate?

Jev approaches that problem differently.

## Jev is built around decisions, not strings

TypeSafe describes Jev as its first **System One Model**: a model designed specifically for fast, structured decisions inside software.

Instead of arbitrary text generation, Jev takes unstructured state together with predefined questions and returns typed decisions, probabilities and confidence values. TypeSafe currently exposes decision primitives including binary judgments, choices between alternatives and scores along a scale. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

Conceptually, instead of this:

```text
Input
 ↓
LLM
 ↓
"Based on the information provided,
I believe this should be escalated..."
```

you get something closer to:

```text
ESCALATE       0.87
REFUND         0.06
REQUEST_INFO   0.05
REJECT         0.02
```

The software can use that result immediately.

TypeSafe says Jev evaluates outputs in parallel rather than generating them token by token, and reports end-to-end response times of roughly **70–500 ms** for its current service. Its launch pricing is **$0.042 per million input tokens**, with output decisions not separately metered. These are TypeSafe's own early-access figures, so independent validation over a wider range of workloads will still matter. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

TypeSafe describes the obvious use cases as things like classification, routing, scoring, extraction, branching, verification and guardrails. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

Those are already useful.

But we think the more interesting possibility goes beyond business-process classification.

## Think about a robot

Imagine an autonomous robot moving through the physical world.

A large reasoning model could be trying to understand the bigger situation:

* Where are we going?
* What is the person in front of us doing?
* What is our objective?
* Should we change the plan?
* What should we do after we reach the next location?

Those are exactly the kinds of problems where richer reasoning can be valuable.

But now imagine something suddenly moves into the robot's path.

The robot probably shouldn't wait for a large model to reason:

> An object appears to be approaching from approximately 40 degrees to my right. Given its velocity and my current trajectory...

It needs something much closer to:

```text
DODGE_LEFT    0.93
BRAKE         0.04
BRACE         0.02
CONTINUE      0.01
```

and it needs it quickly.

This starts to suggest several different speeds of intelligence.

## An AI system may need several layers

A future autonomous system could look something like this:

```text
         LARGE REASONING MODEL

     goals • planning • interpretation
          strategy • explanation

                   ↓

         FAST DECISION MODEL

     stop • turn • select • route
       react • score • verify

                   ↓

       REAL-TIME CONTROL LAYER

    motors • balance • safety limits
      emergency stop • actuators
```

These are three very different problems.

The bottom layer might operate at millisecond-scale control frequencies and should often remain deterministic.

The top layer might spend considerably longer reasoning about a complex situation.

Between them is a potentially interesting space:

**fast learned judgment.**

That is the part Jev makes us think about.

To be clear, Jev today should not be confused with a robot motor controller. A reported 70–500 ms response time is nowhere near the timing requirements of many low-level control loops, and TypeSafe has not announced Jev as an on-device robotics or edge-computing model.

This is an architectural possibility, not a claim about Jev's current deployment model.

But TypeSafe is already experimenting with Jev in reactive environments. Their launch includes a Doom demonstration where Jev repeatedly receives structured game state and chooses actions; TypeSafe says the demo ran at up to roughly ten model queries per second. The model is operating over structured state rather than raw video, but it illustrates the same general idea: intelligence that participates repeatedly inside a live software loop instead of producing one long response for a human. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

And that is where things become much more interesting.

## One intelligence reacts. Another thinks.

The analogy we keep coming back to is a nervous system.

Humans don't appear to run every action through one slow, conscious reasoning process.

You can pull your hand away from something hot before spending several seconds reasoning about the physics of heat.

At the same time, higher-level cognition can override behaviour, change goals and decide what happens next.

A machine could eventually have similar separation:

**fast reaction**

```text
Something changed.
What do I do right now?
```

**slower reasoning**

```text
Why did this happen?
What does it mean?
Should our plan change?
```

**hard safety**

```text
This action is never allowed.
Stop immediately.
```

The slower model can change strategy.

The faster model can react within that strategy.

And the safety layer should be able to stop both.

That architecture feels considerably more realistic to us than assuming one enormous model should directly control every decision at every timescale.

## This is highly aligned with how we think about AgentRuntime

This question actually predates Jev for us.

While building AgentRuntime, we have increasingly thought about the runtime as something that should coordinate **different kinds of intelligence**, rather than merely execute LLM calls.

A real long-running system already contains many different kinds of work:

```text
deterministic rule
        ↓
AI judgment
        ↓
API call
        ↓
wait for an event
        ↓
another decision
        ↓
LLM reasoning
        ↓
human approval
        ↓
continue execution
```

There is no reason every box in that graph needs to use the same model.

Some nodes should simply be code.

Some may require a powerful reasoning model.

Some need a human.

And many others are exactly the kind of bounded, probabilistic judgment Jev is designed around.

This is why TypeSafe's language around **"System One Models"** is interesting to us. The name is inspired by the distinction between fast, intuitive System 1 thinking and slower, deliberate System 2 thinking. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

Whether Jev itself becomes the model used for these future systems is almost secondary.

The important idea is that we are beginning to see serious work on **different model architectures for different forms of intelligence**.

## Maybe AGI is a system, not a model

There is also a bigger question here.

For several years, much of the industry has implicitly treated progress toward more general intelligence as:

```text
larger model
   +
more compute
   +
better reasoning
   =
more intelligence
```

That approach has produced extraordinary results.

We are not betting against LLMs.

But we also don't think it necessarily follows that a sufficiently large language model should perform every function of an intelligent system.

A capable autonomous system may eventually contain separate mechanisms for:

* perception
* memory
* fast judgment
* deliberate reasoning
* planning
* control
* safety
* action

And something has to coordinate all of them.

Interestingly, TypeSafe itself argues that choosing the **right machine-learning task** can matter more than simply applying additional compute to the existing one. Their research direction with Jev is explicitly based on training for decisions rather than training another model primarily to produce better human-facing language. ([TypeSafe AI](https://typesafe.ai/blog/bitterest-lesson))

We don't know yet what architectures ultimately lead to AGI.

Jev certainly doesn't answer that question.

But it represents something we are excited to see more of:

**research into machine intelligence beyond simply making the existing LLM paradigm larger.**

## The part we're watching

For now, Jev is an early-access model designed for structured decisions in software.

That alone could make it extremely useful for automation.

But what interests us more is where this idea could go.

Smaller and faster decision models running closer to applications.

Eventually, perhaps, running closer to devices.

Large reasoning models operating above them.

Deterministic systems operating underneath them.

All coordinated through a runtime that knows which kind of intelligence should handle each part of the job.

That starts to look less like a chatbot with tools.

And a little more like an **artificial nervous system**.

That is why Jev caught our attention.
