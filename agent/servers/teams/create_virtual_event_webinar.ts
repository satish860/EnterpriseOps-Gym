/**
 * Auto-generated wrapper for MCP tool: create_virtual_event_webinar
 * Domain: teams (port 8002)
 *
 * Create a new virtualEventWebinar object in draft mode.
 */
import { callTool } from "../../src/client.js";

export interface CreateVirtualEventWebinarInput {
  /** The display name of the webinar (required, 1-500 characters) */
  displayName: string;
  /** Description of the webinar (required) */
  description: {
    contentType?: "text" | "html";
    content?: string
  };
  /** Start date and time (required) */
  startDateTime: {
    dateTime?: string;
    timeZone?: string
  };
  /** End date and time (required, must be after startDateTime) */
  endDateTime: {
    dateTime?: string;
    timeZone?: string
  };
  /** Audience visibility (required). Use 'organization' for internal webinars, 'everyone' for public. */
  audience: "everyone" | "organization" | "unknownFutureValue";
  /** Coorganizers of the webinar (optional). Each coorganizer must exist in the system. Only user ID is r */
  coOrganizers?: Array<{
    id?: string
  }>;
  /** Webinar settings (optional) */
  settings?: {
    isAttendeeEmailNotificationEnabled?: boolean
  };
}

/**
 * Create a new virtualEventWebinar object in draft mode.
 */
export async function createVirtualEventWebinar(input: CreateVirtualEventWebinarInput): Promise<unknown> {
  return callTool("teams", "create_virtual_event_webinar", input);
}
