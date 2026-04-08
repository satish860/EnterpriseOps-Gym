/**
 * Auto-generated wrapper for MCP tool: set_chat_message_reaction
 * Domain: teams (port 8002)
 *
 * Set a reaction to a chat message (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface SetChatMessageReactionInput {
  /** Unique chat identifier */
  chatId: string;
  /** Unique message identifier to react to */
  messageId: string;
  /** The reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡') */
  reactionType: string;
}

/**
 * Set a reaction to a chat message (Microsoft Graph API compliant).
 */
export async function setChatMessageReaction(input: SetChatMessageReactionInput): Promise<unknown> {
  return callTool("teams", "set_chat_message_reaction", input);
}
