/**
 * Auto-generated wrapper for MCP tool: list_users
 * Domain: teams (port 8002)
 *
 * List users in the organization.
 */
import { callTool } from "../../src/client.js";

export interface ListUsersInput {
  [key: string]: unknown;
  /** Number of items to return (1-999) */
  _top?: number;
  /** Number of items to skip for pagination */
  _skip?: number;
  /** OData filter expression. Supports: eq, ne, gt, lt, ge, le operators; startswith(), endswith(), conta */
  _filter?: string;
  /** OData orderby expression (e.g., "displayName asc" or "createdDateTime desc") */
  _orderby?: string;
  /** Comma-separated list of properties to return (e.g., "displayName,mail,jobTitle") */
  _select?: string;
  /** Include total count in response */
  _count?: boolean;
}

/**
 * List users in the organization.
 */
export async function listUsers(input: ListUsersInput): Promise<unknown> {
  return callTool("teams", "list_users", input);
}
