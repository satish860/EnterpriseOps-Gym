/**
 * Auto-generated wrapper for MCP tool: add_team_member
 * Domain: teams (port 8002)
 *
 * Add a member to a team. API Endpoint: POST /teams/{team-id}/members
 */
import { callTool } from "../../src/client.js";

export interface AddTeamMemberInput {
  /** Unique team identifier */
  teamId: string;
  /** OData type identifier */
  _odata_type?: string;
  /** Member roles in the team */
  roles?: Array<"owner" | "member" | "guest">;
  /** User reference (e.g., 'https://graph.microsoft.com/v1.0/users('user-id')') */
  user_odata_bind: string;
  /** Timestamp denoting how far back a conversation's history is shared with the member (ISO 8601 format) */
  visibleHistoryStartDateTime?: string;
}

/**
 * Add a member to a team. API Endpoint: POST /teams/{team-id}/members
 */
export async function addTeamMember(input: AddTeamMemberInput): Promise<unknown> {
  return callTool("teams", "add_team_member", input);
}
