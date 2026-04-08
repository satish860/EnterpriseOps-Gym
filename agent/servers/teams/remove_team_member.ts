/**
 * Auto-generated wrapper for MCP tool: remove_team_member
 * Domain: teams (port 8002)
 *
 * Remove a member from a team. API Endpoint: DELETE /teams/{team-id}/members/{membership-id}
 */
import { callTool } from "../../src/client.js";

export interface RemoveTeamMemberInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique membership identifier */
  membershipId: string;
}

/**
 * Remove a member from a team. API Endpoint: DELETE /teams/{team-id}/members/{membership-id}
 */
export async function removeTeamMember(input: RemoveTeamMemberInput): Promise<unknown> {
  return callTool("teams", "remove_team_member", input);
}
