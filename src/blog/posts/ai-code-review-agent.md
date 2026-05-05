# Building an AI Code Review Agent: What Actually Works

Automated code review is one of the most-attempted and most-abandoned AI use cases. Every team has tried it. Most end up with a bot that leaves unhelpful comments ("consider adding a comment here") that reviewers learn to ignore, making the PR process noisier without making it better.

The difference between a code review agent that gets adopted and one that gets disabled is not model quality — it is workflow design.

## What automated code review should and should not do

The failure mode of most code review bots is trying to do too much. They comment on style, logic, security, performance, naming, and documentation simultaneously, with no clear signal about what matters. The result is noise.

The useful scope for an automated reviewer is narrow and high-confidence:

**Good targets:**
- Security patterns with clear right/wrong answers (SQL injection, hardcoded secrets, insecure deserialization)
- Obvious missing error handling (unchecked return values, swallowed exceptions)
- API contract violations (calling a function with wrong argument types, missing required parameters)
- Dependency issues (importing deprecated packages, known vulnerable versions)

**Bad targets:**
- Architecture and design decisions (these need context the bot does not have)
- Naming and style beyond what a linter already catches
- "Could be simpler" suggestions that are subjective

Narrow, high-confidence scope produces comments that are nearly always actionable. Broad, low-confidence scope produces noise.

## The workflow structure

A production code review agent is a multi-step workflow, not a single LLM call:

**Step 1: Diff parsing and classification**
Parse the PR diff into changed files and changed regions. Classify each changed file by type (application code, test code, infrastructure config, documentation) and language. Route each file type to the appropriate review steps — there is no point running security checks on markdown files.

**Step 2: Static analysis integration**
Before involving the LLM at all, run static analysis tools appropriate to the language: linters, type checkers, dependency scanners. These tools are fast, deterministic, and have near-zero false positive rates for the things they check. Only pass files that pass static analysis to the LLM step — there is no point asking the model about issues a linter already caught.

**Step 3: Targeted LLM review**
Pass each changed code region to the LLM with a focused, specific prompt: "Review this code change for security vulnerabilities. List only issues with HIGH or CRITICAL severity. For each issue, specify the line, the vulnerability type, and a concrete remediation." Narrow the scope explicitly in the prompt.

**Step 4: Confidence filtering**
Filter the LLM output by a confidence threshold. Comments where the model expresses uncertainty should be suppressed — they add noise and erode trust in the high-confidence comments. A comment that the model rates as "possibly an issue" is not ready for the reviewer's attention.

**Step 5: Deduplication and formatting**
Before posting, deduplicate against existing open comments (the same issue may have been flagged in a previous review iteration) and format for the review platform.

## The trust problem

An AI code reviewer that comments on every PR will be tuned out within two weeks. The comments need to be accurate enough that reviewers trust them, or the bot is worse than nothing.

Build in feedback collection from the start: when a reviewer dismisses a comment as a false positive, capture that signal. Use it to tune the confidence threshold and prompt over time. An agent that improves based on reviewer feedback is qualitatively different from one that does not.

## The on-call exception

One case where broader scope makes sense: blocking PRs to production on a specific class of high-severity issues (hardcoded secrets, SQL injection, remote code execution patterns) where a false negative is more costly than a false positive. For these, the bar is "never miss it" rather than "never false alarm."

---

AgentRuntime's workflow model handles the multi-step, conditional structure of a code review pipeline — static analysis in parallel, LLM review per file, confidence filtering before posting — with full trace context for every PR review run. [Join the waitlist](/waitlist) for early access.
