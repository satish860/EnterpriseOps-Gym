/**
 * Auto-generated wrapper for MCP tool: create_channel
 * Domain: teams (port 8002)
 *
 * Create a new channel in a team. API Endpoint: POST /teams/{team-id}/channels
 */
import { callTool } from "../../src/client.js";

export interface CreateChannelInput {
  /** Unique team identifier where the channel will be created */
  teamId: string;
  /** Channel display name */
  displayName: string;
  /** Channel description (optional) */
  description?: string;
  /** Channel membership type */
  membershipType?: "standard" | "private" | "shared";
  /** Initial channel members (required for private/shared channels) */
  members?: Array<{
    user_odata_bind?: string;
    roles?: Array<"owner" | "member" | "guest">;
    displayName?: string;
    email?: string
  }>;
  /** Whether channel is favorite by default */
  isFavoriteByDefault?: boolean;
  /** Special creation mode for data migration. When specified, createdDateTime can be provided. */
  _microsoft_graph_channelCreationMode?: "migration";
}

/**
 * Create a new channel in a team. API Endpoint: POST /teams/{team-id}/channels
 */
export async function createChannel(input: CreateChannelInput): Promise<unknown> {
  return callTool("teams", "create_channel", input);
}
