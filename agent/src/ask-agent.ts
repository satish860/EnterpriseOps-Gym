/**
 * Pi SDK Agent — runs EnterpriseOps-Gym tasks via Teams CLI
 *
 * Two modes:
 *   Interactive Q&A:  npx tsx src/ask-agent.ts
 *   Task execution:   imported by task-runner.ts via runTask()
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Put bin/ on PATH so `teams` CLI works
const BIN_DIR = path.resolve(import.meta.dirname, "../bin").replace(/\\/g, "/");
process.env.PATH = `${BIN_DIR}${path.delimiter}${process.env.PATH}`;
import {
  AuthStorage,
  createAgentSession,
  DefaultResourceLoader,
  ModelRegistry,
  SessionManager,
} from "@mariozechner/pi-coding-agent";
import type { Task } from "./task-runner.js";

// ── 1. Build the append prompt for a task ───────────────────────────────────

const README_PATH    = path.resolve(import.meta.dirname, "../servers/teams/README.md").replace(/\\/g, "/");
const LEARNINGS_PATH = path.resolve(import.meta.dirname, "../LEARNINGS.md").replace(/\\/g, "/");

function loadLearnings(): string {
  if (fs.existsSync(LEARNINGS_PATH)) {
    return fs.readFileSync(LEARNINGS_PATH, "utf-8");
  }
  return "";
}

function buildTaskAppend(task: Task, dbId: string): string {
  return `
## Task Context

You are acting as: **${task.user_info.name}** <${task.user_info.email}> (user_id: ${task.user_info.user_id})
The environment variable TEAMS_DB is already set to \`${dbId}\`.
The environment variable TEAMS_TOKEN is already set.

## Teams CLI

You have a \`teams\` CLI available in bash. It is already on your PATH. It wraps 70 Microsoft Teams tools.

**How to call it:**
\`\`\`bash
teams list-users --_top 5
teams list-teams
teams get-user --userPrincipalName alice.manager@techcorp.com
teams create-channel --teamId team_001 --displayName "Engineering"
teams send-chat-message --chatId chat_001 --body '{"contentType":"text","content":"Hello"}'
\`\`\`

Tool names use hyphens: \`list-users\`, \`send-chat-message\`, \`create-channel\`.
For object/array parameters, pass JSON: \`--body '{"contentType":"text","content":"Hello"}'\`

**How to discover tools and parameters:**
The full reference is at \`${README_PATH}\`
- Scan the Tool Index at the top for available tools
- Use grep to look up any tool's parameters:
\`\`\`bash
grep -A 20 "^### \\\`send_chat_message\\\`" ${README_PATH}
\`\`\`

## Guidelines

- Always query/list first before creating or mutating — understand the current state
- Use grep on the README to look up tool parameters before calling — don't guess
- For user lookups use userPrincipalName, not displayName
- When creating chats, the members array needs proper odata format
- If a command errors, read the error message carefully — it tells you what's wrong
- Complete the task fully, then stop — do not ask for confirmation

## Dependency Rules (must follow)

**Channel IDs are never static — always look them up:**
\`\`\`bash
# Wrong — never assume channel IDs
teams send-channel-message --channelId "channel_general" ...

# Right — resolve first
teams list-channels --teamId <teamId>   # get real channelId from response
teams send-channel-message --channelId <real_id> ...
\`\`\`

**Creating a user requires forceChangePasswordNextSignIn in passwordProfile:**
\`\`\`bash
teams create-user --passwordProfile '{"password":"Test1234!","forceChangePasswordNextSignIn":false}' ...
\`\`\`

**Creating a team requires at least one owner in members:**
\`\`\`bash
teams create-team --members '[{"_odata_type":"#microsoft.graph.aadUserConversationMember","roles":["owner"],"user_odata_bind":"https://graph.microsoft.com/v1.0/users(\'<userId>\')"}]' ...
\`\`\`

**Always verify an entity exists before deleting it — use get first:**
\`\`\`bash
teams get-user --userPrincipalName <upn>   # confirm exists first
teams delete-user --userPrincipalName <upn>
\`\`\`

## Known Server Bugs

- **\`create_virtual_event_townhall\`** — this tool always fails with a server-side error in the Docker image. It is a known bug that cannot be fixed. If a task requires creating a townhall, do your best with all other steps, then mark the townhall creation as blocked due to a known server bug and complete the rest of the task.

${loadLearnings()}
`;
}

// ── 2. Display helpers (Claude-style tool output) ───────────────────────────

function formatToolResult(result: any): string {
  if (result?.content && Array.isArray(result.content)) {
    return result.content
      .map((block: any) => {
        if (block.type === "text") return block.text;
        if (block.type === "image") return "[image]";
        return JSON.stringify(block);
      })
      .join("\n");
  }
  if (typeof result === "string") return result;
  return JSON.stringify(result, null, 2);
}

function formatArgsInline(args: any): string {
  if (!args || typeof args !== "object") return "";
  return Object.entries(args)
    .map(([k, v]) => {
      const val = typeof v === "string"
        ? (v.length > 60 ? `"${v.slice(0, 57)}..."` : `"${v}"`)
        : JSON.stringify(v);
      return `${k}: ${val}`;
    })
    .join(", ");
}

function indent(text: string, maxLines: number): string[] {
  const lines = text.split("\n");
  const trimmed = lines.length > maxLines
    ? [...lines.slice(0, maxLines), `  ... (${lines.length - maxLines} more lines)`]
    : lines;
  return trimmed.map((l) => `  ${l}`);
}

function subscribeOutput(session: any) {
  session.subscribe((event: any) => {
    switch (event.type) {
      case "message_update":
        if (event.assistantMessageEvent.type === "text_delta") {
          process.stdout.write(event.assistantMessageEvent.delta);
        }
        break;

      case "tool_execution_start": {
        const argsStr = formatArgsInline(event.args);
        console.log(`\n\x1b[2m\x1b[36m● ${event.toolName}\x1b[0m\x1b[2m(${argsStr})\x1b[0m`);
        break;
      }

      case "tool_execution_update":
        break;

      case "tool_execution_end": {
        if (event.isError) {
          const output = formatToolResult(event.result);
          console.log(`\x1b[31m  ✘ Error\x1b[0m`);
          indent(output, 15).forEach((l) => console.log(l));
        } else if (event.result) {
          const output = formatToolResult(event.result);
          indent(output, 15).forEach((l) => console.log(`\x1b[2m${l}\x1b[0m`));
        }
        console.log();
        break;
      }
    }
  });
}

// ── 3. Create a session with task context appended ──────────────────────────

async function createSession(appendPrompt?: string) {
  const authStorage = AuthStorage.create();
  const modelRegistry = ModelRegistry.create(authStorage);

  const loader = new DefaultResourceLoader({
    appendSystemPromptOverride: (base) => {
      const parts = [...base];
      if (appendPrompt) parts.push(appendPrompt);
      return parts;
    },
  });
  await loader.reload();

  const { session } = await createAgentSession({
    resourceLoader: loader,
    sessionManager: SessionManager.inMemory(),
    authStorage,
    modelRegistry,
  });

  subscribeOutput(session);
  return session;
}

// ── 4. Run a task (called by task-runner.ts) ────────────────────────────────

export async function runTask(task: Task, dbId: string): Promise<void> {
  // Set env vars so the teams CLI picks them up
  process.env.TEAMS_DB = dbId;
  process.env.TEAMS_TOKEN = task.access_token;

  const appendPrompt = buildTaskAppend(task, dbId);
  const session = await createSession(appendPrompt);

  console.log(`\n❓ Task: ${task.user_prompt}\n`);
  await session.prompt(task.user_prompt);
  console.log("\n");

  session.dispose();
}

// ── 5. Interactive Q&A mode (standalone) ────────────────────────────────────

async function main() {
  console.log("🔧 EnterpriseOps-Gym Agent");
  console.log("─".repeat(45));

  // Single-shot from CLI args
  const question = process.argv.slice(2).join(" ").trim();
  if (question) {
    const session = await createSession();
    console.log(`\n❓ ${question}\n`);
    await session.prompt(question);
    console.log("\n");
    session.dispose();
    return;
  }

  // Interactive mode
  const session = await createSession();
  console.log("Ask me anything. Type 'exit' to quit.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const askQuestion = (): void => {
    rl.question("You> ", async (input) => {
      const trimmed = input.trim();
      if (!trimmed || trimmed.toLowerCase() === "exit") {
        console.log("👋 Bye!");
        rl.close();
        session.dispose();
        return;
      }
      console.log();
      await session.prompt(trimmed);
      console.log("\n");
      askQuestion();
    });
  };

  askQuestion();
}

// Only run main when executed directly, not when imported
const isDirectRun = process.argv[1]?.includes("ask-agent");
if (isDirectRun) {
  main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
  });
}
