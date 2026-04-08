/**
 * Auto-generated wrapper for MCP tool: list_groups
 * Domain: teams (port 8002)
 *
 * List groups in the organization. Per Microsoft Graph API documentation: Supports _count, _expand, _filter, _orderby, _se
 */
import { callTool } from "../../src/client.js";

export interface ListGroupsInput {
  /** OPTIONAL. Number of items per response (max 999, default 100) */
  _top?: number;
  /** OPTIONAL. OData filter expression. Examples: "displayName eq 'Marketing'", "securityEnabled eq true" */
  _filter?: string;
  /** OPTIONAL. Comma-separated list of properties to return. Schema extensions are returned only with _se */
  _select?: string;
  /** OPTIONAL. Order results by properties. Examples: 'displayName asc', 'createdDateTime desc' */
  _orderby?: string;
  /** OPTIONAL. Search query. Supports tokenization only on displayName and description fields. Other fiel */
  _search?: string;
  /** OPTIONAL. Include count of total matching results in response */
  _count?: boolean;
  /** OPTIONAL. Expand related entities. Open extensions are returned only with _expand. Example: 'members */
  _expand?: string;
}

/**
 * List groups in the organization. Per Microsoft Graph API documentation: Supports _count, _expand, _filter, _orderby, _se
 */
export async function listGroups(input: ListGroupsInput): Promise<unknown> {
  return callTool("teams", "list_groups", input);
}
