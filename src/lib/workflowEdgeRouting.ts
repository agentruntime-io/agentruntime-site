import type { PortSide } from "@/lib/workflowGraphLayout";
import type { WorkflowGraphEdge } from "@/lib/workflowGraphEdges";

export type NodeRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  cx: number;
  cy: number;
};

export function getPortPoint(
  rect: NodeRect,
  side: PortSide,
): { x: number; y: number } {
  switch (side) {
    case "left":
      return { x: rect.left, y: rect.cy };
    case "right":
      return { x: rect.right, y: rect.cy };
    case "top":
      return { x: rect.cx, y: rect.top };
    case "bottom":
      return { x: rect.cx, y: rect.bottom };
  }
}

export function buildRoutedEdgePath(
  from: NodeRect,
  to: NodeRect,
  fromPort: PortSide,
  toPort: PortSide,
  variant: WorkflowGraphEdge["variant"] = "primary",
): string {
  const start = getPortPoint(from, fromPort);
  const end = getPortPoint(to, toPort);

  if (fromPort === "right" && toPort === "left") {
    const bendX = start.x + Math.max((end.x - start.x) / 2, 24);
    if (Math.abs(start.y - end.y) < 6) {
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    return [
      `M ${start.x} ${start.y}`,
      `L ${bendX} ${start.y}`,
      `L ${bendX} ${end.y}`,
      `L ${end.x} ${end.y}`,
    ].join(" ");
  }

  if (fromPort === "bottom" && toPort === "top") {
    const gap = end.y - start.y;
    const bendY =
      variant === "alternate"
        ? start.y + Math.max(gap * 0.42, 30)
        : start.y + gap / 2;

    if (Math.abs(start.x - end.x) < 6) {
      return [
        `M ${start.x} ${start.y}`,
        `L ${start.x} ${bendY}`,
        `L ${end.x} ${bendY}`,
        `L ${end.x} ${end.y}`,
      ].join(" ");
    }

    return [
      `M ${start.x} ${start.y}`,
      `L ${start.x} ${bendY}`,
      `L ${end.x} ${bendY}`,
      `L ${end.x} ${end.y}`,
    ].join(" ");
  }

  if (fromPort === "left" && toPort === "right") {
    const bendX = end.x - Math.max((end.x - start.x) / 2, 24);
    return [
      `M ${start.x} ${start.y}`,
      `L ${bendX} ${start.y}`,
      `L ${bendX} ${end.y}`,
      `L ${end.x} ${end.y}`,
    ].join(" ");
  }

  const bendX = start.x + (end.x - start.x) / 2;
  const bendY = start.y + (end.y - start.y) / 2;
  return [
    `M ${start.x} ${start.y}`,
    `L ${bendX} ${start.y}`,
    `L ${bendX} ${bendY}`,
    `L ${end.x} ${bendY}`,
    `L ${end.x} ${end.y}`,
  ].join(" ");
}

export function getEdgeLabelPosition(
  from: NodeRect,
  to: NodeRect,
  fromPort: PortSide,
  toPort: PortSide,
  variant: WorkflowGraphEdge["variant"] = "primary",
): { x: number; y: number } {
  const start = getPortPoint(from, fromPort);
  const end = getPortPoint(to, toPort);

  if (fromPort === "right" && toPort === "left") {
    return {
      x: (start.x + end.x) / 2,
      y: Math.min(start.y, end.y) - 12,
    };
  }

  if (fromPort === "bottom" && toPort === "top") {
    const bendY =
      variant === "alternate"
        ? start.y + Math.max((end.y - start.y) * 0.42, 30)
        : start.y + (end.y - start.y) / 2;

    return {
      x: (start.x + end.x) / 2,
      y: bendY - 8,
    };
  }

  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
}
