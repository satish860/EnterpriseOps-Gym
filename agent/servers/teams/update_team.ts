/**
 * Auto-generated wrapper for MCP tool: update_team
 * Domain: teams (port 8002)
 *
 * Update team properties. API Endpoint: PATCH /teams/{team-id}
 */
import { callTool } from "../../src/client.js";

export interface UpdateTeamInput {
  [key: string]: unknown;
  /** Unique team identifier */
  teamId: string;
  /** Updated team display name */
  displayName?: string;
  /** Updated team description */
  description?: string;
  /** Updated team visibility */
  visibility?: "private" | "public" | "hiddenMembership";
  /** Updated team specialization */
  specialization?: "none" | "educationStandard" | "educationClass" | "educationProfessionalLearningCommunity" | "educationSpecialInterest" | "healthcareStandard" | "healthcareCareCoordination" | "unknownFutureValue";
  /** Updated member settings for the team */
  memberSettings?: {
    allowCreateUpdateChannels?: boolean;
    allowCreatePrivateChannels?: boolean;
    allowDeleteChannels?: boolean;
    allowAddRemoveApps?: boolean;
    allowCreateUpdateRemoveTabs?: boolean;
    allowCreateUpdateRemoveConnectors?: boolean
  };
  /** Updated guest settings for the team */
  guestSettings?: {
    allowCreateUpdateChannels?: boolean;
    allowDeleteChannels?: boolean
  };
  /** Updated messaging settings for the team */
  messagingSettings?: {
    allowUserEditMessages?: boolean;
    allowUserDeleteMessages?: boolean;
    allowOwnerDeleteMessages?: boolean;
    allowTeamMentions?: boolean;
    allowChannelMentions?: boolean
  };
  /** Updated fun settings for the team */
  funSettings?: {
    allowGiphy?: boolean;
    giphyContentRating?: "strict" | "moderate";
    allowStickersAndMemes?: boolean;
    allowCustomMemes?: boolean
  };
  /** Updated discovery settings for the team */
  discoverySettings?: {
    showInTeamsSearchAndSuggestions?: boolean
  };
}

/**
 * Update team properties. API Endpoint: PATCH /teams/{team-id}
 */
export async function updateTeam(input: UpdateTeamInput): Promise<unknown> {
  return callTool("teams", "update_team", input);
}
