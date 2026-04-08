/**
 * Auto-generated wrapper for MCP tool: send_chat_message
 * Domain: teams (port 8002)
 *
 * Send a new message in a chat (Microsoft Graph API compliant). API Endpoint: POST /chats/{chat_id}/messages.
 */
import { callTool } from "../../src/client.js";

export interface SendChatMessageInput {
  /** Unique chat identifier */
  chatId: string;
  /** Message body content (required). Plaintext/HTML representation of the content of the chat message. R */
  body: {
    content?: string;
    contentType?: "text" | "html"
  };
  /** Read-only. ID of the parent chat message or root chat message of the thread. (Only applies to chat m */
  replyToId?: string;
  /** Subject of the message, in plaintext (optional) */
  subject?: string;
  /** Summary text of the chat message that could be used for push notifications and summary views or fall */
  summary?: string;
  /** The importance of the chat message. The possible values are: normal, high, urgent. */
  importance?: "normal" | "high" | "urgent";
  /** Locale of the chat message set by the client. Always set to en-us. */
  locale?: string;
  /** References to attached objects like files, tabs, meetings etc. */
  attachments?: Array<{
    id?: string;
    contentType?: string;
    contentUrl?: string;
    content?: string;
    name?: string;
    thumbnailUrl?: string;
    teamsAppId?: string
  }>;
  /** List of entities mentioned in the chat message. Supported entities are: user, bot, team, channel, ch */
  mentions?: Array<{
    id?: number;
    mentionText?: string;
    mentioned?: {
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: "aadUser" | "onPremiseAadUser" | "anonymousGuest" | "federatedUser"
      };
      application?: {
        id?: string;
        displayName?: string;
        applicationIdentityType?: string
      };
      conversation?: {
        id?: string;
        displayName?: string;
        conversationIdentityType?: string
      }
    }
  }>;
  /** If the message was sent in a channel, represents identity of the channel. This property is null for  */
  channelIdentity?: {
    teamId?: string;
    channelId?: string
  };
  /** Defines the properties of a policy violation set by a data loss prevention (DLP) application. */
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
  /** The type of chat message. The possible values are: message, chatEvent, typing, unknownFutureValue, s */
  messageType?: "message" | "chatEvent" | "typing" | "unknownFutureValue" | "systemEventMessage";
}

/**
 * Send a new message in a chat (Microsoft Graph API compliant). API Endpoint: POST /chats/{chat_id}/messages.
 */
export async function sendChatMessage(input: SendChatMessageInput): Promise<unknown> {
  return callTool("teams", "send_chat_message", input);
}
