/**
 * Auto-generated wrapper for MCP tool: provision_channel_email
 * Domain: teams (port 8002)
 *
 * Provision an email address for a channel (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface ProvisionChannelEmailInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier for which to provision email */
  channelId: string;
}

/**
 * Provision an email address for a channel (Microsoft Graph API compliant).
 */
export async function provisionChannelEmail(input: ProvisionChannelEmailInput): Promise<unknown> {
  return callTool("teams", "provision_channel_email", input);
}
