import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import type {
  ProductStageNode,
  StepStatus,
  ToolCallDetail,
} from "@/lib/productStageDemo";
import {
  buildRoutedEdgePath,
  getEdgeLabelPosition,
  type NodeRect,
} from "@/lib/workflowEdgeRouting";
import {
  createLinearWorkflowEdges,
  standardSixNodeWorkflowEdges,
  type WorkflowGraphEdge,
} from "@/lib/workflowGraphEdges";
import {
  getWorkflowGraphLayout,
  type PortSide,
  type WorkflowGraphLayout,
  type WorkflowNodeLayout,
} from "@/lib/workflowGraphLayout";

type RenderedWorkflowEdge = WorkflowGraphEdge & {
  key: string;
  d: string;
  labelX?: number;
  labelY?: number;
};

function resolveEdgePorts(
  edge: WorkflowGraphEdge,
  layouts: readonly WorkflowNodeLayout[],
): { fromPort: PortSide; toPort: PortSide } {
  const fromLayout = layouts[edge.from];
  const toLayout = layouts[edge.to];

  return {
    fromPort: edge.fromPort ?? fromLayout?.outputPort ?? "right",
    toPort: edge.toPort ?? toLayout?.inputPort ?? "left",
  };
}

function getEdgeStatus(
  edge: WorkflowGraphEdge,
  stepStatuses: readonly StepStatus[],
): "pending" | "active" | "done" {
  if (edge.variant === "alternate") {
    return "pending";
  }

  const sourceStatus = stepStatuses[edge.from];
  const targetStatus = stepStatuses[edge.to];

  if (
    sourceStatus === "done" &&
    (targetStatus === "done" ||
      targetStatus === "running" ||
      targetStatus === "waiting" ||
      targetStatus === "failed")
  ) {
    return "done";
  }

  if (sourceStatus === "running" || targetStatus === "running") {
    return "active";
  }

  if (sourceStatus === "waiting" || targetStatus === "waiting") {
    return "active";
  }

  return "pending";
}

function useWorkflowEdges(
  containerRef: RefObject<HTMLDivElement | null>,
  nodeRefs: RefObject<(HTMLDivElement | null)[]>,
  nodeCount: number,
  graphEdges: readonly WorkflowGraphEdge[],
  layout: WorkflowGraphLayout,
) {
  const [edges, setEdges] = useState<RenderedWorkflowEdge[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const rects = nodeRefs.current.slice(0, nodeCount).map((node) => {
      if (!node) return null;

      const rect = node.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        cx: rect.left + rect.width / 2 - containerRect.left,
        cy: rect.top + rect.height / 2 - containerRect.top,
      } satisfies NodeRect;
    });

    if (rects.some((rect) => rect === null)) return;

    const nextEdges: RenderedWorkflowEdge[] = [];
    for (const edge of graphEdges) {
      const from = rects[edge.from];
      const to = rects[edge.to];
      if (!from || !to) continue;

      const { fromPort, toPort } = resolveEdgePorts(edge, layout.nodes);
      const labelPosition = edge.label
        ? getEdgeLabelPosition(from, to, fromPort, toPort, edge.variant)
        : undefined;

      nextEdges.push({
        ...edge,
        key: `${edge.from}-${edge.to}-${edge.variant ?? "primary"}`,
        d: buildRoutedEdgePath(from, to, fromPort, toPort, edge.variant),
        labelX: labelPosition?.x,
        labelY: labelPosition?.y,
      });
    }

    const nextWidth = containerRect.width;
    const nextHeight = containerRect.height;

    setSvgSize((previous) =>
      previous.width === nextWidth && previous.height === nextHeight
        ? previous
        : { width: nextWidth, height: nextHeight },
    );
    setEdges((previous) => {
      if (
        previous.length === nextEdges.length &&
        previous.every(
          (edge, index) =>
            edge.key === nextEdges[index]?.key && edge.d === nextEdges[index]?.d,
        )
      ) {
        return previous;
      }

      return nextEdges;
    });
  }, [containerRef, graphEdges, layout.nodes, nodeCount, nodeRefs]);

  useLayoutEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return { edges, svgSize };
}

type WorkflowNodeCardProps = {
  node: ProductStageNode;
  index: number;
  status: StepStatus;
  toolCall?: ToolCallDetail;
  layout: WorkflowNodeLayout;
  nodeRef: (element: HTMLDivElement | null) => void;
};

