# The Hidden Costs of Self-Hosting LLMs

The pitch for self-hosting an LLM is compelling: no per-token API costs, no data leaving your infrastructure, full control over the model. For teams processing high volumes of text or operating under strict data residency requirements, it sounds like the obvious move.

The reality is more complicated. Self-hosting a capable open-weight model is a significant infrastructure commitment, and the costs that matter most are not always visible upfront.

## The GPU infrastructure cost

Running a 70B-parameter model at production quality requires substantial GPU memory: at full precision, roughly 140GB of VRAM. In practice, quantized models (8-bit, 4-bit) reduce this, but with measurable quality degradation for complex tasks.

A single A100 80GB GPU costs $2–3/hour on major cloud providers. For production inference with reasonable throughput, you typically need multiple GPUs for redundancy and parallel serving. At 3-5 A100s for a modest production deployment, you are at $6–15/hour before accounting for CPU, storage, networking, and the engineers who manage it.

Compare this to the API cost for the same token volume. For many workloads, self-hosting costs more, not less, once infrastructure is properly accounted for.

## The latency and throughput engineering problem

LLM inference is latency-sensitive. Users notice delays above 1-2 seconds for interactive workflows; background workflows have more tolerance but still need throughput guarantees.

Optimizing inference latency and throughput for self-hosted models is a deep engineering problem: KV cache sizing, batching strategy, speculative decoding, continuous batching vs. static batching. There are excellent open-source serving frameworks (vLLM, TGI, Ollama) that abstract some of this, but running them at production scale reliably requires engineering expertise most teams do not have.

The managed API providers have solved this problem at enormous scale. Their p99 latencies for production tiers are hard to match without significant investment.

## The model update problem

Open-weight models improve rapidly. A 70B model released six months ago is likely outperformed by newer releases or fine-tuned variants. With a managed API, the provider handles model updates. With self-hosting, every model update is a deployment event: new weights, new hardware requirements, regression testing, rollout management.

For teams where model quality directly impacts product outcomes, staying current with self-hosted models is an ongoing engineering commitment.

## Where self-hosting makes sense

Despite the costs, there are legitimate cases for self-hosting:

**Data residency requirements.** If regulatory or contractual constraints prohibit data leaving specific geographic regions, and managed providers cannot satisfy this with their regional deployments, self-hosting may be the only path.

**Fine-tuning for a specific domain.** If your use case benefits substantially from a fine-tuned model — medical records, legal documents, a specific language — and the improvement in quality justifies the infrastructure investment, self-hosting the fine-tuned model makes sense.

**Extremely high volume with predictable load.** At very high, consistent token volumes (hundreds of millions per day), the economics can shift. But this requires accurate cost modeling across infrastructure, engineering, and opportunity cost — not just a per-token comparison.

## The honest cost model

Before deciding to self-host, build a complete cost model:

- GPU infrastructure cost (including redundancy and failover)
- Engineering time for setup, tuning, and ongoing maintenance
- Estimated cost of performance gaps vs. managed frontier models
- Model update cadence and the cost of each update event

Most teams that do this analysis discover self-hosting is not cost-effective until they are at a scale they are unlikely to reach in the next 12-18 months. Starting with managed APIs and revisiting the decision at clear volume thresholds is the pragmatic approach.

---

AgentRuntime supports configuration-per-step LLM routing, making it straightforward to use managed APIs for most tasks while routing specific steps to self-hosted models where requirements demand it. [Join the waitlist](/waitlist) for early access.
