/**
 * Auto-generated wrapper for MCP tool: create_team
 * Domain: teams (port 8002)
 *
 * Create a new team following MS Graph API v1.0. Two creation methods: 1) Create team with new group (requires template_od
 */
import { callTool } from "../../src/client.js";

export interface CreateTeamInput {
  /** REQUIRED. Template reference (e.g., 'https://graph.microsoft.com/v1.0/teamsTemplates('standard')' or */
  template_odata_bind: string;
  /** OPTIONAL. Group reference for creating team from existing group (e.g., 'https://graph.microsoft.com/ */
  group_odata_bind?: string;
  /** REQUIRED for Application permissions, OPTIONAL for Delegated permissions. Members to add to the team */
  members?: Array<{
    _odata_type?: string;
    roles?: Array<"owner" | "member" | "guest">;
    user_odata_bind?: string;
    visibleHistoryStartDateTime?: string
  }>;
  /** REQUIRED when creating new group (no group_odata_bind). Team display name. */
  displayName?: string;
  /** Team description (optional) */
  description?: string;
  /** OPTIONAL. An optional label. Typically describes the data or business sensitivity of the team. Must  */
  classification?: string;
  /** OPTIONAL. Tenant identifier. If not provided, will be auto-fetched from the organization. If provide */
  tenantId?: string;
  /** Team visibility */
  visibility?: "private" | "public" | "hiddenMembership";
  /** Team specialization */
  specialization?: "none" | "educationStandard" | "educationClass" | "educationProfessionalLearningCommunity" | "educationSpecialInterest" | "healthcareStandard" | "healthcareCareCoordination" | "unknownFutureValue";
  /** OPTIONAL. Timestamp at which the team was created. Used only in migration mode (ISO 8601 format, e.g */
  createdDateTime?: string;
  /** OPTIONAL. Indicates that the team is in migration state and is currently being used for migration pu */
  _microsoft_graph_teamCreationMode?: "migration";
  /** OPTIONAL. Configure settings of a class. Available only when the team represents a class (specializa */
  classSettings?: {
    notifyGuardiansAboutAssignments?: boolean
  };
  /** Name for the first channel of the team */
  firstChannelName?: string;
  /** Channels to create with the team */
  channels?: Array<{
    displayName?: string;
    description?: string;
    isFavoriteByDefault?: boolean;
    tabs?: Array<{
      teamsApp_odata_bind?: string;
      displayName?: string;
      configuration?: {
        contentUrl?: string;
        websiteUrl?: string
      }
    }>
  }>;
  /** Apps to install in the team */
  installedApps?: Array<{
    teamsApp_odata_bind?: string
  }>;
  /** Member settings for the team */
  memberSettings?: {
    allowCreateUpdateChannels?: boolean;
    allowCreatePrivateChannels?: boolean;
    allowDeleteChannels?: boolean;
    allowAddRemoveApps?: boolean;
    allowCreateUpdateRemoveTabs?: boolean;
    allowCreateUpdateRemoveConnectors?: boolean
  };
  /** Guest settings for the team */
  guestSettings?: {
    allowCreateUpdateChannels?: boolean;
    allowDeleteChannels?: boolean
  };
  /** Messaging settings for the team */
  messagingSettings?: {
    allowUserEditMessages?: boolean;
    allowUserDeleteMessages?: boolean;
    allowOwnerDeleteMessages?: boolean;
    allowTeamMentions?: boolean;
    allowChannelMentions?: boolean
  };
  /** Fun settings for the team */
  funSettings?: {
    allowGiphy?: boolean;
    giphyContentRating?: "strict" | "moderate";
    allowStickersAndMemes?: boolean;
    allowCustomMemes?: boolean
  };
  /** Discovery settings for the team */
  discoverySettings?: {
    showInTeamsSearchAndSuggestions?: boolean
  };
}

/**
 * Create a new team following MS Graph API v1.0. Two creation methods: 1) Create team with new group (requires template_od
 */
export async function createTeam(input: CreateTeamInput): Promise<unknown> {
  return callTool("teams", "create_team", input);
}
