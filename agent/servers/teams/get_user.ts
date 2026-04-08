/**
 * Auto-generated wrapper for MCP tool: get_user
 * Domain: teams (port 8002)
 *
 * Retrieve a specific user by their ID or userPrincipalName.
 */
import { callTool } from "../../src/client.js";

export interface GetUserInput {
  [key: string]: unknown;
  /** User identifier (UUID format). Either 'userId' or 'userPrincipalName' must be provided. */
  userId?: string;
  /** User principal name in email format (e.g., 'alice.manager@techcorp.com'). Either 'userId' or 'userPr */
  userPrincipalName?: string;
  /** Comma-separated list of properties to return (e.g., "displayName,mail,jobTitle") */
  _select?: string;
}

/**
 * Retrieve a specific user by their ID or userPrincipalName.
 */
export async function getUser(input: GetUserInput): Promise<unknown> {
  return callTool("teams", "get_user", input);
}
