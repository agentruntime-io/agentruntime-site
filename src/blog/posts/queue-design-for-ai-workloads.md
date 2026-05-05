# Queue Design for AI Workloads: Why Standard Patterns Need Adjustment

Job queues are well-understood infrastructure. Task queues, worker pools, dead-letter queues — teams have been running these patterns for decades. When AI workflows enter the picture, several assumptions that hold for standard background jobs break down, and the standard patterns need adjustment.

## The cost heterogeneity problem

In a standard background job system, jobs are roughly similar in cost — processing a notification, sending an email, resizing an image. The queue can be sized based on average job cost and average throughput.

AI workflow jobs are wildly heterogeneous in cost. A simple classification task might cost $0.001 and take 2 seconds. A deep research workflow might cost $0.50 and take 5 minutes. Running both in the same queue with the same worker pool creates problems: expensive long-running jobs starve short cheap jobs, or the queue is sized for the expensive jobs and is wastefully over-resourced for the common case.

The solution is queue segmentation: separate queues (and worker pools) for different workflow types, sized independently based on the cost and throughput requirements of each. A fast queue for classification and routing tasks, a slow queue for multi-step research workflows.

## Back-pressure and LLM rate limits

Standard job queues apply back-pressure at the queue level: stop accepting new jobs when the queue is full. For AI workloads, rate limits add a second back-pressure source that is invisible to the queue: the LLM API.

A worker pool that dispatches 50 concurrent jobs will hit LLM rate limits if each job makes multiple LLM calls. The jobs will retry, consuming worker capacity while waiting for rate limit windows to clear, making the problem worse.

The fix is coordination between the queue and the LLM rate limit budget: the worker pool should not dispatch a job it cannot execute to completion without hitting rate limits. This requires a token budget estimator and a throttling layer ahead of dispatch, not just a retry loop after the 429.

## Priority queuing for time-sensitive workflows

Not all AI workflow runs are equally time-sensitive. A workflow triggered by a live user action (a user submits a form and expects a response) is more time-sensitive than a batch enrichment job running overnight.

Priority queuing — separate priority lanes within the queue, with the higher-priority lane always dispatched first — ensures live user-triggered workflows are not delayed by large batch jobs. This requires that workflows are tagged with a priority at trigger time and that the queue implementation supports priority lanes.

## Fan-out and fan-in at the queue level

Workflows that use parallel fan-out — spawning multiple sub-tasks that run concurrently and are aggregated by a parent — create queue-level fan-out. One parent job spawns N child jobs, and the parent cannot proceed until all N children complete.

Managing this correctly requires:
- The parent job to be parked (not held in a worker thread) while waiting for children
- The child jobs to be able to signal completion to the parent
- A failure handling strategy for partial child completion

Holding the parent in a worker thread while waiting for children is a common mistake that leads to thread exhaustion under load. The parent should release its worker, and be woken by a completion signal from the children.

## Dead-letter queue observability

The dead-letter queue — where failed jobs land after exhausting retries — is one of the most information-dense parts of an AI workload queue. Failed AI workflow runs often fail for interesting reasons: model quality issues, unexpected input formats, downstream service unavailability.

DLQ monitoring should include:
- Failure classification by error type
- Sampled failed inputs for debugging
- Retry success rate after manual intervention
- Age of dead-lettered jobs (to catch backlog accumulation)

A DLQ that is never reviewed is a signal your system is silently dropping work.

---

AgentRuntime uses Redis Streams as its underlying queue, providing durable persistence, consumer group semantics, and the message replay capability needed for AI workflow reliability. [Join the waitlist](/waitlist) for early access.
