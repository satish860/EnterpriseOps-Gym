/**
 * Auto-generated wrapper for MCP tool: unset_channel_message_reaction
 * Domain: teams (port 8002)
 *
 * Unset a reaction from a channel message or reply (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface UnsetChannelMessageReactionInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique message identifier */
  messageId: string;
  /** Optional reply identifier (for unsetting reaction from a reply) */
  replyId?: string;
  /** Reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡') */
  reactionType: string;
}

/**
 * Unset a reaction from a channel message or reply (Microsoft Graph API compliant).
 */
export async function unsetChannelMessageReaction(input: UnsetChannelMessageReactionInput): Promise<unknown> {
  return callTool("teams", "unset_channel_message_reaction", input);
}
