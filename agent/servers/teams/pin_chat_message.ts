/**
 * Auto-generated wrapper for MCP tool: pin_chat_message
 * Domain: teams (port 8002)
 *
 * Pin a message in a chat (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface PinChatMessageInput {
  /** Unique chat identifier */
  chatId: string;
  /** The unique identifier of the message to pin */
  messageId: string;
}

/**
 * Pin a message in a chat (Microsoft Graph API compliant).
 */
export async function pinChatMessage(input: PinChatMessageInput): Promise<unknown> {
  return callTool("teams", "pin_chat_message", input);
}
