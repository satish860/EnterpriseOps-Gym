/**
 * Auto-generated wrapper for MCP tool: delete_user
 * Domain: teams (port 8002)
 *
 * Delete a user by ID or userPrincipalName.
 */
import { callTool } from "../../src/client.js";

export interface DeleteUserInput {
  [key: string]: unknown;
  /** User identifier (UUID format). Either 'userId' or 'userPrincipalName' must be provided. */
  userId?: string;
  /** User principal name in email format (e.g., 'alice.manager@techcorp.com'). Either 'userId' or 'userPr */
  userPrincipalName?: string;
}

/**
 * Delete a user by ID or userPrincipalName.
 */
export async function deleteUser(input: DeleteUserInput): Promise<unknown> {
  return callTool("teams", "delete_user", input);
}
