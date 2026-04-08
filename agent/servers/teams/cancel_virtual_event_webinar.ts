/**
 * Auto-generated wrapper for MCP tool: cancel_virtual_event_webinar
 * Domain: teams (port 8002)
 *
 * Cancel a virtualEventWebinar. A canceled webinar has its status set to canceled permanently.
 */
import { callTool } from "../../src/client.js";

export interface CancelVirtualEventWebinarInput {
  [key: string]: unknown;
  /** Unique identifier of the webinar (format: guid@guid). Example: 'a57082a9-7629-4f74-8da0-8d621aab4d2d */
  webinar_id: string;
}

/**
 * Cancel a virtualEventWebinar. A canceled webinar has its status set to canceled permanently.
 */
export async function cancelVirtualEventWebinar(input: CancelVirtualEventWebinarInput): Promise<unknown> {
  return callTool("teams", "cancel_virtual_event_webinar", input);
}