function WorkflowNodeCard({
  node,
  index,
  status,
  toolCall,
  layout,
  nodeRef,
}: WorkflowNodeCardProps) {
  const style = {
    gridColumn: layout.column,
    gridRow: layout.row,
  } satisfies CSSProperties;

  return (
    <div
      className="marketing-node"
      data-kind={node.kind}
      data-highlighted={node.highlighted || undefined}
      data-status={status}
      style={style}
      ref={nodeRef}
    >
      <span className="marketing-node-step-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      {layout.inputPort ? (
        <span
          className="marketing-node-port marketing-node-port-input"
          data-side={layout.inputPort}
          aria-hidden="true"
        />
      ) : null}
      {layout.outputPort ? (
        <span
          className="marketing-node-port marketing-node-port-output"
          data-side={layout.outputPort}
          aria-hidden="true"
        />
      ) : null}
      <div className="marketing-node-type">
        {node.integrationLogo ? (
          <img
            className="marketing-node-logo"
            src={node.integrationLogo}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <span className="marketing-node-icon" aria-hidden="true" />
        )}
        <span className="marketing-node-kind">{node.type}</span>
      </div>
      <h4>{node.title}</h4>
      <p>{node.description}</p>
      {status === "running" && toolCall ? (
        <p className="marketing-node-tool-call">
          {toolCall.logo ? (
            <img
              className="marketing-node-tool-call-logo"
              src={toolCall.logo}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          <span>{toolCall.label}</span>
        </p>
      ) : null}
    </div>
  );
}

export type WorkflowGraphProps = {
  nodes: readonly ProductStageNode[];
  stepStatuses: readonly StepStatus[];
  toolCallsByStep?: Partial<Record<number, ToolCallDetail>>;
  edges?: readonly WorkflowGraphEdge[];
  layout?: WorkflowGraphLayout;
  variant?: "demo" | "blueprint";
};

export function WorkflowGraph({
  nodes,
  stepStatuses,
  toolCallsByStep = {},
  edges,
  layout,
  variant = "demo",
}: WorkflowGraphProps) {
  const flowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const graphId = useId().replace(/:/g, "");
  const graphLayout = useMemo(
    () => layout ?? getWorkflowGraphLayout(nodes.length),
    [layout, nodes.length],
  );
  const graphEdges = useMemo(() => {
    if (edges) return edges;
    if (nodes.length === 6) {
      return standardSixNodeWorkflowEdges;
    }

    return createLinearWorkflowEdges(nodes.length);
  }, [edges, nodes.length]);
  const { edges: renderedEdges, svgSize } = useWorkflowEdges(
    flowRef,
    nodeRefs,
    nodes.length,
    graphEdges,
    graphLayout,
  );

  return (
    <div
      className="marketing-flow-shell"
      data-variant={variant === "blueprint" ? "blueprint" : undefined}
      data-connected={graphEdges.length > nodes.length - 1 || undefined}
      ref={flowRef}
    >
      <svg
        className="marketing-flow-edges"
        width={svgSize.width}
        height={svgSize.height}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={`marketing-flow-arrow-${graphId}`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
          </marker>
          <marker
            id={`marketing-flow-arrow-active-${graphId}`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
          </marker>
        </defs>
        {renderedEdges.map((edge) => {
          const status = getEdgeStatus(edge, stepStatuses);

          return (
            <g key={edge.key} className="marketing-flow-edge-group">
              <path
                className="marketing-flow-edge"
                data-status={status}
                data-variant={edge.variant ?? "primary"}
                d={edge.d}
                markerEnd={
                  status === "active"
                    ? `url(#marketing-flow-arrow-active-${graphId})`
                    : `url(#marketing-flow-arrow-${graphId})`
                }
              />
              {edge.label && edge.labelX !== undefined && edge.labelY !== undefined ? (
                <text
                  className="marketing-flow-edge-label"
                  data-variant={edge.variant ?? "primary"}
                  x={edge.labelX}
                  y={edge.labelY}
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      <div className="marketing-flow" data-layout={graphLayout.id}>
        {nodes.map((node, index) => (
          <WorkflowNodeCard
            key={`${node.title}-${index}`}
            node={node}
            index={index}
            status={stepStatuses[index] ?? "pending"}
            toolCall={toolCallsByStep[index]}
            layout={
              graphLayout.nodes[index] ?? {
                column: 1,
                row: index + 1,
              }
            }
            nodeRef={(element) => {
              nodeRefs.current[index] = element;
            }}
          />
        ))}
      </div>
    </div>
  );
}
