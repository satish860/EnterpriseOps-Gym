/**
 * Auto-generated wrapper for MCP tool: update_team_member
 * Domain: teams (port 8002)
 *
 * Update a team member's roles. API Endpoint: PATCH /teams/{team-id}/members/{membership-id}
 */
import { callTool } from "../../src/client.js";

export interface UpdateTeamMemberInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique membership identifier */
  membershipId: string;
  /** Updated member roles in the team */
  roles: Array<"owner" | "member" | "guest">;
}

/**
 * Update a team member's roles. API Endpoint: PATCH /teams/{team-id}/members/{membership-id}
 */
export async function updateTeamMember(input: UpdateTeamMemberInput): Promise<unknown> {
  return callTool("teams", "update_team_member", input);
}
