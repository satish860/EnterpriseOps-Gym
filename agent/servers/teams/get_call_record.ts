/**
 * Auto-generated wrapper for MCP tool: get_call_record
 * Domain: teams (port 8002)
 *
 * Retrieve the properties and relationships of a callRecord object.
 */
import { callTool } from "../../src/client.js";

export interface GetCallRecordInput {
  /** The unique identifier of the call record to retrieve */
  id: string;
  /** Select specific properties to return. */
  _select?: string;
  /** Expand relationships to include in the response. */
  _expand?: string;
}

/**
 * Retrieve the properties and relationships of a callRecord object.
 */
export async function getCallRecord(input: GetCallRecordInput): Promise<unknown> {
  return callTool("teams", "get_call_record", input);
}
