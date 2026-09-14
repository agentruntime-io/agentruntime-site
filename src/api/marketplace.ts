import { api } from "@/config/api";

export type PublicWorkflowPackage = {
  package_id: string;
  version: string;
  visibility: string;
  display_name: string;
  description?: string;
  connector_slugs?: string[];
  trigger_kinds?: string[];
  has_human_task?: boolean;
  step_count?: number;
  execution_steps?: Array<{
    id: string;
    type: string;
    name?: string;
  }>;
};

export type PublicAgentPackage = {
  package_id: string;
  version: string;
  visibility: string;
  display_name: string;
  description?: string;
  price_credits?: number;
  hire_required?: boolean;
  connector_slugs?: string[];
  capability_groups?: string[];
  workflow_count?: number;
};

export type PublicCatalogBundle = {
  bundle_id: string;
  version: string;
  visibility: string;
  display_name: string;
  description?: string;
  price_credits?: number;
  hire_required?: boolean;
  agent_package_id?: string;
  workflow_package_ids?: string[];
  connector_slugs?: string[];
};

type ListResponse<T> = {
  items: T[];
  count: number;
};

async function fetchPublicMarketplaceList<T>(
  endpoint: string | undefined,
  connector?: string,
  errorLabel = "marketplace items",
): Promise<T[]> {
  if (!endpoint) {
    return [];
  }

  const url = new URL(endpoint);
  if (connector?.trim()) {
    url.searchParams.set("connector", connector.trim());
  }

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${errorLabel} unavailable (${response.status})`);
  }

  const payload = (await response.json()) as ListResponse<T>;
  return payload.items ?? [];
}

async function fetchPublicMarketplaceLookup<T>(
  endpoint: string | undefined,
  params: Record<string, string>,
  errorLabel = "marketplace item",
): Promise<T | null> {
  if (!endpoint) {
    return null;
  }

  const url = new URL(endpoint);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`${errorLabel} unavailable (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function fetchPublicWorkflowPackages(
  connector?: string,
): Promise<PublicWorkflowPackage[]> {
  return fetchPublicMarketplaceList(
    api.publicMarketplaceWorkflows,
    connector,
    "marketplace workflows",
  );
}

export async function fetchPublicWorkflowPackage(
  packageId: string,
  version = "1",
): Promise<PublicWorkflowPackage | null> {
  return fetchPublicMarketplaceLookup(
    api.publicMarketplaceWorkflowLookup,
    { package_id: packageId, version },
    "workflow package",
  );
}

export async function fetchPublicAgentPackages(
  connector?: string,
): Promise<PublicAgentPackage[]> {
  return fetchPublicMarketplaceList(
    api.publicMarketplaceAgents,
    connector,
    "marketplace agents",
  );
}

export async function fetchPublicAgentPackage(
  packageId: string,
  version = "1",
): Promise<PublicAgentPackage | null> {
  return fetchPublicMarketplaceLookup(
    api.publicMarketplaceAgentLookup,
    { package_id: packageId, version },
    "agent package",
  );
}

export async function fetchPublicCatalogBundles(
  connector?: string,
): Promise<PublicCatalogBundle[]> {
  return fetchPublicMarketplaceList(
    api.publicMarketplaceBundles,
    connector,
    "marketplace bundles",
  );
}

export async function fetchPublicCatalogBundle(
  bundleId: string,
  version = "1",
): Promise<PublicCatalogBundle | null> {
  return fetchPublicMarketplaceLookup(
    api.publicMarketplaceBundleLookup,
    { bundle_id: bundleId, version },
    "catalog bundle",
  );
}
