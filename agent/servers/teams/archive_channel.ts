/**
 * Auto-generated wrapper for MCP tool: archive_channel
 * Domain: teams (port 8002)
 *
 * Archive a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ArchiveChannelInput {
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier to archive */
  channelId: string;
}

/**
 * Archive a channel (Microsoft Graph API compliant).
 */
export async function archiveChannel(input: ArchiveChannelInput): Promise<unknown> {
  return callTool("teams", "archive_channel", input);
}
