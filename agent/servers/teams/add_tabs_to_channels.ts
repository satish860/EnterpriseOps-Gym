/**
 * Auto-generated wrapper for MCP tool: add_tabs_to_channels
 * Domain: teams (port 8002)
 *
 * Add (pin) a tab to the specified channel within a team (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface AddTabsToChannelsInput {
  /** Unique team identifier where the tab will be added */
  teamId: string;
  /** Unique channel identifier where the tab will be pinned */
  channelId: string;
  /** Name of the tab as it will appear to users in Microsoft Teams */
  displayName: string;
  /** OData bind URL for the Teams app to pin as a tab. Format: 'https://graph.microsoft.com/v1.0/appCatal */
  teamsApp_odata_bind: string;
  /** Container for custom settings applied to a tab (required for configurable tabs) */
  configuration?: {
    entityId?: string;
    contentUrl?: string;
    websiteUrl?: string;
    removeUrl?: string
  };
}

/**
 * Add (pin) a tab to the specified channel within a team (Microsoft Graph API compliant).
 */
export async function addTabsToChannels(input: AddTabsToChannelsInput): Promise<unknown> {
  return callTool("teams", "add_tabs_to_channels", input);
}
