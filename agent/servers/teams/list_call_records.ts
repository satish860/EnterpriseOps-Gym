/**
 * Auto-generated wrapper for MCP tool: list_call_records
 * Domain: teams (port 8002)
 *
 * Get the list of callRecord objects and their properties.
 */
import { callTool } from "../../src/client.js";

export interface ListCallRecordsInput {
  [key: string]: unknown;
  /** Filter query parameter. Supported filters: */
  _filter?: string;
  /** Select specific properties to return. */
  _select?: string;
}

/**
 * Get the list of callRecord objects and their properties.
 */
export async function listCallRecords(input: ListCallRecordsInput): Promise<unknown> {
  return callTool("teams", "list_call_records", input);
}
