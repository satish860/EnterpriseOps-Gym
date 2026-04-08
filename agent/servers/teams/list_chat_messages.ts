/**
 * Auto-generated wrapper for MCP tool: list_chat_messages
 * Domain: teams (port 8002)
 *
 * List messages in a chat (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ListChatMessagesInput {
  [key: string]: unknown;
  /** Unique chat identifier */
  chatId: string;
  /** User identifier (user ID or user principal name). REQUIRED for application permissions to specify wh */
  userId?: string;
  /** Controls the number of items per response. Maximum allowed value is 50 per Microsoft Graph API speci */
  _top?: number;
  /** Sort order. ONLY supports 'lastModifiedDateTime desc' (default) or 'createdDateTime desc'. Ascending */
  _orderby?: "lastModifiedDateTime desc" | "createdDateTime desc";
  /** Date range filter. MUST match the property in _orderby parameter. Format: 'lastModifiedDateTime gt { */
  _filter?: string;
}

/**
 * List messages in a chat (Microsoft Graph API compliant).
 */
export async function listChatMessages(input: ListChatMessagesInput): Promise<unknown> {
  return callTool("teams", "list_chat_messages", input);
}
