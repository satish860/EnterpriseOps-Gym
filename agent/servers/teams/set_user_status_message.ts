/**
 * Auto-generated wrapper for MCP tool: set_user_status_message
 * Domain: teams (port 8002)
 *
 * Set a user's status message.
 */
import { callTool } from "../../src/client.js";

export interface SetUserStatusMessageInput {
  /** User identifier - accepts either user ID (UUID) or userPrincipalName (e.g., 'alice_manager') */
  user_id: string;
  /** Status message object containing message details */
  statusMessage: {
    message?: {
      content?: string;
      contentType?: "text"
    };
    expiryDateTime?: {
      dateTime?: string;
      timeZone?: string
    }
  };
}

/**
 * Set a user's status message.
 */
export async function setUserStatusMessage(input: SetUserStatusMessageInput): Promise<unknown> {
  return callTool("teams", "set_user_status_message", input);
}
