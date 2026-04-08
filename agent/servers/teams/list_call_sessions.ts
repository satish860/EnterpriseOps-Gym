/**
 * Auto-generated wrapper for MCP tool: list_call_sessions
 * Domain: teams (port 8002)
 *
 * Retrieve the list of sessions associated with a callRecord object.
 */
import { callTool } from "../../src/client.js";

export interface ListCallSessionsInput {
  [key: string]: unknown;
  /** The unique identifier of the call record */
  id: string;
  /** Optional OData _select parameter to return specific properties (e.g., 'id,startDateTime,endDateTime, */
  _select?: string;
  /** Optional OData _expand parameter to include segments. Use 'segments' to include all segment properti */
  _expand?: string;
}

/**
 * Retrieve the list of sessions associated with a callRecord object.
 */
export async function listCallSessions(input: ListCallSessionsInput): Promise<unknown> {
  return callTool("teams", "list_call_sessions", input);
}
