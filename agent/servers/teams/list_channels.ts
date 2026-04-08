/**
 * Auto-generated wrapper for MCP tool: list_channels
 * Domain: teams (port 8002)
 *
 * Retrieve the list of channels in a team (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ListChannelsInput {
  [key: string]: unknown;
  /** Unique team identifier (must be a team where the user is a member) */
  teamId: string;
  /** OData filter expression. Examples: 'membershipType eq \'private\'', 'membershipType eq \'shared\'',  */
  _filter?: string;
  /** Comma-separated list of properties to return for performance optimization. Recommended to exclude 'e */
  _select?: string;
}

/**
 * Retrieve the list of channels in a team (Microsoft Graph API compliant).
 */
export async function listChannels(input: ListChannelsInput): Promise<unknown> {
  return callTool("teams", "list_channels", input);
}
