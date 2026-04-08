/**
 * Auto-generated wrapper for MCP tool: list_teams
 * Domain: teams (port 8002)
 *
 * List all teams in an organization following Microsoft Graph API v1.0. Supports OData query parameters: $filter, $select,
 */
import { callTool } from "../../src/client.js";

export interface ListTeamsInput {
  [key: string]: unknown;
  /** Number of items to return (max 1000) */
  _top?: number;
  /** Pagination token for retrieving the next page of results */
  _skiptoken?: string;
  /** OData filter expression to filter teams. Examples: "startswith(displayName, 'A')" - teams starting w */
  _filter?: string;
  /** Comma-separated list of properties to return. By default returns id, displayName, description. Examp */
  _select?: string;
  /** Include count of total items in the response */
  _count?: boolean;
}

/**
 * List all teams in an organization following Microsoft Graph API v1.0. Supports OData query parameters: $filter, $select,
 */
export async function listTeams(input: ListTeamsInput): Promise<unknown> {
  return callTool("teams", "list_teams", input);
}
