/**
 * Auto-generated wrapper for MCP tool: set_channel_message_reaction
 * Domain: teams (port 8002)
 *
 * Set a reaction to a channel message or reply (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface SetChannelMessageReactionInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique message identifier */
  messageId: string;
  /** Optional reply identifier (for setting reaction on a reply) */
  replyId?: string;
  /** Reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡') */
  reactionType: string;
}

/**
 * Set a reaction to a channel message or reply (Microsoft Graph API compliant).
 */
export async function setChannelMessageReaction(input: SetChannelMessageReactionInput): Promise<unknown> {
  return callTool("teams", "set_channel_message_reaction", input);
}
