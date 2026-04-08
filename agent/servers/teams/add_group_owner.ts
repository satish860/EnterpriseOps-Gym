/**
 * Auto-generated wrapper for MCP tool: add_group_owner
 * Domain: teams (port 8002)
 *
 * Add an owner to a group. Returns 204 No Content on success. API Endpoint: POST /groups/{id}/owners/$ref
 */
import { callTool } from "../../src/client.js";

export interface AddGroupOwnerInput {
  /** REQUIRED. Unique group identifier */
  groupId: string;
  /** REQUIRED. OData reference to the owner user (e.g., 'https://graph.microsoft.com/v1.0/users/{user-id} */
  _odata_id: string;
}

/**
 * Add an owner to a group. Returns 204 No Content on success. API Endpoint: POST /groups/{id}/owners/$ref
 */
export async function addGroupOwner(input: AddGroupOwnerInput): Promise<unknown> {
  return callTool("teams", "add_group_owner", input);
}
