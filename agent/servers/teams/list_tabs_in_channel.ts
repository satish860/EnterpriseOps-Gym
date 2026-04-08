/**
 * Auto-generated wrapper for MCP tool: list_tabs_in_channel
 * Domain: teams (port 8002)
 *
 * Retrieve the list of tabs in the specified channel within a team (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ListTabsInChannelInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** OData filter expression (e.g., 'teamsApp/id eq \'com.microsoft.teamspace.tab.wiki\'') */
  _filter?: string;
  /** Comma-separated list of properties to return */
  _select?: string;
  /** OData expand expression (e.g., 'teamsApp' to include app details) */
  _expand?: string;
}

/**
 * Retrieve the list of tabs in the specified channel within a team (Microsoft Graph API compliant).
 */
export async function listTabsInChannel(input: ListTabsInChannelInput): Promise<unknown> {
  return callTool("teams", "list_tabs_in_channel", input);
}
