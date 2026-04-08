/**
 * Auto-generated wrapper for MCP tool: create_user
 * Domain: teams (port 8002)
 *
 * Create a new user in the organization.
 */
import { callTool } from "../../src/client.js";

export interface CreateUserInput {
  /** User principal name in email format (e.g., john.doe@contoso.com) */
  userPrincipalName: string;
  /** Display name of the user */
  displayName: string;
  /** Whether the account is enabled */
  accountEnabled: boolean;
  /** Mail alias (mailNickname) */
  mailNickname: string;
  /** Password profile settings */
  passwordProfile: {
    password?: string;
    forceChangePasswordNextSignIn?: boolean
  };
  /** Given name (first name) */
  givenName?: string;
  /** Surname (last name) */
  surname?: string;
  /** Job title */
  jobTitle?: string;
  /** Primary email address */
  mail?: string;
  /** Business phone numbers */
  businessPhones?: Array<string>;
  /** Mobile phone number */
  mobilePhone?: string;
  /** Office location */
  officeLocation?: string;
  /** Preferred language code (e.g., en-US, fr-FR) */
  preferredLanguage?: string;
  /** Department */
  department?: string;
  /** Company name */
  companyName?: string;
  /** Usage location (e.g., 'US') */
  usageLocation?: string;
  /** City */
  city?: string;
  /** State/Province */
  state?: string;
  /** Country/Region */
  country?: string;
  /** Street address */
  streetAddress?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Employee identifier assigned by organization */
  employeeId?: string;
  /** Worker type (e.g., Employee, Contractor, Consultant, Vendor) */
  employeeType?: string;
  /** User classification (Member or Guest) */
  userType?: "Member" | "Guest";
  /** Hire date in ISO 8601 format (e.g., 2024-01-15T00:00:00Z) */
  employeeHireDate?: string;
  /** Additional email addresses (max 250 entries, 250 chars each) */
  otherMails?: Array<string>;
  /** Freeform text for user self-description */
  aboutMe?: string;
  /** User's birthday in ISO 8601 format (e.g., 1990-05-15T00:00:00Z) */
  birthday?: string;
  /** List of user interests */
  interests?: Array<string>;
  /** List of user skills */
  skills?: Array<string>;
  /** URL for user's personal website */
  mySite?: string;
  /** User's preferred name */
  preferredName?: string;
  /** Fax number */
  faxNumber?: string;
  /** Age group classification */
  ageGroup?: "Minor" | "NotAdult" | "Adult";
  /** List of past projects */
  pastProjects?: Array<string>;
  /** List of user responsibilities */
  responsibilities?: Array<string>;
  /** List of schools attended */
  schools?: Array<string>;
  /** Organization data (costCenter and division) */
  employeeOrgData?: {
    costCenter?: string;
    division?: string
  };
}

/**
 * Create a new user in the organization.
 */
export async function createUser(input: CreateUserInput): Promise<unknown> {
  return callTool("teams", "create_user", input);
}
