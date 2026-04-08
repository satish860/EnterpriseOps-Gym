/**
 * Auto-generated wrapper for MCP tool: list_installed_apps
 * Domain: teams (port 8002)
 *
 * Retrieve the list of apps installed in the specified team. Supports OData query parameters for filtering, expanding, and
 */
import { callTool } from "../../src/client.js";

export interface ListInstalledAppsInput {
  /** Unique team identifier */
  teamId: string;
  /** Expand related entities. Use 'teamsAppDefinition' to get app version details, 'teamsApp' to get app  */
  _expand?: string;
  /** Filter results by app external ID (manifest ID). Use format: teamsApp/externalId eq 'app-external-id */
  _filter?: string;
  /** Select specific fields to return. Useful for getting resource-specific permissions. Comma-separated  */
  _select?: string;
}

/**
 * Retrieve the list of apps installed in the specified team. Supports OData query parameters for filtering, expanding, and
 */
export async function listInstalledApps(input: ListInstalledAppsInput): Promise<unknown> {
  return callTool("teams", "list_installed_apps", input);
}
