/**
 * Auto-generated wrapper for MCP tool: list_team_members
 * Domain: teams (port 8002)
 *
 * List members of a team following Microsoft Graph API v1.0. This method supports the _filter, _select, and _top OData que
 */
import { callTool } from "../../src/client.js";

export interface ListTeamMembersInput {
  [key: string]: unknown;
  /** REQUIRED. Unique team identifier */
  teamId: string;
  /** OPTIONAL. OData filter expression to filter team members. Examples: "(microsoft.graph.aadUserConvers */
  _filter?: string;
  /** OPTIONAL. Comma-separated list of properties to return. Examples: 'id,roles,displayName,userId,email */
  _select?: string;
  /** OPTIONAL. Number of items per response (default 50, max 999) */
  _top?: number;
}

/**
 * List members of a team following Microsoft Graph API v1.0. This method supports the _filter, _select, and _top OData que
 */
export async function listTeamMembers(input: ListTeamMembersInput): Promise<unknown> {
  return callTool("teams", "list_team_members", input);
}
