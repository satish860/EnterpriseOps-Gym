/**
 * Auto-generated wrapper for MCP tool: list_channel_messages
 * Domain: teams (port 8002)
 *
 * List messages in a channel. API Endpoint: GET /teams/{team-id}/channels/{channel-id}/messages
 */
import { callTool } from "../../src/client.js";

export interface ListChannelMessagesInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Number of messages to return */
  _top?: number;
  /** OData expand parameter to include related entities (e.g., 'replies' to include message replies) */
  _expand?: string;
}

/**
 * List messages in a channel. API Endpoint: GET /teams/{team-id}/channels/{channel-id}/messages
 */
export async function listChannelMessages(input: ListChannelMessagesInput): Promise<unknown> {
  return callTool("teams", "list_channel_messages", input);
}
