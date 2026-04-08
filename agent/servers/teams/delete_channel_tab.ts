/**
 * Auto-generated wrapper for MCP tool: delete_channel_tab
 * Domain: teams (port 8002)
 *
 * Remove (unpin) a tab from a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface DeleteChannelTabInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique tab identifier to delete */
  tabId: string;
}

/**
 * Remove (unpin) a tab from a channel (Microsoft Graph API compliant).
 */
export async function deleteChannelTab(input: DeleteChannelTabInput): Promise<unknown> {
  return callTool("teams", "delete_channel_tab", input);
}
