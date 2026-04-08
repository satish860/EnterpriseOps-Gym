/**
 * Auto-generated wrapper for MCP tool: update_channel_message
 * Domain: teams (port 8002)
 *
 * Update a chatMessage in a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface UpdateChannelMessageInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** Unique message identifier to update */
  messageId: string;
  /** Optional reply identifier to update a specific reply to a message */
  replyId?: string;
  /** Payment model for licensing (evaluation mode used if not specified). Only supports value 'A' */
  model?: "A";
  /** The type of chat message */
  messageType?: "message";
  /** The subject line of the chat message (can be null) */
  subject?: string;
  /** Summary text of the chat message that could be used for push notifications and summary views (can be */
  summary?: string;
  /** The importance of the chat message */
  importance?: "normal" | "high" | "urgent";
  /** Locale of the chat message set by the client (e.g., 'en-us') */
  locale?: string;
  /** Details of the sender of the chat message (read-only during updates) */
  from?: {
    application?: Record<string, unknown>;
    device?: Record<string, unknown>;
    user?: {
      id?: string;
      displayName?: string;
      userIdentityType?: "aadUser"
    };
    conversation?: Record<string, unknown>
  };
  /** Updated message body content (OPTIONAL - only provide if updating message body. If provided, content */
  body?: {
    contentType?: "text" | "html";
    content?: string
  };
  /** References to attached objects like files, tabs, meetings etc. */
  attachments?: Array<{
    id?: string;
    contentType?: string;
    contentUrl?: string;
    content?: string;
    name?: string;
    thumbnailUrl?: string
  }>;
  /** List of entities mentioned in the chat message */
  mentions?: Array<{
    id?: number;
    mentionText?: string;
    mentioned?: {
      application?: Record<string, unknown>;
      device?: Record<string, unknown>;
      conversation?: Record<string, unknown>;
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: "aadUser"
      }
    }
  }>;
  /** Reactions for this chat message (for example, Like) */
  reactions?: Array<{
    reactionType?: string;
    createdDateTime?: string;
    user?: {
      application?: Record<string, unknown>;
      device?: Record<string, unknown>;
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: "aadUser"
      }
    }
  }>;
  /** List of activity history of a message item */
  messageHistory?: Array<{
    modifiedDateTime?: string;
    actions?: string;
    reaction?: Record<string, unknown>
  }>;
  /** Defines the properties of a policy violation set by a data loss prevention (DLP) application. FOR AP */
  policyViolation?: {
    policyTip?: {
      generalText?: string;
      complianceUrl?: string;
      matchedConditionDescriptions?: Array<string>
    };
    verdictDetails?: string;
    dlpAction?: string
  };
}

/**
 * Update a chatMessage in a channel (Microsoft Graph API compliant).
 */
export async function updateChannelMessage(input: UpdateChannelMessageInput): Promise<unknown> {
  return callTool("teams", "update_channel_message", input);
}
