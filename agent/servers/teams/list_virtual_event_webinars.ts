/**
 * Auto-generated wrapper for MCP tool: list_virtual_event_webinars
 * Domain: teams (port 8002)
 *
 * Get the list of all virtualEventWebinar objects created in a tenant.
 */
import { callTool } from "../../src/client.js";

export interface ListVirtualEventWebinarsInput {
  [key: string]: unknown;
  /** Include total count in response (@odata.count). Maps to $count query parameter. Set to true to inclu */
  _count?: boolean;
}

/**
 * Get the list of all virtualEventWebinar objects created in a tenant.
 */
export async function listVirtualEventWebinars(input: ListVirtualEventWebinarsInput): Promise<unknown> {
  return callTool("teams", "list_virtual_event_webinars", input);
}
