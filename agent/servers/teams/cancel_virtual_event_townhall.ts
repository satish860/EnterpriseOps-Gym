/**
 * Auto-generated wrapper for MCP tool: cancel_virtual_event_townhall
 * Domain: teams (port 8002)
 *
 * Cancel a virtualEventTownhall. A canceled town hall has its status set to canceled permanently.
 */
import { callTool } from "../../src/client.js";

export interface CancelVirtualEventTownhallInput {
  [key: string]: unknown;
  /** Unique identifier of the townhall (format: guid@guid). Example: 'bce9a3ca-a310-48fa-baf3-1cedcd04bb3 */
  townhall_id: string;
}

/**
 * Cancel a virtualEventTownhall. A canceled town hall has its status set to canceled permanently.
 */
export async function cancelVirtualEventTownhall(input: CancelVirtualEventTownhallInput): Promise<unknown> {
  return callTool("teams", "cancel_virtual_event_townhall", input);
}
