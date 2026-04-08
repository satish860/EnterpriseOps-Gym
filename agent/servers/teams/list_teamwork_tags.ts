/**
 * Auto-generated wrapper for MCP tool: list_teamwork_tags
 * Domain: teams (port 8002)
 *
 * List all teamworkTags. API Endpoint: GET /teams/{team_id}/tags. Supports OData query parameters for filtering and pagina
 */
import { callTool } from "../../src/client.js";

export interface ListTeamworkTagsInput {
  [key: string]: unknown;
  /** ID of the team to list tags from */
  team_id: string;
  /** OData $filter query parameter (e.g., "tagType eq 'standard'") */
  _filter?: string;
  /** OData $top query parameter - number of items to return */
  _top?: number;
}

/**
 * List all teamworkTags. API Endpoint: GET /teams/{team_id}/tags. Supports OData query parameters for filtering and pagina
 */
export async function listTeamworkTags(input: ListTeamworkTagsInput): Promise<unknown> {
  return callTool("teams", "list_teamwork_tags", input);
}
