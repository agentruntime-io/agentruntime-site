import { useCallback, useEffect, useRef, useState } from "react";
import {
  autoStartDelayMs,
  autoApproveDelayMs,
  createDemoEvents,
  createInitialRunContext,
  createInitialStepStatuses,
  createInitialTimeline,
  formatRunContextState,
  formatRunOffset,
  productStageNodes,
  runContextAfterStep,
  runStatusLabel,
  stepDurationMs,
  stepGapMs,
  timelineLabels,
  getTimelineAxisTicks,
  getTimelineSpanMs,
  timelineDetailForStep,
  timelineStatusLabel,
  toolCallsByStep,
  upsertTimelineEntry,
  type BottomPanelTab,
  type DemoEvent,
  type RunContextSnapshot,
  type RunPhase,
  type StepStatus,
  type TimelineEntry,
} from "@/lib/productStageDemo";

function sleep(
  ms: number,
  runId: number,
  runIdRef: React.MutableRefObject<number>,
  isPausedRef: React.MutableRefObject<boolean>,
) {
  return new Promise<void>((resolve, reject) => {
    let remaining = ms;

    const tick = () => {
      if (runIdRef.current !== runId) {
        reject(new Error("cancelled"));
        return;
      }

      if (isPausedRef.current) {
        window.setTimeout(tick, 50);
        return;
      }

      if (remaining <= 0) {
        resolve();
        return;
      }

      const step = Math.min(remaining, 50);
      remaining -= step;
      window.setTimeout(tick, step);
    };

    tick();
  });
}

type RunControlsProps = {
  phase: RunPhase;
  onRun: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
};

function RunControls({
  phase,
  onRun,
  onPause,
  onResume,
  onStop,
}: RunControlsProps) {
  const statusLabel = runStatusLabel(phase);
  const showRun =
    phase === "idle" ||
    phase === "complete" ||
    phase === "rejected" ||
    phase === "stopped";
  const showPause = phase === "running" || phase === "approval";
  const showResume = phase === "paused";
  const showStop =
    phase === "running" ||
    phase === "approval" ||
    phase === "paused";

  return (
    <div className="marketing-run-controls">
      {phase !== "idle" ? (
        <span className="marketing-run-status" data-phase={phase}>
          {statusLabel}
        </span>
      ) : null}
      {showRun ? (
        <button
          type="button"
          className="marketing-run-control"
          data-variant="primary"
          onClick={onRun}
        >
          Run workflow
        </button>
      ) : null}
      {showPause ? (
        <button
          type="button"
          className="marketing-run-control"
          data-variant="secondary"
          onClick={onPause}
        >
          Pause
        </button>
      ) : null}
      {showResume ? (
        <button
          type="button"
          className="marketing-run-control"
          data-variant="secondary"
          onClick={onResume}
        >
          Resume
        </button>
      ) : null}
      {showStop ? (
        <button
          type="button"
          className="marketing-run-control"
          data-variant="stop"
          onClick={onStop}
        >
          Stop
        </button>
      ) : null}
    </div>
  );
}

type StageBottomBarProps = {
  activeTab: BottomPanelTab;
  onTabChange: (tab: BottomPanelTab) => void;
  events: DemoEvent[];
  runContext: RunContextSnapshot;
  timeline: TimelineEntry[];
  phase: RunPhase;
  currentMs: number | null;
};

