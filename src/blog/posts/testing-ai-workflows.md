# How to Test AI Workflows Before They Hit Production

Testing AI systems is harder than testing deterministic code. The same input can produce different outputs on different runs. LLM responses are not easily assert-able with `assertEqual`. And integration tests that make real API calls are slow, expensive, and flaky.

Most teams end up with one of two failure modes: no tests at all because "it's hard to test AI," or tests that only cover the happy path and break on the first real edge case. Neither is acceptable for production systems.

Here is a practical testing strategy for AI workflows that actually works.

## Layer 1: Unit test the non-LLM parts

A significant fraction of an AI workflow is ordinary code: input parsing, output validation, routing logic, error handling, state transformations. This code is fully testable with standard unit tests and should be.

The common mistake is treating the workflow as one atomic thing and concluding it is untestable. Break it apart. The function that routes a support ticket to the right escalation path based on a classification result is deterministic code. Test it. The function that validates a JSON output against a schema is deterministic code. Test it.

These tests run fast, catch regressions, and give you confidence in the scaffolding around the LLM calls without touching the LLM at all.

## Layer 2: Test with mocked LLM responses

For workflow integration tests — testing that steps execute in the right order, that state is passed correctly between steps, that error handling branches work — mock the LLM client with a set of canned responses.

This is not testing the model. It is testing the workflow. You are verifying that if the LLM returns this classification, the workflow routes to this step, and if it returns that error condition, the workflow retries and then escalates. These are infrastructure correctness tests, not model quality tests.

Mocked tests are fast, deterministic, and should run in CI on every push. They will catch the majority of bugs introduced by workflow changes.

## Layer 3: Snapshot tests for LLM behavior

For the LLM calls themselves, snapshot testing is more useful than assertion-based testing. On an approved baseline run, capture the input-output pairs for each LLM step. In subsequent runs, compare new outputs against the snapshots and flag significant deviations for review.

This is not a pass/fail test — it is a change detection mechanism. When a model upgrade or prompt change causes output to drift, you want to know. Reviewing the diff between old and new snapshots is a more honest evaluation than asserting against brittle expected strings.

## Layer 4: Evaluation harnesses

For workflows where output quality matters — summarization, classification, extraction — build a small evaluation harness: a curated set of inputs with human-labeled reference outputs and a scoring function.

The scoring function does not have to be exact match. For classification, it is accuracy. For summarization, it might be an LLM-as-judge score on a rubric. The goal is a number you can track over time as prompts and models change.

Run this harness before shipping prompt changes, model upgrades, or changes to context injection strategy. Without it, you are deploying blind.

## Replay testing for production incidents

When a production run produces unexpected output or fails in an unexpected way, the ability to replay that exact run — same inputs, same step sequence, same context — is critical for debugging.

This requires that every step's inputs and outputs are persisted as part of run state. With full run history, you can reproduce the failing case locally, iterate on the fix, and verify the corrected behavior before redeploying.

Without replay, every production incident is a one-time observation you cannot reproduce.

---

AgentRuntime persists full run state per step, enabling replay of any historical run. Its structured step execution model makes workflow logic testable with mocked LLM clients, and per-step traces integrate with standard observability tooling. [Join the waitlist](/waitlist) for early access.
