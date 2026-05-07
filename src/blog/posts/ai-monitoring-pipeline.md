# Building an AI Monitoring Pipeline: Using Agents to Watch Your Systems

Traditional monitoring is rule-based: define a threshold, alert when it is crossed, route to on-call. This works well for metrics with clear thresholds. It breaks down for complex, multi-signal anomalies — the kind that precede most serious production incidents.

An AI monitoring pipeline uses LLM analysis to surface patterns in observability data that threshold-based alerting would miss, reducing both alert fatigue and mean time to detection.

## The problem with threshold alerting

Threshold alerts have two failure modes: too sensitive (alert fatigue, on-call engineers learn to ignore alerts) and not sensitive enough (real incidents go undetected because no single metric crosses a threshold).

Complex incidents almost always involve multiple signals changing together in a way that is anomalous without any individual signal crossing a threshold. Error rate up 0.3% (not alert-worthy). Latency p99 up 15% (not alert-worthy). DB connection pool utilization up 20% (not alert-worthy). Together, these are a system that is degrading toward an incident.

An LLM that can reason about correlated signals — "these three metrics moved together in the 10 minutes before the last two incidents; they are moving together now" — can detect this pattern before any threshold is crossed.

## The pipeline architecture

**1. Signal collection**
Aggregate metrics, logs, and traces from all relevant sources: APM, infrastructure metrics, application logs, deployment events, database metrics. The collection layer normalizes these into a consistent format.

**2. Anomaly pre-filtering**
Before involving the LLM, apply statistical anomaly detection to identify signals that are behaving unusually relative to their historical baseline. This pre-filtering reduces the signal volume the LLM needs to analyze and focuses its attention on the interesting signals.

**3. LLM correlation analysis**
Pass the anomalous signals — plus context from recent deployments, recent incidents, and system topology — to an LLM step that identifies correlated anomalies, hypothesizes root causes, and estimates severity.

**4. Structured incident hypothesis**
The LLM produces a structured output: affected components, probable cause, severity estimate, supporting evidence, and recommended investigation steps. This is not a final diagnosis — it is a starting point for the on-call engineer.

**5. Alert routing**
Route the hypothesis to the appropriate team based on the affected components, suppress if confidence is below threshold, and deduplicate against open incidents.

## The alert fatigue problem

An AI monitoring pipeline that generates too many alerts is worse than threshold alerting. The LLM step needs to be calibrated to produce high-confidence hypotheses, not every possible anomaly.

Calibration requires feedback: when an on-call engineer dismisses a hypothesis as not actionable, that signal should feed back into the system. Over time, the model learns what constitutes a genuine incident hypothesis versus background noise.

## The limitations

LLM-based monitoring analysis has real limitations. It is slower than threshold alerting — unsuitable for detecting sudden failures that need sub-second response. It is not deterministic — the same signals may produce different hypotheses on different runs. It is only as good as the context it is given.

The right architecture combines LLM correlation analysis with threshold alerting, not replaces it. Critical immediate-response alerts (service down, database unreachable) stay as threshold alerts. Complex degradation patterns are handled by LLM analysis.

---

AgentRuntime's event-driven trigger model can consume observability events directly, making it straightforward to build monitoring pipelines that analyze signal correlations and route structured hypotheses to on-call channels. [Join the waitlist](/waitlist) for early access.
