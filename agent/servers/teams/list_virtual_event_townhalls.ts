/**
 * Auto-generated wrapper for MCP tool: list_virtual_event_townhalls
 * Domain: teams (port 8002)
 *
 * Get the list of all virtualEventTownhall objects created in a tenant.
 */
import { callTool } from "../../src/client.js";

export interface ListVirtualEventTownhallsInput {
  /** Include total count in response (@odata.count). Maps to $count query parameter. Set to true to inclu */
  _count?: boolean;
}

/**
 * Get the list of all virtualEventTownhall objects created in a tenant.
 */
export async function listVirtualEventTownhalls(input: ListVirtualEventTownhallsInput): Promise<unknown> {
  return callTool("teams", "list_virtual_event_townhalls", input);
}
