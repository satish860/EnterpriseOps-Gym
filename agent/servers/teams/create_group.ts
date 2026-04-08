/**
 * Auto-generated wrapper for MCP tool: create_group
 * Domain: teams (port 8002)
 *
 * Create a new group following MS Graph API v1.0. Creates a Microsoft Entra group which can be a Microsoft 365 group, a se
 */
import { callTool } from "../../src/client.js";

export interface CreateGroupInput {
  /** REQUIRED. The name to display in the address book for the group. Maximum length: 256 characters. Req */
  displayName: string;
  /** REQUIRED. Set to true for mail-enabled groups. Required. */
  mailEnabled: boolean;
  /** REQUIRED. The mail alias for the group, unique for Microsoft 365 groups in the organization. Maximum */
  mailNickname: string;
  /** REQUIRED. Set to true for security-enabled groups, including Microsoft 365 groups. Required. Note: G */
  securityEnabled: boolean;
  /** OPTIONAL. An optional description for the group. */
  description?: string;
  /** OPTIONAL. Specifies the group type and its membership. If the collection contains 'Unified', the gro */
  groupTypes?: Array<string>;
  /** OPTIONAL. Specifies the group join policy and group content visibility for groups. Possible values a */
  visibility?: string;
  /** OPTIONAL. Describes a classification for the group (such as low, medium or high business impact). Va */
  classification?: string;
  /** OPTIONAL. The list of sensitivity label pairs (label ID, label name) associated with a Microsoft 365 */
  assignedLabels?: Array<Record<string, unknown>>;
  /** OPTIONAL. The rule that determines members for this group if the group is a dynamic group (groupType */
  membershipRule?: string;
  /** OPTIONAL. Indicates whether the dynamic membership processing is on or paused. Possible values are O */
  membershipRuleProcessingState?: string;
  /** OPTIONAL. Indicates whether this group can be assigned to a Microsoft Entra role. Optional. This pro */
  isAssignableToRole?: boolean;
  /** OPTIONAL. Indicates whether the group is a member of a restricted management administrative unit, in */
  isManagementRestricted?: boolean;
  /** OPTIONAL. The preferred data location for the Microsoft 365 group. By default, the group inherits th */
  preferredDataLocation?: string;
  /** OPTIONAL. The preferred language for a Microsoft 365 group. Should follow ISO 639-1 Code; for exampl */
  preferredLanguage?: string;
  /** OPTIONAL. Specifies the group behaviors that can be set for a Microsoft 365 group during creation. T */
  resourceBehaviorOptions?: Array<string>;
  /** OPTIONAL. Specifies the group resources that are associated with the Microsoft 365 group. The possib */
  resourceProvisioningOptions?: Array<string>;
  /** OPTIONAL. Specifies a Microsoft 365 group's color theme. Possible values are Teal, Purple, Green, Bl */
  theme?: string;
  /** OPTIONAL. List of owner references in OData format. Format: ['https://graph.microsoft.com/v1.0/users */
  owners_odata_bind?: Array<string>;
  /** OPTIONAL. List of member references in OData format. Format: ['https://graph.microsoft.com/v1.0/user */
  members_odata_bind?: Array<string>;
}

/**
 * Create a new group following MS Graph API v1.0. Creates a Microsoft Entra group which can be a Microsoft 365 group, a se
 */
export async function createGroup(input: CreateGroupInput): Promise<unknown> {
  return callTool("teams", "create_group", input);
}
