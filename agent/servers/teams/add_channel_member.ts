/**
 * Auto-generated wrapper for MCP tool: add_channel_member
 * Domain: teams (port 8002)
 *
 * Add a member to a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface AddChannelMemberInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** OData type indicator */
  _odata_type?: string;
  /** OData bind URL for the user. Format: 'https://graph.microsoft.com/v1.0/users('{user-id}')' or 'https */
  user_odata_bind: string;
  /** The role for the user. Must be 'owner' or empty. */
  roles?: Array<"owner">;
}

/**
 * Add a member to a channel (Microsoft Graph API compliant).
 */
export async function addChannelMember(input: AddChannelMemberInput): Promise<unknown> {
  return callTool("teams", "add_channel_member", input);
}
