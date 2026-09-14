import { CONSOLE_APP_URL } from "@/config/site";

function consoleBase() {
  return CONSOLE_APP_URL.replace(/\/$/, "");
}

export function workflowPackageInstallUrl(packageId: string, version = "1") {
  const params = new URLSearchParams({
    package_id: packageId.trim(),
    version: version.trim() || "1",
  });
  return `${consoleBase()}/marketplace/install/workflow?${params.toString()}`;
}

export function agentPackageInstallUrl(packageId: string, version = "1") {
  const params = new URLSearchParams({
    package_id: packageId.trim(),
    version: version.trim() || "1",
  });
  return `${consoleBase()}/marketplace/install/agent?${params.toString()}`;
}

export function catalogBundleInstallUrl(bundleId: string, version = "1") {
  const params = new URLSearchParams({
    bundle_id: bundleId.trim(),
    version: version.trim() || "1",
  });
  return `${consoleBase()}/marketplace/install/bundle?${params.toString()}`;
}

export function marketplaceWorkflowPath(packageId: string) {
  return `/marketplace/workflows/${encodeURIComponent(packageId)}`;
}

export function marketplaceAgentPath(packageId: string) {
  return `/marketplace/agents/${encodeURIComponent(packageId)}`;
}

export function marketplaceBundlePath(bundleId: string) {
  return `/marketplace/bundles/${encodeURIComponent(bundleId)}`;
}
