/**
 * Auto-generated wrapper for MCP tool: list_chats
 * Domain: teams (port 8002)
 *
 * List chats for the authenticated user (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ListChatsInput {
  [key: string]: unknown;
  /** Expand related entities. Currently supports 'members' and 'lastMessagePreview' properties. Example:  */
  _expand?: string;
  /** Controls the number of items per response. Maximum allowed $top value is 50 per Microsoft Graph API  */
  _top?: number;
  /** Filters results. OData filter expression for filtering chat results. */
  _filter?: string;
  /** Sort order. Currently supports 'lastMessagePreview/createdDateTime desc' only. Ascending order is NO */
  _orderby?: string;
}

/**
 * List chats for the authenticated user (Microsoft Graph API compliant).
 */
export async function listChats(input: ListChatsInput): Promise<unknown> {
  return callTool("teams", "list_chats", input);
}
