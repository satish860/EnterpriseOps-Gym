/**
 * Auto-generated wrapper for MCP tool: create_virtual_event_townhall
 * Domain: teams (port 8002)
 *
 * Create a new virtualEventTownhall object in draft mode.
 */
import { callTool } from "../../src/client.js";

export interface CreateVirtualEventTownhallInput {
  [key: string]: unknown;
  /** The display name of the townhall (required, 1-500 characters) */
  displayName: string;
  /** Description of the townhall (required) */
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
  /** Audience visibility (required). 'organization' = internal only, 'everyone' = public access. Note: is */
  audience: "everyone" | "organization" | "unknownFutureValue";
  /** Whether townhall is invite-only (optional, default: false). CRITICAL: Can ONLY be true if audience=' */
  isInviteOnly?: boolean;
  /** Invited attendees for the townhall (optional). Provide user IDs for existing users (details auto-pop */
  invitedAttendees?: Array<{
    id?: string
  }>;
  /** Coorganizers of the townhall (optional). Provide only user IDs - displayName and tenantId are automa */
  coOrganizers?: Array<{
    id?: string
  }>;
  /** Townhall settings (optional) */
  settings?: {
    isAttendeeEmailNotificationEnabled?: boolean
  };
}

/**
 * Create a new virtualEventTownhall object in draft mode.
 */
export async function createVirtualEventTownhall(input: CreateVirtualEventTownhallInput): Promise<unknown> {
  return callTool("teams", "create_virtual_event_townhall", input);
}
