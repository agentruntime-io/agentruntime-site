# Zero-Downtime Deployments for AI Workflows

Deploying a new version of an AI workflow while runs are in progress is harder than deploying a stateless API. A REST endpoint can be swapped atomically — the old version handles the request it is processing, the new version handles the next one. A workflow run may be mid-execution, with state committed in the old schema, waiting for a step that the new version defines differently.

Getting workflow deployments wrong means either taking downtime to drain in-flight runs, silently corrupting run state by changing the schema mid-run, or forcing re-runs that may have already taken irreversible actions.

## The core problem: in-flight runs

A workflow run that started on version 1 may still be executing when version 2 is deployed. The run has committed state that reflects the version 1 step structure. If version 2 changes step names, removes steps, or changes the schema of step outputs, the in-flight run cannot safely continue on the new version.

Three strategies, in order of simplicity:

**Drain before deploy**: stop accepting new runs, wait for all in-flight runs to complete, deploy the new version, resume. This is the safest approach and the only one that guarantees no version mixing. The cost is downtime proportional to your longest in-flight run. For workflows with human approval gates or long-running steps, this can be hours.

**Version-aware execution**: tag each run with the workflow version it started on, and route execution to the correct version at each step. The runtime maintains multiple active versions simultaneously. This eliminates downtime but requires the runtime to support version-aware routing, and the old version must remain deployed until all runs on it complete.

**Backward-compatible migrations**: design version changes to be backward compatible — new steps have defaults, removed steps are soft-deleted and skipped if encountered in old state, schema changes are additive rather than breaking. This is the most operationally flexible approach but requires disciplined change management.

## Schema migration for run state

When a new workflow version changes the structure of run state — adds fields, renames steps, changes output schemas — in-flight runs on the old version have state that does not match the new schema.

Managing this requires explicit migration logic: when a run on version N encounters a step from version N+1, apply a migration function to bring the state up to the new schema. This is the same discipline as database schema migrations, applied to workflow state.

## Prompt-only changes are the safe case

The simplest deployment scenario: you are only changing a prompt, not the step structure or schema. In this case, in-flight runs that have already passed the changed step are unaffected. Runs that have not yet reached the step will use the new prompt.

This is the most common deployment scenario and the one where "just deploy" is usually safe — with the caveat that the step's expected output schema has not changed.

## What a safe deployment checklist looks like

Before deploying a new workflow version:

1. Identify all currently in-flight runs
2. Classify the change: prompt-only, additive (new steps with defaults), or breaking (schema changes, removed steps)
3. For breaking changes: drain in-flight runs or implement version-aware routing
4. For additive changes: verify backward compatibility with in-flight run state
5. Deploy to a staging environment and run a small canary
6. Monitor error rates on the first production runs for 15-30 minutes post-deploy

---

AgentRuntime's immutable workflow versioning ensures every run is tagged with its definition version, and the runtime routes execution to the correct version throughout the run's lifetime. [Join the waitlist](/waitlist) for early access.
