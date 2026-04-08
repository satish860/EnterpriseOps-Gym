/**
 * Auto-generated wrapper for MCP tool: add_team_members_in_bulk
 * Domain: teams (port 8002)
 *
 * Add multiple members to a team in bulk. API Endpoint: POST /teams/{team-id}/members/add
 */
import { callTool } from "../../src/client.js";

export interface AddTeamMembersInBulkInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** List of members to add */
  values: Array<{
    _odata_type?: string;
    roles?: Array<"owner" | "member" | "guest">;
    user_odata_bind?: string;
    visibleHistoryStartDateTime?: string
  }>;
}

/**
 * Add multiple members to a team in bulk. API Endpoint: POST /teams/{team-id}/members/add
 */
export async function addTeamMembersInBulk(input: AddTeamMembersInBulkInput): Promise<unknown> {
  return callTool("teams", "add_team_members_in_bulk", input);
}
