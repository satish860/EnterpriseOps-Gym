/**
 * Auto-generated wrapper for MCP tool: update_chat_message
 * Domain: teams (port 8002)
 *
 * Update a chat message (Microsoft Graph API compliant). API Endpoint: PATCH /chats/{chat_id}/messages/{message_id}.
 */
import { callTool } from "../../src/client.js";

export interface UpdateChatMessageInput {
  [key: string]: unknown;
  /** Unique chat identifier */
  chatId: string;
  /** Unique message identifier to update */
  messageId: string;
  /** Updated message body content */
  body?: {
    content?: string;
    contentType?: "text" | "html"
  };
  /** Updated subject of the message */
  subject?: string;
  /** Updated importance level of the message */
  importance?: "normal" | "high" | "urgent";
  /** Updated file attachments */
  attachments?: Array<{
    id?: string;
    contentType?: string;
    contentUrl?: string;
    content?: string;
    name?: string;
    thumbnailUrl?: string
  }>;
  /** Updated user mentions in the message */
  mentions?: Array<{
    id?: number;
    mentionText?: string;
    mentioned?: {
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: string
      }
    }
  }>;
  /** Updated message reactions */
  reactions?: Array<{
    reactionType?: string;
    createdDateTime?: string;
    user?: {
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: string
      }
    }
  }>;
  /** Updated message edit history */
  messageHistory?: Array<{
    modifiedDateTime?: string;
    actions?: string;
    reaction?: Record<string, unknown>
  }>;
  /** ONLY application permissions (Chat.UpdatePolicyViolation.All) can update this property. Defines the  */
  policyViolation?: {
    dlpAction?: "none" | "notifySender" | "blockAccess" | "blockAccessExternal";
    justificationText?: string;
    policyTip?: {
      generalText?: string;
      complianceUrl?: string;
      matchedConditionDescriptions?: Array<string>
    };
    userAction?: "none" | "override" | "reportFalsePositive";
    verdictDetails?: "none" | "allowFalsePositiveOverride" | "allowOverrideWithoutJustification" | "allowOverrideWithJustification"
  };
}

/**
 * Update a chat message (Microsoft Graph API compliant). API Endpoint: PATCH /chats/{chat_id}/messages/{message_id}.
 */
export async function updateChatMessage(input: UpdateChatMessageInput): Promise<unknown> {
  return callTool("teams", "update_chat_message", input);
}
