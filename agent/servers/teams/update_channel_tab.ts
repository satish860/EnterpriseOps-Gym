/**
 * Auto-generated wrapper for MCP tool: update_channel_tab
 * Domain: teams (port 8002)
 *
 * Update the properties of a tab in a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface UpdateChannelTabInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique tab identifier to update */
  tabId: string;
  /** Updated tab display name (1-128 characters) */
  displayName?: string;
  /** Updated tab configuration settings */
  configuration?: {
    entityId?: string;
    contentUrl?: string;
    websiteUrl?: string;
    removeUrl?: string
  };
}

/**
 * Update the properties of a tab in a channel (Microsoft Graph API compliant).
 */
export async function updateChannelTab(input: UpdateChannelTabInput): Promise<unknown> {
  return callTool("teams", "update_channel_tab", input);
}
