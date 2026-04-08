/**
 * Auto-generated wrapper for MCP tool: get_primary_channel
 * Domain: teams (port 8002)
 *
 * Get the primary channel (General channel) for a team (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface GetPrimaryChannelInput {
  [key: string]: unknown;
  /** Unique team identifier (must be a team where the user is a member or user has admin permissions) */
  teamId: string;
  /** OData filter expression. Examples: 'membershipType eq \'standard\'', 'membershipType eq \'private\'' */
  _filter?: string;
  /** Comma-separated list of properties to return for better performance. Use this to optimize query perf */
  _select?: string;
  /** OData expand expression to include related entities */
  _expand?: string;
}

/**
 * Get the primary channel (General channel) for a team (Microsoft Graph API compliant).
 */
export async function getPrimaryChannel(input: GetPrimaryChannelInput): Promise<unknown> {
  return callTool("teams", "get_primary_channel", input);
}
