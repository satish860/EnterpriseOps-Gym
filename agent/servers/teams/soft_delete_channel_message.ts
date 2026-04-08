/**
 * Auto-generated wrapper for MCP tool: soft_delete_channel_message
 * Domain: teams (port 8002)
 *
 * Delete a single chatMessage or reply in a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface SoftDeleteChannelMessageInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique message identifier to soft delete */
  messageId: string;
  /** Optional reply identifier (for soft deleting a specific reply to a message) */
  replyId?: string;
}

/**
 * Delete a single chatMessage or reply in a channel (Microsoft Graph API compliant).
 */
export async function softDeleteChannelMessage(input: SoftDeleteChannelMessageInput): Promise<unknown> {
  return callTool("teams", "soft_delete_channel_message", input);
}
