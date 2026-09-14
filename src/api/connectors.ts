import { api } from "@/config/api";

export type PublicConnector = {
  slug: string;
  name: string;
  description?: string;
  icon_url?: string;
  tool_count: number;
};

export type PublicConnectorTool = {
  name: string;
  label?: string;
  description?: string;
  group?: string;
  access?: string;
};

export type PublicConnectorToolGroup = {
  name: string;
  tools: PublicConnectorTool[];
};

export type PublicConnectorDetail = PublicConnector & {
  tools?: PublicConnectorTool[];
  tool_groups?: PublicConnectorToolGroup[];
};

type PublicConnectorsResponse = {
  connectors?: PublicConnector[];
  count?: number;
};

export async function fetchPublicConnectors(): Promise<PublicConnector[]> {
  if (!api.publicConnectors) {
    return [];
  }

  const response = await fetch(api.publicConnectors);
  if (!response.ok) {
    throw new Error(`Failed to load connectors (${response.status})`);
  }

  const payload = (await response.json()) as PublicConnectorsResponse;
  return payload.connectors ?? [];
}

export async function fetchPublicConnectorDetail(
  slug: string,
): Promise<PublicConnectorDetail> {
  if (!api.publicConnectors) {
    throw new Error("Public connectors API is not configured");
  }

  const normalized = slug.trim().toLowerCase();
  const response = await fetch(`${api.publicConnectors}/${encodeURIComponent(normalized)}`);
  if (!response.ok) {
    throw new Error(`Failed to load connector (${response.status})`);
  }

  return (await response.json()) as PublicConnectorDetail;
}
