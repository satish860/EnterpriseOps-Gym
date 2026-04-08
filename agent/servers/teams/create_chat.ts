/**
 * Auto-generated wrapper for MCP tool: create_chat
 * Domain: teams (port 8002)
 *
 * Create a new chat (one-on-one or group) following Microsoft Graph API v1.0 specification.
 */
import { callTool } from "../../src/client.js";

export interface CreateChatInput {
  [key: string]: unknown;
  /** Type of chat to create: 'oneOnOne' or 'group' */
  chatType: "oneOnOne" | "group";
  /** Chat topic/title. Optional for oneOnOne (must be null), required for group chats. Maximum 255 charac */
  topic?: string;
  /** List of conversation members. Each member must include _odata_type, roles, and user_odata_bind. Mini */
  members: Array<{
    _odata_type?: string;
    roles?: Array<"owner" | "guest">;
    user_odata_bind?: string;
    tenantId?: string
  }>;
  /** Apps to install in the chat during creation (optional) */
  installedApps?: Array<{
    teamsApp_odata_bind?: string;
    consentedPermissionSet?: {
      resourceSpecificPermissions?: Array<{
        permissionValue?: string;
        permissionType?: "application" | "delegated"
      }>
    }
  }>;
}

/**
 * Create a new chat (one-on-one or group) following Microsoft Graph API v1.0 specification.
 */
export async function createChat(input: CreateChatInput): Promise<unknown> {
  return callTool("teams", "create_chat", input);
}
