/**
 * Auto-generated wrapper for MCP tool: publish_virtual_event_webinar
 * Domain: teams (port 8002)
 *
 * Publish a virtualEventWebinar to make it visible to its audience.
 */
import { callTool } from "../../src/client.js";

export interface PublishVirtualEventWebinarInput {
  [key: string]: unknown;
  /** Unique identifier of the webinar (format: guid@guid). Example: 'a57082a9-7629-4f74-8da0-8d621aab4d2d */
  webinar_id: string;
}

/**
 * Publish a virtualEventWebinar to make it visible to its audience.
 */
export async function publishVirtualEventWebinar(input: PublishVirtualEventWebinarInput): Promise<unknown> {
  return callTool("teams", "publish_virtual_event_webinar", input);
}
