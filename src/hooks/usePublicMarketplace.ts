import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicAgentPackage,
  fetchPublicAgentPackages,
  fetchPublicCatalogBundle,
  fetchPublicCatalogBundles,
  fetchPublicWorkflowPackage,
  fetchPublicWorkflowPackages,
} from "@/api/marketplace";

export function usePublicWorkflowPackages(connector?: string) {
  return useQuery({
    queryKey: ["public-marketplace-workflows", connector ?? "all"],
    queryFn: () => fetchPublicWorkflowPackages(connector),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicWorkflowPackage(packageId?: string, version = "1") {
  return useQuery({
    queryKey: ["public-marketplace-workflow", packageId, version],
    queryFn: () => fetchPublicWorkflowPackage(packageId ?? "", version),
    enabled: Boolean(packageId?.trim()),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicAgentPackages(connector?: string) {
  return useQuery({
    queryKey: ["public-marketplace-agents", connector ?? "all"],
    queryFn: () => fetchPublicAgentPackages(connector),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicAgentPackage(packageId?: string, version = "1") {
  return useQuery({
    queryKey: ["public-marketplace-agent", packageId, version],
    queryFn: () => fetchPublicAgentPackage(packageId ?? "", version),
    enabled: Boolean(packageId?.trim()),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicCatalogBundles(connector?: string) {
  return useQuery({
    queryKey: ["public-marketplace-bundles", connector ?? "all"],
    queryFn: () => fetchPublicCatalogBundles(connector),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicCatalogBundle(bundleId?: string, version = "1") {
  return useQuery({
    queryKey: ["public-marketplace-bundle", bundleId, version],
    queryFn: () => fetchPublicCatalogBundle(bundleId ?? "", version),
    enabled: Boolean(bundleId?.trim()),
    staleTime: 5 * 60 * 1000,
  });
}
