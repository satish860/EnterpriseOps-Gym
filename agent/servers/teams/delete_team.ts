/**
 * Auto-generated wrapper for MCP tool: delete_team
 * Domain: teams (port 8002)
 *
 * Delete a team (and its associated Microsoft 365 group). API Endpoint: DELETE /groups/{group-id}
 */
import { callTool } from "../../src/client.js";

export interface DeleteTeamInput {
  [key: string]: unknown;
  /** Unique team identifier (same as group ID) */
  teamId: string;
}

/**
 * Delete a team (and its associated Microsoft 365 group). API Endpoint: DELETE /groups/{group-id}
 */
export async function deleteTeam(input: DeleteTeamInput): Promise<unknown> {
  return callTool("teams", "delete_team", input);
}
