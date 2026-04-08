/**
 * Auto-generated wrapper for MCP tool: update_user
 * Domain: teams (port 8002)
 *
 * Update user properties.
 */
import { callTool } from "../../src/client.js";

export interface UpdateUserInput {
  /** User identifier - accepts either user ID (UUID) or userPrincipalName (e.g., 'alice_manager' or 'alic */
  userId?: string;
  /** User principal name in email format (e.g., 'alice.manager@techcorp.com'). Can be provided along with */
  userPrincipalName?: string;
  /** Display name of the user */
  displayName?: string;
  /** Given name (first name) - omit or use empty string to clear */
  givenName?: string;
  /** Surname (last name) - omit or use empty string to clear */
  surname?: string;
  /** Job title - omit or use empty string to clear */
  jobTitle?: string;
  /** Primary email address - omit or use empty string to clear */
  mail?: string;
  /** Business phone numbers - omit or use empty array to clear */
  businessPhones?: Array<string>;
  /** Mobile phone number - omit or use empty string to clear */
  mobilePhone?: string;
  /** Office location - omit or use empty string to clear */
  officeLocation?: string;
  /** Preferred language code - omit or use empty string to clear */
  preferredLanguage?: string;
  /** Account enabled state (true/false). Omit to leave unchanged. */
  accountEnabled?: boolean;
  /** Mail alias (mailNickname) - omit or use empty string to clear */
  mailNickname?: string;
  /** Department - omit or use empty string to clear */
  department?: string;
  /** Company name - omit or use empty string to clear */
  companyName?: string;
  /** Usage location (e.g., 'US') - omit or use empty string to clear */
  usageLocation?: string;
  /** City - omit or use empty string to clear */
  city?: string;
  /** State/Province - omit or use empty string to clear */
  state?: string;
  /** Country/Region - omit or use empty string to clear */
  country?: string;
  /** Street address - omit or use empty string to clear */
  streetAddress?: string;
  /** Postal/ZIP code - omit or use empty string to clear */
  postalCode?: string;
  /** Employee identifier - omit or use empty string to clear */
  employeeId?: string;
  /** Worker type - omit or use empty string to clear */
  employeeType?: string;
  /** User classification (Member or Guest) - omit to leave unchanged. Note: Cannot be set to null via API */
  userType?: "Member" | "Guest";
  /** Hire date - omit or use empty string to clear */
  employeeHireDate?: string;
  /** Additional email addresses - omit or use empty array to clear */
  otherMails?: Array<string>;
  /** Self-description - omit or use empty string to clear */
  aboutMe?: string;
  /** Birthday - omit or use empty string to clear */
  birthday?: string;
  /** Interests - omit or use empty array to clear */
  interests?: Array<string>;
  /** Skills - omit or use empty array to clear */
  skills?: Array<string>;
  /** Personal website - omit or use empty string to clear */
  mySite?: string;
  /** Preferred name - omit or use empty string to clear */
  preferredName?: string;
  /** Fax number - omit or use empty string to clear */
  faxNumber?: string;
  /** Age group classification - omit to leave unchanged */
  ageGroup?: "Minor" | "NotAdult" | "Adult";
  /** Resource account flag - omit to leave unchanged */
  isResourceAccount?: boolean;
  /** Past projects - omit or use empty array to clear */
  pastProjects?: Array<string>;
  /** Responsibilities - omit or use empty array to clear */
  responsibilities?: Array<string>;
  /** Schools attended - omit or use empty array to clear */
  schools?: Array<string>;
  /** Organization data - omit to leave unchanged, provide empty object {} to clear */
  employeeOrgData?: {
    costCenter?: string;
    division?: string
  };
}

/**
 * Update user properties.
 */
export async function updateUser(input: UpdateUserInput): Promise<unknown> {
  return callTool("teams", "update_user", input);
}
