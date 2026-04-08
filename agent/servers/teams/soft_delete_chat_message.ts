/**
 * Auto-generated wrapper for MCP tool: soft_delete_chat_message
 * Domain: teams (port 8002)
 *
 * Delete a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}/chats/{chatsId
 */
import { callTool } from "../../src/client.js";

export interface SoftDeleteChatMessageInput {
  /** Unique chat identifier */
  chatId: string;
  /** Unique message identifier to soft delete */
  messageId: string;
}

/**
 * Delete a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}/chats/{chatsId
 */
export async function softDeleteChatMessage(input: SoftDeleteChatMessageInput): Promise<unknown> {
  return callTool("teams", "soft_delete_chat_message", input);
}