function StageGanttChart({
  timeline,
  currentMs,
}: {
  timeline: TimelineEntry[];
  currentMs: number | null;
}) {
  const totalMs = getTimelineSpanMs(timeline, currentMs);
  const axisTicks = getTimelineAxisTicks(totalMs);
  const nowPercent =
    currentMs === null ? 0 : Math.min((currentMs / totalMs) * 100, 100);

  return (
    <div className="marketing-stage-gantt">
      <div className="marketing-stage-gantt-axis" aria-hidden="true">
        {axisTicks.map((tick) => (
          <span key={tick} style={{ left: `${(tick / totalMs) * 100}%` }}>
            {formatRunOffset(tick)}
          </span>
        ))}
      </div>

      <div className="marketing-stage-gantt-grid" aria-hidden="true">
        {axisTicks.map((tick) => (
          <span
            key={`grid-${tick}`}
            className="marketing-stage-gantt-grid-line"
            style={{ left: `${(tick / totalMs) * 100}%` }}
          />
        ))}
        {currentMs !== null ? (
          <span
            className="marketing-stage-gantt-now"
            style={{ left: `${nowPercent}%` }}
          />
        ) : null}
      </div>

      <ul className="marketing-stage-gantt-rows">
        {productStageNodes.map((node, stepIndex) => {
          const entry = timeline.find((item) => item.id === `step-${stepIndex}`);
          const endMs = entry
            ? entry.endMs ?? currentMs ?? entry.startMs
            : null;
          const leftPercent = entry ? (entry.startMs / totalMs) * 100 : 0;
          const widthPercent =
            entry && endMs !== null
              ? Math.max(((endMs - entry.startMs) / totalMs) * 100, 1.8)
              : 0;

          return (
            <li key={node.title} data-active={entry ? "true" : undefined}>
              <div className="marketing-stage-gantt-label">
                <strong>{timelineLabels[stepIndex]}</strong>
                <span>{node.type}</span>
              </div>
              <div className="marketing-stage-gantt-track">
                {entry ? (
                  <span
                    className="marketing-stage-gantt-bar"
                    data-status={entry.status}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                    title={timelineDetailForStep(stepIndex, entry.status)}
                  >
                    <i>{timelineStatusLabel(entry.status)}</i>
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type ApprovalActionsProps = {
  onApprove: () => void;
  onReject: () => void;
  onViewContext: () => void;
  remainingMs: number;
  totalMs: number;
};

function ApprovalActions({
  onApprove,
  onReject,
  onViewContext,
  remainingMs,
  totalMs,
}: ApprovalActionsProps) {
  const secondsLeft = Math.max(Math.ceil(remainingMs / 1000), 0);
  const progress = Math.min(
    Math.max(((totalMs - remainingMs) / totalMs) * 100, 0),
    100,
  );

  return (
    <div className="marketing-approval-panel">
      <div className="marketing-approval-countdown">
        <span>
          Auto-approves in <strong>{secondsLeft}s</strong> unless you decide
        </span>
        <div
          className="marketing-approval-countdown-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalMs}
          aria-valuenow={totalMs - remainingMs}
          aria-label="Time until auto-approval"
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="marketing-approval-actions">
        <button
          type="button"
          className="marketing-approval-button"
          data-variant="approve"
          onClick={onApprove}
        >
          Approve plan
        </button>
        <button
          type="button"
          className="marketing-approval-button"
          data-variant="reject"
          onClick={onReject}
        >
          Reject plan
        </button>
        <button
          type="button"
          className="marketing-approval-button"
          data-variant="secondary"
          onClick={onViewContext}
        >
          View context
        </button>
      </div>
    </div>
  );
}

function RunContextPanel({ runContext }: { runContext: RunContextSnapshot }) {
  const hasVariables = Object.keys(runContext.variables).length > 0;

  return (
    <div className="marketing-stage-context-panel">
      <div className="marketing-stage-context-meta">
        <span
          className="marketing-stage-context-state"
          data-state={runContext.state}
        >
          {formatRunContextState(runContext.state)}
        </span>
        <span>
          {runContext.workflow} · {runContext.workflowVersion}
        </span>
        <span className="marketing-stage-context-run-id">{runContext.runId}</span>
      </div>

      {runContext.input ? (
        <div className="marketing-stage-context-block">
          <div className="marketing-stage-context-block-label">Input</div>
          <pre>{JSON.stringify(runContext.input, null, 2)}</pre>
        </div>
      ) : null}

      {hasVariables ? (
        <div className="marketing-stage-context-block">
          <div className="marketing-stage-context-block-label">Variables</div>
          <pre>{JSON.stringify(runContext.variables, null, 2)}</pre>
        </div>
      ) : (
        <p className="marketing-stage-bottom-empty">
          Variables will accumulate here as each step completes.
        </p>
      )}
    </div>
  );
}

function StageBottomBar({
  activeTab,
  onTabChange,
  events,
  runContext,
  timeline,
  phase,
  currentMs,
}: StageBottomBarProps) {
  const tabs: Array<{ id: BottomPanelTab; label: string; hint: string }> = [
    {
      id: "context",
      label: "Context",
      hint:
        phase === "idle"
          ? "Run state snapshot"
          : `${runContext.runId} · ${runContext.input?.customer_name ?? "Run active"}`,
    },
    {
      id: "events",
      label: "Events",
      hint:
        events.length === 0
          ? "Waiting for run activity"
          : `${events.length} events streamed`,
    },
    {
      id: "timeline",
      label: "Timeline",
      hint:
        timeline.length === 0
          ? "Step progression"
          : `${timeline.length} steps recorded`,
    },
  ];

  return (
    <div className="marketing-stage-bottom-bar">
      <div className="marketing-stage-bottom-tabs" role="tablist" aria-label="Run observability">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className="marketing-stage-bottom-tab"
            data-active={activeTab === tab.id || undefined}
            onClick={() => onTabChange(tab.id)}
          >
            <span>{tab.label}</span>
            <small>{tab.hint}</small>
          </button>
        ))}
      </div>

      <div
        className="marketing-stage-bottom-panel"
        role="tabpanel"
        aria-live="polite"
      >
        {activeTab === "context" ? (
          runContext.state === "idle" ? (
            <p className="marketing-stage-bottom-empty">
              Start the workflow to load the run context snapshot.
            </p>
          ) : (
            <RunContextPanel runContext={runContext} />
          )
        ) : null}

        {activeTab === "events" ? (
          events.length === 0 ? (
            <p className="marketing-stage-bottom-empty">
              Events will stream here as the workflow executes.
            </p>
          ) : (
            <ul className="marketing-stage-events">
              {events.map((event) => (
                <li key={event.id}>
                  <span className="marketing-stage-event-offset">{event.offset}</span>
                  <code className="marketing-stage-event-type">{event.type}</code>
                  <span className="marketing-stage-event-message">{event.message}</span>
                </li>
              ))}
            </ul>
          )
        ) : null}

        {activeTab === "timeline" ? (
          timeline.length === 0 ? (
            <p className="marketing-stage-bottom-empty">
              Step bars will appear here once the run starts.
            </p>
          ) : (
            <StageGanttChart timeline={timeline} currentMs={currentMs} />
          )
        ) : null}
      </div>
    </div>
  );
}

export function ProductStage() {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    createInitialStepStatuses,
  );
  const [timeline, setTimeline] = useState<TimelineEntry[]>(createInitialTimeline);
  const [events, setEvents] = useState<DemoEvent[]>([]);
  const [runContext, setRunContext] = useState<RunContextSnapshot>(
    createInitialRunContext,
  );
  const [activeBottomTab, setActiveBottomTab] =
    useState<BottomPanelTab>("events");
  const [round, setRound] = useState(0);
  const [activeToolCall, setActiveToolCall] = useState<string | null>(null);
  const [startedLabel, setStartedLabel] = useState("Just now");
  const [approvalRemainingMs, setApprovalRemainingMs] = useState<number | null>(
    null,
  );
  const [currentMs, setCurrentMs] = useState<number | null>(null);
  const runIdRef = useRef(0);
  const hasAutoStartedRef = useRef(false);
  const runStartedAtRef = useRef<number | null>(null);
  const eventCountRef = useRef(0);
  const approvalResolvedRef = useRef(false);
  const isPausedRef = useRef(false);
  const pausedFromPhaseRef = useRef<RunPhase | null>(null);
  const approvalPausedRemainingRef = useRef<number | null>(null);

  useEffect(() => {
    isPausedRef.current = phase === "paused";
  }, [phase]);

  const getElapsedMs = useCallback(() => {
    if (runStartedAtRef.current === null) return null;
    return Date.now() - runStartedAtRef.current;
  }, []);

  const recordStepActivity = useCallback(
    (
      stepIndex: number,
      action: "start" | "done" | "waiting" | "approved" | "rejected",
    ) => {
      const elapsedMs =
        runStartedAtRef.current === null
          ? 0
          : Date.now() - runStartedAtRef.current;
      const newEvents = createDemoEvents(
        stepIndex,
        action,
        elapsedMs,
        eventCountRef.current,
      );

      if (newEvents.length > 0) {
        eventCountRef.current += newEvents.length;
        setEvents((previous) => [...previous, ...newEvents]);
      }

      setRunContext((previous) =>
        runContextAfterStep(stepIndex, action, previous),
      );
    },
    [],
  );

  const resetRun = useCallback(() => {
    setPhase("idle");
    setStepStatuses(createInitialStepStatuses());
    setTimeline(createInitialTimeline());
    setEvents([]);
    setRunContext(createInitialRunContext());
    setRound(0);
    setActiveToolCall(null);
    setStartedLabel("Just now");
    runStartedAtRef.current = null;
    eventCountRef.current = 0;
    approvalResolvedRef.current = false;
    pausedFromPhaseRef.current = null;
    approvalPausedRemainingRef.current = null;
    setApprovalRemainingMs(null);
    setCurrentMs(null);
  }, []);

  const finishRun = useCallback((_runId: number) => {
    setPhase("complete");
    setActiveToolCall(null);
    setApprovalRemainingMs(null);
  }, []);

  const finishRejected = useCallback((_runId: number) => {
    setPhase("rejected");
    setActiveToolCall(null);
    setApprovalRemainingMs(null);
  }, []);

  const runSteps = useCallback(
    async (runId: number, startIndex: number) => {
      for (let stepIndex = startIndex; stepIndex < productStageNodes.length; stepIndex += 1) {
        if (runIdRef.current !== runId) return;

        recordStepActivity(stepIndex, "start");
        setStepStatuses((previous) =>
          previous.map((status, index) =>
            index === stepIndex ? "running" : status,
          ),
        );
        setTimeline((previous) =>
          upsertTimelineEntry(previous, stepIndex, "running", getElapsedMs()),
        );
        setActiveToolCall(toolCallsByStep[stepIndex] ?? null);

        try {
          await sleep(stepDurationMs, runId, runIdRef, isPausedRef);
        } catch {
          return;
        }

        if (stepIndex === 4) {
          recordStepActivity(stepIndex, "waiting");
          setStepStatuses((previous) =>
            previous.map((status, index) =>
              index === stepIndex ? "waiting" : status,
            ),
          );
          setTimeline((previous) =>
            upsertTimelineEntry(previous, stepIndex, "waiting", getElapsedMs()),
          );
          setActiveToolCall(null);
          setPhase("approval");
          approvalResolvedRef.current = false;
          return;
        }

        recordStepActivity(stepIndex, "done");
        setStepStatuses((previous) =>
          previous.map((status, index) =>
            index === stepIndex ? "done" : status,
          ),
        );
        setTimeline((previous) =>
          upsertTimelineEntry(previous, stepIndex, "done", getElapsedMs()),
        );
        setActiveToolCall(null);

        if (stepIndex < productStageNodes.length - 1) {
          try {
            await sleep(stepGapMs, runId, runIdRef, isPausedRef);
          } catch {
            return;
          }
        }
      }

      await finishRun(runId);
    },
    [finishRun, getElapsedMs, recordStepActivity],
  );

  const startRun = useCallback(async () => {
    runIdRef.current += 1;
    const runId = runIdRef.current;
    resetRun();
    runStartedAtRef.current = Date.now();
    setPhase("running");
    setRound(1);
    setStartedLabel("Just now");
    await runSteps(runId, 0);
  }, [resetRun, runSteps]);

  const approveRun = useCallback(async () => {
    if (phase !== "approval" || approvalResolvedRef.current) return;

    approvalResolvedRef.current = true;
    const runId = runIdRef.current;
    setPhase("running");
    recordStepActivity(4, "approved");
    setStepStatuses((previous) =>
      previous.map((status, index) => (index === 4 ? "done" : status)),
    );
    setTimeline((previous) =>
      upsertTimelineEntry(previous, 4, "done", getElapsedMs()),
    );

    try {
      await sleep(stepGapMs, runId, runIdRef, isPausedRef);
    } catch {
      return;
    }

    await runSteps(runId, 5);
  }, [getElapsedMs, phase, recordStepActivity, runSteps]);

  const pauseRun = useCallback(() => {
    if (phase !== "running" && phase !== "approval") return;

    if (phase === "approval" && approvalRemainingMs !== null) {
      approvalPausedRemainingRef.current = approvalRemainingMs;
    }

    pausedFromPhaseRef.current = phase;
    setPhase("paused");
  }, [approvalRemainingMs, phase]);

  const resumeRun = useCallback(() => {
    if (phase !== "paused" || pausedFromPhaseRef.current === null) return;

    setPhase(pausedFromPhaseRef.current);
    pausedFromPhaseRef.current = null;
  }, [phase]);

  const stopRun = useCallback(() => {
    runIdRef.current += 1;
    approvalResolvedRef.current = true;
    pausedFromPhaseRef.current = null;
    approvalPausedRemainingRef.current = null;
    setPhase("stopped");
    setActiveToolCall(null);
    setApprovalRemainingMs(null);
    setRunContext((previous) =>
      previous.state === "idle"
        ? previous
        : { ...previous, state: "stopped" },
    );

    const elapsed = getElapsedMs();
    if (elapsed !== null) {
      eventCountRef.current += 1;
      setEvents((previous) => [
        ...previous,
        {
          id: `evt-stop-${eventCountRef.current}`,
          offset: formatRunOffset(elapsed),
          type: "run.stopped",
          message: "Run stopped by operator",
        },
      ]);
    }
  }, [getElapsedMs]);

  const rejectRun = useCallback(async () => {
    if (phase !== "approval" || approvalResolvedRef.current) return;

    approvalResolvedRef.current = true;
    const runId = runIdRef.current;
    recordStepActivity(4, "rejected");
    setStepStatuses((previous) =>
      previous.map((status, index) => (index === 4 ? "failed" : status)),
    );
    setTimeline((previous) =>
      upsertTimelineEntry(previous, 4, "failed", getElapsedMs()),
    );
    await finishRejected(runId);
  }, [finishRejected, getElapsedMs, phase, recordStepActivity]);

  useEffect(() => {
    if (phase === "idle") {
      setCurrentMs(null);
      return;
    }

    if (phase === "complete" || phase === "rejected" || phase === "stopped") {
      return;
    }

    if (phase === "paused") {
      return;
    }

    const tick = () => {
      setCurrentMs(getElapsedMs());
    };

    tick();
    const intervalId = window.setInterval(tick, 100);
    return () => window.clearInterval(intervalId);
  }, [getElapsedMs, phase]);

  useEffect(() => {
    if (phase !== "approval") {
      if (phase !== "paused") {
        setApprovalRemainingMs(null);
      }
      return;
    }

    const initialRemaining =
      approvalPausedRemainingRef.current ?? autoApproveDelayMs;
    approvalPausedRemainingRef.current = null;
    const startedAt = Date.now() - (autoApproveDelayMs - initialRemaining);

    setApprovalRemainingMs(initialRemaining);

    const intervalId = window.setInterval(() => {
      const remaining = Math.max(
        autoApproveDelayMs - (Date.now() - startedAt),
        0,
      );
      setApprovalRemainingMs(remaining);

      if (remaining === 0) {
        window.clearInterval(intervalId);
        void approveRun();
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [approveRun, phase]);

  useEffect(() => {
    if (hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;

    const timer = window.setTimeout(() => {
      void startRun();
    }, autoStartDelayMs);

    return () => window.clearTimeout(timer);
  }, [startRun]);

  useEffect(
    () => () => {
      runIdRef.current += 1;
    },
    [],
  );

  const showApprovalActions = phase === "approval";
  const mobileStatus =
    phase === "paused"
      ? "Run paused — resume to continue the workflow demo."
      : phase === "stopped"
        ? "Run stopped — output remains visible below."
      : phase === "approval"
      ? `Waiting for approval — auto-approves in ${Math.max(
          Math.ceil((approvalRemainingMs ?? autoApproveDelayMs) / 1000),
          0,
        )}s unless you choose.`
      : phase === "rejected"
        ? "Plan rejected — the run was routed to exception handling."
      : phase === "complete"
        ? "Run finished — onboarding launched for the new customer."
        : phase === "running"
          ? activeToolCall
            ? `Running: ${activeToolCall}`
            : "Workflow is executing across agents, tools, and decisions."
          : "Interactive demo — press Run workflow to replay the run.";

  return (
    <section className="marketing-product-stage">
      <div className="marketing-container">
        <figure className="marketing-stage-shell">
          <figcaption className="sr-only">
            Interactive AgentRuntime workflow demo showing agents, tools,
            decisions, and a human approval in one observable run.
          </figcaption>
          <div className="marketing-app">
            <aside className="marketing-app-sidebar" aria-hidden="true">
              <div className="marketing-window-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="marketing-side-label">Workspace</div>
              <div className="marketing-side-item" data-active="true">
                <span>Customer operations</span>
                <span>•••</span>
              </div>
              <div className="marketing-side-item">
                <span>Finance</span>
                <span>6</span>
              </div>
              <div className="marketing-side-item">
                <span>Support</span>
                <span>12</span>
              </div>
              <div className="marketing-side-label">Build</div>
              <div className="marketing-side-item">
                <span>Workflows</span>
                <span>24</span>
              </div>
              <div className="marketing-side-item">
                <span>Agents</span>
                <span>8</span>
              </div>
              <div className="marketing-side-item">
                <span>Tools &amp; MCP</span>
                <span>50+</span>
              </div>
              <div className="marketing-side-label">Operate</div>
              <div className="marketing-side-item">
                <span>Runs</span>
                <span>{phase === "idle" ? "Live" : "Active"}</span>
              </div>
              <div className="marketing-side-item">
                <span>Observability</span>
              </div>
              <div className="marketing-side-item">
                <span>Approvals</span>
                <span>{showApprovalActions ? "1" : phase === "idle" ? "3" : "0"}</span>
              </div>
            </aside>

            <div className="marketing-canvas">
              <div className="marketing-canvas-body">
                <div className="marketing-canvas-header">
                  <div>
                    <div className="marketing-crumbs">
                      Workflows / Customer onboarding
                    </div>
                    <h3 className="marketing-canvas-title">
                      Customer onboarding
                    </h3>
                  </div>
                  <RunControls
                    phase={phase}
                    onRun={() => void startRun()}
                    onPause={pauseRun}
                    onResume={resumeRun}
                    onStop={stopRun}
                  />
                </div>

                <div
                  className="marketing-mobile-run-status"
                  aria-live="polite"
                  data-phase={phase}
                >
                  <span className="marketing-mobile-run-status-label">Current run</span>
                  <p>{mobileStatus}</p>
                  {showApprovalActions && approvalRemainingMs !== null ? (
                    <ApprovalActions
                      onApprove={() => void approveRun()}
                      onReject={() => void rejectRun()}
                      onViewContext={() => setActiveBottomTab("context")}
                      remainingMs={approvalRemainingMs}
                      totalMs={autoApproveDelayMs}
                    />
                  ) : null}
                </div>

                <div className="marketing-flow">
                  {productStageNodes.map((node, index) => (
                    <div
                      className="marketing-node"
                      data-highlighted={node.highlighted || undefined}
                      data-status={stepStatuses[index]}
                      data-connector={
                        index === 2 || index === 5 ? "none" : undefined
                      }
                      key={node.title}
                    >
                      <div className="marketing-node-type">
                        <span className="marketing-node-icon" />
                        {node.type}
                      </div>
                      <h4>{node.title}</h4>
                      <p>{node.description}</p>
                      {stepStatuses[index] === "running" &&
                      toolCallsByStep[index] ? (
                        <p className="marketing-node-tool-call">
                          {toolCallsByStep[index]}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <StageBottomBar
                activeTab={activeBottomTab}
                onTabChange={setActiveBottomTab}
                events={events}
                runContext={runContext}
                timeline={timeline}
                phase={phase}
                currentMs={currentMs}
              />
            </div>

            <aside
              className="marketing-app-inspector"
              aria-label="Workflow run inspector"
            >
              <div className="marketing-side-label">Current run</div>
              <div className="marketing-status-row">
                <span>Status</span>
                <span
                  className="marketing-status"
                  data-tone={
                    phase === "approval"
                      ? "waiting"
                      : phase === "paused"
                        ? "waiting"
                      : phase === "rejected"
                        ? "failed"
                      : phase === "stopped"
                        ? "failed"
                      : phase === "complete"
                        ? "done"
                        : phase === "running"
                          ? "running"
                          : "idle"
                  }
                >
                  {phase === "idle"
                    ? "Ready"
                    : phase === "paused"
                      ? "Paused"
                    : phase === "stopped"
                      ? "Stopped"
                    : phase === "rejected"
                      ? "Rejected"
                    : phase === "complete"
                      ? "Complete"
                      : phase === "approval"
                        ? "Waiting"
                        : "Running"}
                </span>
              </div>
              <div className="marketing-status-row">
                <span>Round</span>
                <span>{round > 0 ? String(round).padStart(2, "0") : "—"}</span>
              </div>
              <div className="marketing-status-row">
                <span>Started</span>
                <span>{startedLabel}</span>
              </div>
              <div className="marketing-status-row">
                <span>Events</span>
                <span>{events.length > 0 ? events.length : "—"}</span>
              </div>

              {showApprovalActions && approvalRemainingMs !== null ? (
                <ApprovalActions
                  onApprove={() => void approveRun()}
                  onReject={() => void rejectRun()}
                  onViewContext={() => setActiveBottomTab("context")}
                  remainingMs={approvalRemainingMs}
                  totalMs={autoApproveDelayMs}
                />
              ) : null}

              <p className="marketing-tiny">
                Context, events, and timeline stream in the bottom panel as the
                run executes.
              </p>
            </aside>
          </div>
        </figure>
      </div>
    </section>
  );
}
