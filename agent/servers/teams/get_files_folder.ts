/**
 * Auto-generated wrapper for MCP tool: get_files_folder
 * Domain: teams (port 8002)
 *
 * Get the metadata for the location where the files of a channel are stored (Microsoft Graph API compliant).
 */
import { callTool } from "../../src/client.js";

export interface GetFilesFolderInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Unique channel identifier */
  channelId: string;
}

/**
 * Get the metadata for the location where the files of a channel are stored (Microsoft Graph API compliant).
 */
export async function getFilesFolder(input: GetFilesFolderInput): Promise<unknown> {
  return callTool("teams", "get_files_folder", input);
}
