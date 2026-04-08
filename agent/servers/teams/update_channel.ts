/**
 * Auto-generated wrapper for MCP tool: update_channel
 * Domain: teams (port 8002)
 *
 * Update a channel's properties. API Endpoint: PATCH /teams/{team-id}/channels/{channel-id}
 */
import { callTool } from "../../src/client.js";

export interface UpdateChannelInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Updated channel display name */
  displayName?: string;
  /** Updated channel description */
  description?: string;
  /** Updated favorite by default setting */
  isFavoriteByDefault?: boolean;
}

/**
 * Update a channel's properties. API Endpoint: PATCH /teams/{team-id}/channels/{channel-id}
 */
export async function updateChannel(input: UpdateChannelInput): Promise<unknown> {
  return callTool("teams", "update_channel", input);
}
