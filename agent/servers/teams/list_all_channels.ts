/**
 * Auto-generated wrapper for MCP tool: list_all_channels
 * Domain: teams (port 8002)
 *
 * Get the list of channels either in this team or shared with this team (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ListAllChannelsInput {
  /** Unique team identifier (use team_techcorp_001 or team_globalex_002 for sample data) */
  teamId: string;
  /** OData filter expression for membershipType filtering */
  _filter?: string;
  /** Comma-separated list of properties to return for performance optimization. Recommended to exclude em */
  _select?: string;
}

/**
 * Get the list of channels either in this team or shared with this team (Microsoft Graph API compliant).
 */
export async function listAllChannels(input: ListAllChannelsInput): Promise<unknown> {
  return callTool("teams", "list_all_channels", input);
}
