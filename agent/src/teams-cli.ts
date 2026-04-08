#!/usr/bin/env npx tsx
/**
 * Teams CLI — single binary wrapping 70 MCP tools
 *
 * Usage:
 *   teams <command> [--key value ...]
 *
 * Environment:
 *   TEAMS_DB   — required, the database_id for this task
 *   MCP_HOST   — optional, default 127.0.0.1
 *   MCP_PORT   — optional, default 8002
 *
 * Examples:
 *   teams list-users --top 5
 *   teams get-user --userPrincipalName alice.manager@techcorp.com
 *   teams create-channel --teamId team_001 --displayName "Engineering"
 *   teams send-channel-message --teamId t1 --channelId c1 --body '{"contentType":"text","content":"Hello"}'
 *   teams seed --sql-file path/to/db.sql
 *   teams tools
 */

import * as fs from "fs";
import { callTool, seedDatabase, listTools } from "./client.js";

// ── Parse CLI args ──────────────────────────────────────────────────────────

function parseArgs(argv: string[]): { command: string; args: Record<string, unknown> } {
  const [command, ...rest] = argv;

  if (!command) {
    printUsage();
    process.exit(1);
  }

  const args: Record<string, unknown> = {};
  let i = 0;

  while (i < rest.length) {
    const arg = rest[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = rest[i + 1];

      // No next value or next is also a flag
      if (next === undefined || next.startsWith("--")) {
        // Boolean flag
        args[key] = true;
        i++;
        continue;
      }

      // Try to parse as JSON (for objects, arrays, numbers, booleans)
      try {
        args[key] = JSON.parse(next);
      } catch {
        // Keep as string
        args[key] = next;
      }
      i += 2;
    } else {
      // Positional arg — skip
      i++;
    }
  }

  return { command, args };
}

// ── Command name → MCP tool name ────────────────────────────────────────────

function toToolName(command: string): string {
  // list-users → list_users
  // send-channel-message → send_channel_message
  return command.replace(/-/g, "_");
}

// ── Usage ───────────────────────────────────────────────────────────────────

function printUsage() {
  console.log(`
Teams CLI — 70 MCP tools as one command

Usage:
  teams <command> [--key value ...]

Special commands:
  teams tools                     List all available tools
  teams seed --sql-file <path>    Seed a fresh database

Environment:
  TEAMS_DB=<database_id>          Required for tool calls (set by task runner)
  MCP_HOST=127.0.0.1              MCP server host
  MCP_PORT=8002                   MCP server port

Examples:
  teams list-users --top 5
  teams get-user --userPrincipalName alice.manager@techcorp.com
  teams create-team --template_odata_bind "https://graph.microsoft.com/v1.0/teamsTemplates('standard')" --displayName "Engineering"
  teams send-channel-message --teamId t1 --channelId c1 --body '{"contentType":"text","content":"Hello"}'
`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { command, args } = parseArgs(process.argv.slice(2));

  // ── Special: list tools ─────────────────────────────────────────────────
  if (command === "tools") {
    const tools = await listTools();
    console.log(`${tools.length} tools available:\n`);
    for (const tool of tools) {
      const required = tool.inputSchema?.required ?? [];
      const params = Object.keys(tool.inputSchema?.properties ?? {});
      const paramStr = params
        .map((p: string) => (required.includes(p) ? `--${p} *` : `--${p}`))
        .join("  ");
      console.log(`  ${tool.name}`);
      console.log(`    ${tool.description.slice(0, 80)}`);
      if (paramStr) console.log(`    ${paramStr}`);
      console.log();
    }
    return;
  }

  // ── Special: seed database ──────────────────────────────────────────────
  if (command === "seed") {
    const sqlFile = args["sql-file"] as string;
    if (!sqlFile) {
      console.error("Error: --sql-file is required for seed command");
      process.exit(1);
    }
    if (!fs.existsSync(sqlFile)) {
      console.error(`Error: SQL file not found: ${sqlFile}`);
      process.exit(1);
    }

    const sqlContent = fs.readFileSync(sqlFile, "utf-8");
    const timestamp = Date.now();
    const suffix = Math.random().toString(36).slice(2, 11);
    const databaseId = `db_${timestamp}_${suffix}`;

    const result = await seedDatabase(databaseId, sqlContent);

    // Extract the super admin token from the SQL (james.wilson's token)
    const tokenMatch = sqlContent.match(
      /SuperUserAllPermissionsTokenAccess[^'"]+/
    );
    const superToken = tokenMatch
      ? `ya29.A0ARrdaM-super999unique888token777special666.${tokenMatch[0]}`
      : "";

    // Output as eval-friendly exports
    console.log(`export TEAMS_DB=${result.database_id}`);
    if (superToken) {
      console.log(`export TEAMS_TOKEN=${superToken}`);
    }
    return;
  }

  // ── Regular tool call ───────────────────────────────────────────────────
  if (!process.env.TEAMS_DB) {
    console.error("Error: TEAMS_DB environment variable is required");
    console.error("  Set it with: export TEAMS_DB=$(teams seed --sql-file path/to/db.sql)");
    process.exit(1);
  }

  const toolName = toToolName(command);

  try {
    const result = await callTool("teams", toolName, args);
    console.log(JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
