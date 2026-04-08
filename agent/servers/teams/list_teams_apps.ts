/**
 * Auto-generated wrapper for MCP tool: list_teams_apps
 * Domain: teams (port 8002)
 *
 * List Teams apps from the Microsoft Teams app catalog.
 */
import { callTool } from "../../src/client.js";

export interface ListTeamsAppsInput {
  [key: string]: unknown;
  /** OData filter to apply. Examples: "distributionMethod eq 'organization'", "id eq 'b1c5353a-7aca-41b3- */
  _filter?: string;
  /** Comma-separated list of properties to return. Example: "id,displayName,distributionMethod" */
  _select?: string;
  /** Comma-separated list of relationships to expand. Example: "appDefinitions" */
  _expand?: string;
}

/**
 * List Teams apps from the Microsoft Teams app catalog.
 */
export async function listTeamsApps(input: ListTeamsAppsInput): Promise<unknown> {
  return callTool("teams", "list_teams_apps", input);
}
