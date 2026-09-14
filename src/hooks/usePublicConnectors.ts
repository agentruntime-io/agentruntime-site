import { useQuery } from "@tanstack/react-query";
import { fetchPublicConnectors, type PublicConnector } from "@/api/connectors";

export function usePublicConnectors() {
  return useQuery({
    queryKey: ["public-connectors"],
    queryFn: fetchPublicConnectors,
    staleTime: 5 * 60 * 1000,
  });
}

export function findPublicConnector(
  connectors: readonly PublicConnector[],
  slug: string | undefined,
) {
  if (!slug) {
    return undefined;
  }

  const normalized = slug.trim().toLowerCase();
  return connectors.find((connector) => connector.slug.toLowerCase() === normalized);
}
