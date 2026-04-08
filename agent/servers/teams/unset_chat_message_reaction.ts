/**
 * Auto-generated wrapper for MCP tool: unset_chat_message_reaction
 * Domain: teams (port 8002)
 *
 * Unset a reaction from a chat message (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface UnsetChatMessageReactionInput {
  /** Unique chat identifier */
  chatId: string;
  /** Unique message identifier to remove reaction from */
  messageId: string;
  /** The reaction type as unicode to remove (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡') */
  reactionType: string;
}

/**
 * Unset a reaction from a chat message (Microsoft Graph API compliant).
 */
export async function unsetChatMessageReaction(input: UnsetChatMessageReactionInput): Promise<unknown> {
  return callTool("teams", "unset_chat_message_reaction", input);
}
