/**
 * Auto-generated wrapper for MCP tool: create_call
 * Domain: teams (port 8002)
 *
 * Create a new outgoing peer-to-peer or group call, or join an existing meeting.
 */
import { callTool } from "../../src/client.js";

export interface CreateCallInput {
  [key: string]: unknown;
  /** HTTPS callback URL for notifications (required) */
  callbackUri: string;
  /** Source participant info (optional, for PSTN calls with applicationInstance) */
  source?: {
    identity?: {
      applicationInstance?: {
        id?: string;
        displayName?: string
      }
    }
  };
  /** Target participants for peer-to-peer or group calls (max 5). Do not use with meetingInfo. */
  targets?: Array<{
    identity?: {
      user?: {
        id?: string;
        displayName?: string
      };
      phone?: {
        id?: string
      }
    }
  }>;
  /** Requested modalities (required) */
  requestedModalities: Array<"audio" | "video" | "videoBasedScreenSharing" | "data">;
  /** Call options */
  callOptions?: {
    isContentSharingNotificationEnabled?: boolean;
    isDeltaRosterEnabled?: boolean;
    isInteractiveRosterEnabled?: boolean
  };
  /** Media configuration (required). Must include _odata_type */
  mediaConfig: {
    _odata_type?: "#microsoft.graph.serviceHostedMediaConfig" | "#microsoft.graph.appHostedMediaConfig";
    preFetchMedia?: Array<{
      uri?: string;
      resourceId?: string
    }>;
    blob?: string;
    removeFromDefaultAudioGroup?: boolean
  };
  /** Chat information for joining meetings (use with meetingInfo) */
  chatInfo?: {
    threadId?: string;
    messageId?: string
  };
  /** Meeting information for joining meetings. Do not use with targets. */
  meetingInfo?: {
    _odata_type?: "#microsoft.graph.organizerMeetingInfo" | "#microsoft.graph.joinMeetingIdMeetingInfo" | "#microsoft.graph.tokenMeetingInfo";
    organizer?: {
      user?: {
        id?: string;
        displayName?: string;
        tenantId?: string
      }
    };
    allowConversationWithoutHost?: boolean;
    joinMeetingId?: string;
    passcode?: string
  };
  /** Call subject */
  subject?: string;
  /** Tenant ID */
  tenantId?: string;
}

/**
 * Create a new outgoing peer-to-peer or group call, or join an existing meeting.
 */
export async function createCall(input: CreateCallInput): Promise<unknown> {
  return callTool("teams", "create_call", input);
}
