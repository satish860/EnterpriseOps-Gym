/**
 * Auto-generated wrapper for MCP tool: create_teamwork_tag_member
 * Domain: teams (port 8002)
 *
 * Create a new teamworkTagMember - add a user to a teamwork tag. API Endpoint: POST /teams/{team_id}/tags/{tag_id}/members
 */
import { callTool } from "../../src/client.js";

export interface CreateTeamworkTagMemberInput {
  /** ID of the team containing the tag */
  team_id: string;
  /** ID of the teamwork tag to add member to */
  tag_id: string;
  /** The unique identifier for the member of the team */
  userId: string;
}

/**
 * Create a new teamworkTagMember - add a user to a teamwork tag. API Endpoint: POST /teams/{team_id}/tags/{tag_id}/members
 */
export async function createTeamworkTagMember(input: CreateTeamworkTagMemberInput): Promise<unknown> {
  return callTool("teams", "create_teamwork_tag_member", input);
}
