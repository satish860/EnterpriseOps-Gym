/**
 * Auto-generated wrapper for MCP tool: send_channel_message
 * Domain: teams (port 8002)
 *
 * Send a new chatMessage in the specified channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface SendChannelMessageInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
  /** The message body content (MANDATORY property - only required field per Microsoft Graph API) */
  body: {
    contentType?: "text" | "html";
    content?: string
  };
  /** Optional subject line for the message */
  subject?: string;
  /** Optional message attachments */
  attachments?: Array<{
    id?: string;
    contentType?: string;
    contentUrl?: string;
    content?: string;
    name?: string;
    thumbnailUrl?: string
  }>;
  /** Users mentioned in the message */
  mentions?: Array<{
    id?: number;
    mentionText?: string;
    mentioned?: {
      user?: {
        id?: string;
        displayName?: string;
        userIdentityType?: "aadUser"
      }
    }
  }>;
  /** Message importance level */
  importance?: "normal" | "high" | "urgent";
}

/**
 * Send a new chatMessage in the specified channel (Microsoft Graph API compliant).
 */
export async function sendChannelMessage(input: SendChannelMessageInput): Promise<unknown> {
  return callTool("teams", "send_channel_message", input);
}
