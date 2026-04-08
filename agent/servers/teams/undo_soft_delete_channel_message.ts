/**
 * Auto-generated wrapper for MCP tool: undo_soft_delete_channel_message
 * Domain: teams (port 8002)
 *
 * Undo soft deletion of a single chatMessage or reply in a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface UndoSoftDeleteChannelMessageInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique message identifier to restore */
  messageId: string;
  /** Optional reply identifier (for restoring a specific reply to a message) */
  replyId?: string;
}

/**
 * Undo soft deletion of a single chatMessage or reply in a channel (Microsoft Graph API compliant).
 */
export async function undoSoftDeleteChannelMessage(input: UndoSoftDeleteChannelMessageInput): Promise<unknown> {
  return callTool("teams", "undo_soft_delete_channel_message", input);
}
