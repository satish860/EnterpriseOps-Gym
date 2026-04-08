/**
 * Auto-generated wrapper for MCP tool: create_audio_routing_group
 * Domain: teams (port 8002)
 *
 * Create a new audio routing group for a call.
 */
import { callTool } from "../../src/client.js";

export interface CreateAudioRoutingGroupInput {
  [key: string]: unknown;
  /** Parent call ID (required) */
  call_id: string;
  /** Routing mode: oneToOne (immutable) or multicast (updatable receivers) */
  routingMode: "oneToOne" | "multicast";
  /** Source participant IDs (must have exactly 1 participant - the authenticated bot/application making t */
  sources: Array<string>;
  /** Receiver participant IDs. For oneToOne mode: exactly 1 receiver. For multicast mode: 2 or more recei */
  receivers: Array<string>;
}

/**
 * Create a new audio routing group for a call.
 */
export async function createAudioRoutingGroup(input: CreateAudioRoutingGroupInput): Promise<unknown> {
  return callTool("teams", "create_audio_routing_group", input);
}
