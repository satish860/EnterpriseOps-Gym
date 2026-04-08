/**
 * Auto-generated wrapper for MCP tool: undo_soft_delete_chat_message
 * Domain: teams (port 8002)
 *
 * Undo soft deletion of a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}
 */
import { callTool } from "../../src/client.js";

export interface UndoSoftDeleteChatMessageInput {
  [key: string]: unknown;
  /** Unique chat identifier */
  chatId: string;
  /** Unique message identifier to restore */
  messageId: string;
}

/**
 * Undo soft deletion of a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}
 */
export async function undoSoftDeleteChatMessage(input: UndoSoftDeleteChatMessageInput): Promise<unknown> {
  return callTool("teams", "undo_soft_delete_chat_message", input);
}
