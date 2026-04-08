/**
 * Auto-generated wrapper for MCP tool: create_teamwork_tag
 * Domain: teams (port 8002)
 *
 * Create a new teamworkTag. API Endpoint: POST /teams/{team_id}/tags
 */
import { callTool } from "../../src/client.js";

export interface CreateTeamworkTagInput {
  /** ID of the team in which the tag is defined */
  team_id: string;
  /** The name of the tag (max 40 characters) */
  displayName: string;
  /** Optional description of the tag */
  description?: string;
  /** Members assigned to the tag (max 25 members) */
  members?: Array<{
    userId?: string;
    displayName?: string
  }>;
}

/**
 * Create a new teamworkTag. API Endpoint: POST /teams/{team_id}/tags
 */
export async function createTeamworkTag(input: CreateTeamworkTagInput): Promise<unknown> {
  return callTool("teams", "create_teamwork_tag", input);
}
