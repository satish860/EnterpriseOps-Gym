/**
 * Auto-generated wrapper for MCP tool: update_teamwork_tag
 * Domain: teams (port 8002)
 *
 * Update a teamworkTag. API Endpoint: PATCH /teams/{team_id}/tags/{tag_id}
 */
import { callTool } from "../../src/client.js";

export interface UpdateTeamworkTagInput {
  /** ID of the team containing the tag */
  team_id: string;
  /** Unique teamworkTag identifier */
  tag_id: string;
  /** Updated name of the tag (max 40 characters) */
  displayName?: string;
  /** Updated description of the tag */
  description?: string;
  /** Updated members list (max 25 members) */
  members?: Array<{
    userId?: string;
    displayName?: string
  }>;
}

/**
 * Update a teamworkTag. API Endpoint: PATCH /teams/{team_id}/tags/{tag_id}
 */
export async function updateTeamworkTag(input: UpdateTeamworkTagInput): Promise<unknown> {
  return callTool("teams", "update_teamwork_tag", input);
}
