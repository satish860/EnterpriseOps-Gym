/**
 * Tool Smoke Test — calls every tool with minimal params to find which ones work
 *
 * Usage:
 *   npx tsx src/test-tools.ts
 */

import { callTool, seedDatabase, listTools } from "./client.js";
import * as fs from "fs";
import * as path from "path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// Seed a DB first
async function seedTestDB(): Promise<string> {
  const sqlFile = path.resolve(REPO_ROOT, "Domain Wise DBs and Task-DB Mappings/teams/dbs/db_1764050565764_u95l4bfjz.sql");
  const sqlContent = fs.readFileSync(sqlFile, "utf-8");
  const dbId = `db_test_${Date.now()}`;
  await seedDatabase(dbId, sqlContent);
  return dbId;
}

// Minimal test cases — just enough to verify the tool doesn't crash
// Uses real IDs from the seed data
const TESTS: Record<string, Record<string, unknown>> = {
  // Users
  list_users: { _top: 1 },
  get_user: { userPrincipalName: "alice.manager@techcorp.com" },
  create_user: { userPrincipalName: "test.user@techcorp.com", displayName: "Test User", accountEnabled: true, mailNickname: "testuser", passwordProfile: { password: "Test1234!" } },
  update_user: { userPrincipalName: "alice.manager@techcorp.com", jobTitle: "Senior PM" },
  delete_user: { userPrincipalName: "test.user@techcorp.com" },

  // Chats
  create_chat: { chatType: "oneOnOne", members: [
    { "_odata_type": "#microsoft.graph.aadUserConversationMember", "roles": ["owner"], "user_odata_bind": "https://graph.microsoft.com/v1.0/users('james.wilson')" },
    { "_odata_type": "#microsoft.graph.aadUserConversationMember", "roles": [], "user_odata_bind": "https://graph.microsoft.com/v1.0/users('bob.smith')" }
  ]},
  list_chats: {},
  // list_chat_messages needs a real chatId — will use one from create_chat
  // send_chat_message needs a chatId
  // update_chat needs group chat

  // Teams
  list_teams: {},
  list_team_members: { teamId: "team_techcorp_001" },

  // Channels
  list_channels: { teamId: "team_techcorp_001" },
  list_all_channels: { teamId: "team_techcorp_001" },
  get_primary_channel: { teamId: "team_techcorp_001" },

  // Groups
  list_groups: {},

  // Tags
  list_teamwork_tags: { team_id: "team_techcorp_001" },

  // Apps
  list_installed_apps: { teamId: "team_techcorp_001" },
  list_teams_apps: {},

  // Calls
  list_call_records: {},

  // Virtual events
  list_virtual_event_webinars: {},
  list_virtual_event_townhalls: {},

  // Webinar create + cancel
  create_virtual_event_webinar: {
    displayName: "Test Webinar",
    description: { contentType: "text", content: "Test" },
    startDateTime: { dateTime: "2025-12-01T10:00:00", timeZone: "UTC" },
    endDateTime: { dateTime: "2025-12-01T11:00:00", timeZone: "UTC" },
    audience: "organization"
  },

  // Townhall create (known to crash — testing to confirm)
  create_virtual_event_townhall: {
    displayName: "Test Townhall",
    description: { contentType: "text", content: "Test" },
    startDateTime: { dateTime: "2025-12-01T10:00:00", timeZone: "UTC" },
    endDateTime: { dateTime: "2025-12-01T11:00:00", timeZone: "UTC" },
    audience: "organization"
  },

  // Channel messages
  list_channel_messages: { teamId: "team_techcorp_001", channelId: "channel_techcorp_general" },

  // User status
  set_user_status_message: {
    user_id: "james.wilson",
    statusMessage: { message: { content: "Testing", contentType: "text" } }
  },

  // Create channel
  create_channel: { teamId: "team_techcorp_001", displayName: "Test Channel" },

  // Send channel message (uses General channel)
  send_channel_message: {
    teamId: "team_techcorp_001",
    channelId: "channel_techcorp_general",
    body: { contentType: "text", content: "Test message" }
  },

  // Create call
  create_call: {
    callbackUri: "https://example.com/callback",
    requestedModalities: ["audio"],
    mediaConfig: { _odata_type: "#microsoft.graph.serviceHostedMediaConfig" },
    targets: [{ identity: { user: { id: "alice.johnson", displayName: "Alice Johnson" } } }],
    subject: "Test call"
  },

  // Create group
  create_group: {
    displayName: "Test Group",
    mailEnabled: false,
    mailNickname: "testgroup",
    securityEnabled: true
  },

  // Create team
  create_team: {
    template_odata_bind: "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
    displayName: "Test Team"
  },
};

async function main() {
  console.log("Seeding test database...");
  const dbId = await seedTestDB();
  process.env.TEAMS_DB = dbId;
  process.env.TEAMS_TOKEN = "ya29.A0ARrdaM-super999unique888token777special666.SuperUserAllPermissionsTokenAccess_99-99";

  console.log(`DB: ${dbId}\n`);

  const results: { tool: string; status: "✅" | "❌"; error?: string }[] = [];

  for (const [tool, args] of Object.entries(TESTS)) {
    try {
      const result = await callTool("teams", tool, args);
      results.push({ tool, status: "✅" });
      console.log(`✅ ${tool}`);
    } catch (err: any) {
      const msg = err.message.slice(0, 100);
      results.push({ tool, status: "❌", error: msg });
      console.log(`❌ ${tool} — ${msg}`);
    }
  }

  // Summary
  const passed = results.filter(r => r.status === "✅").length;
  const failed = results.filter(r => r.status === "❌").length;
  console.log(`\n${"─".repeat(40)}`);
  console.log(`Passed: ${passed}/${results.length}`);
  console.log(`Failed: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log(`\nFailed tools:`);
    for (const r of results.filter(r => r.status === "❌")) {
      console.log(`  ${r.tool}: ${r.error}`);
    }
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
