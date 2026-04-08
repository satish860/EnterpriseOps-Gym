/**
 * Auto-generated wrapper for MCP tool: update_group
 * Domain: teams (port 8002)
 *
 * Update group properties. Only updates the properties provided in the request. API Endpoint: PATCH /groups/{id}
 */
import { callTool } from "../../src/client.js";

export interface UpdateGroupInput {
  [key: string]: unknown;
  /** REQUIRED. Unique group identifier */
  groupId: string;
  /** OPTIONAL. Default is false. Indicates whether people external to the organization can send messages  */
  allowExternalSenders?: boolean;
  /** OPTIONAL. The list of sensitivity label pairs (label ID, label name) associated with a Microsoft 365 */
  assignedLabels?: Array<{
    labelId?: string;
    displayName?: string
  }>;
  /** OPTIONAL. Default is false. Indicates whether new members added to the group will be auto-subscribed */
  autoSubscribeNewMembers?: boolean;
  /** OPTIONAL. An optional description for the group. */
  description?: string;
  /** OPTIONAL. The display name for the group. This property is required when a group is created and it c */
  displayName?: string;
  /** OPTIONAL. The mail alias for the group, unique for Microsoft 365 groups in the organization. Maximum */
  mailNickname?: string;
  /** OPTIONAL. The preferred data location for the Microsoft 365 group. To update this property, the call */
  preferredDataLocation?: string;
  /** OPTIONAL. Specifies whether the group is a security group. */
  securityEnabled?: boolean;
  /** OPTIONAL. The unique identifier that can be assigned to a group and used as an alternate key. Can up */
  uniqueName?: string;
  /** OPTIONAL. Specifies the visibility of a Microsoft 365 group. The possible values are: Private, Publi */
  visibility?: "Private" | "Public" | "Hiddenmembership";
}

/**
 * Update group properties. Only updates the properties provided in the request. API Endpoint: PATCH /groups/{id}
 */
export async function updateGroup(input: UpdateGroupInput): Promise<unknown> {
  return callTool("teams", "update_group", input);
}
