/**
 * Auto-generated wrapper for MCP tool: get_virtual_event_webinar
 * Domain: teams (port 8002)
 *
 * Get a virtualEventWebinar object by ID.
 */
import { callTool } from "../../src/client.js";

export interface GetVirtualEventWebinarInput {
  [key: string]: unknown;
  /** The unique identifier of the webinar (required, format: guid@guid). Example: '88b245ac-b0b2-f1aa-e34 */
  webinar_id: string;
}

/**
 * Get a virtualEventWebinar object by ID.
 */
export async function getVirtualEventWebinar(input: GetVirtualEventWebinarInput): Promise<unknown> {
  return callTool("teams", "get_virtual_event_webinar", input);
}
