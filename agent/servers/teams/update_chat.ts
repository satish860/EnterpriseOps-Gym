/**
 * Auto-generated wrapper for MCP tool: update_chat
 * Domain: teams (port 8002)
 *
 * Update a chat's properties (currently only topic is supported). Only group chats can be updated.
 */
import { callTool } from "../../src/client.js";

export interface UpdateChatInput {
  /** Unique chat identifier */
  chatId: string;
  /** Chat topic/title to update */
  topic: string;
}

/**
 * Update a chat's properties (currently only topic is supported). Only group chats can be updated.
 */
export async function updateChat(input: UpdateChatInput): Promise<unknown> {
  return callTool("teams", "update_chat", input);
}
