export type IntegrationTool = {
  name: string;
  label: string;
  description: string;
  group: "Channels" | "Messages" | "Users" | "Reactions";
  access: "Read" | "Write";
};

export type IntegrationDetailRecord = {
  slug: string;
  logoPath: string;
  headline: string;
  summary: string;
  cardSummary: string;
  authLabel: string;
  workflowStartLabel: string;
  authentication: string;
  workflowStart: string;
  tools: readonly IntegrationTool[];
  configuration: readonly {
    key: string;
    requirement: string;
    description: string;
  }[];
  representativeScopes: readonly string[];
  docsUrl: string;
  connectedServiceSlugs: readonly string[];
  relatedWorkflowSlugs: readonly string[];
};

/**
 * Connector-specific marketing facts must be traceable to committed contracts
 * and validation records. Slack sources:
 * - connectors/catalog/slack.json
 * - connectors/go-connectors/slack-connector/mcp/register.go
 * - connectors/go-connectors/slack-connector/mcp/register_test.go
 * - connectors/go-connectors/slack-connector/config/config.go
 * - connectors/go-connectors/slack-connector/test-args/suite.json
 */
export const integrationDetails = {
  slack: {
    slug: "slack",
    logoPath: "/integrations/slack.png",
    headline: "Bring governed workflows into Slack.",
    summary:
      "Use Slack as the human coordination surface for durable AgentRuntime workflows: discover accessible channels and users, read conversation context, post messages, reply in threads, and add reactions.",
    cardSummary:
      "Coordinate messages, threads, reactions, channels, and users while AgentRuntime keeps the workflow state.",
    authLabel: "OAuth token",
    workflowStartLabel: "API + webhook",
    authentication:
      "The connector accepts a Slack bot or user OAuth token (xoxb- or xoxp-). Required scopes depend on the methods used.",
    workflowStart:
      "Start the workflow from AgentRuntime or an external alert, then use Slack for conversation context, coordination, and updates.",
    tools: [
      {
        name: "slack_list_channels",
        label: "List accessible channels",
        description:
          "List public and private channels available to the token or a configured channel allowlist.",
        group: "Channels",
        access: "Read",
      },
      {
        name: "slack_get_channel_history",
        label: "Read channel history",
        description: "Get recent messages from an accessible Slack channel.",
        group: "Messages",
        access: "Read",
      },
      {
        name: "slack_get_thread_replies",
        label: "Read thread replies",
        description: "Get the messages and replies attached to a Slack thread.",
        group: "Messages",
        access: "Read",
      },
      {
        name: "slack_get_users",
        label: "List workspace users",
        description: "List workspace users with basic profile information.",
        group: "Users",
        access: "Read",
      },
      {
        name: "slack_get_user_profile",
        label: "Read a user profile",
        description: "Get detailed profile information for a Slack user.",
        group: "Users",
        access: "Read",
      },
      {
        name: "slack_post_message",
        label: "Post a message",
        description: "Post a new message to a channel or direct message.",
        group: "Messages",
        access: "Write",
      },
      {
        name: "slack_reply_to_thread",
        label: "Reply in a thread",
        description: "Post a reply beneath an existing Slack message.",
        group: "Messages",
        access: "Write",
      },
      {
        name: "slack_add_reaction",
        label: "Add a reaction",
        description: "Add an emoji reaction to an existing message.",
        group: "Reactions",
        access: "Write",
      },
    ],
    configuration: [
      {
        key: "slack_api_token",
        requirement: "Required",
        description:
          "Bot or user OAuth token with scopes for the Slack methods the workflow uses.",
      },
      {
        key: "slack_team_id",
        requirement: "Conditional",
        description:
          "Workspace team ID used by channel and user discovery when no channel allowlist is configured.",
      },
      {
        key: "slack_channel_ids",
        requirement: "Optional",
        description:
          "Comma-separated channel allowlist that restricts channel discovery.",
      },
      {
        key: "slack_api_base",
        requirement: "Optional",
        description: "Override for the Slack Web API base URL.",
      },
    ],
    representativeScopes: [
      "channels:read",
      "channels:history",
      "chat:write",
      "users:read",
      "reactions:write",
    ],
    docsUrl: "https://api.slack.com/web",
    connectedServiceSlugs: ["github", "posthog", "gmail"],
    relatedWorkflowSlugs: ["incident-response"],
  },
} satisfies Record<string, IntegrationDetailRecord>;

export function getIntegrationDetail(slug: string) {
  return integrationDetails[slug as keyof typeof integrationDetails];
}
