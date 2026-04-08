/**
 * Auto-generated wrapper for MCP tool: add_tab_to_chat
 * Domain: teams (port 8002)
 *
 * Add (pin) a tab to the specified chat.
 */
import { callTool } from "../../src/client.js";

export interface AddTabToChatInput {
  /** Unique chat identifier where the tab will be added */
  chatId: string;
  /** Name of the tab */
  displayName: string;
  /** Teams app reference. Must be full Microsoft Graph URL: https://graph.microsoft.com/v1.0/appCatalogs/ */
  teamsApp_odata_bind: string;
  /** Container for custom settings applied to a tab */
  configuration?: {
    entityId?: string;
    contentUrl?: string;
    removeUrl?: string;
    websiteUrl?: string
  };
}

/**
 * Add (pin) a tab to the specified chat.
 */
export async function addTabToChat(input: AddTabToChatInput): Promise<unknown> {
  return callTool("teams", "add_tab_to_chat", input);
}
