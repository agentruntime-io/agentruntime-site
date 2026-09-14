import { api } from "@/config/api";

export type PublicConnector = {
  slug: string;
  name: string;
  description?: string;
  icon_url?: string;
  tool_count: number;
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
