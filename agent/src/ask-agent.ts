/**
 * Simple Pi SDK Agent — Ask questions about available EnterpriseOps-Gym tools
 *
 * Usage:
 *   npx tsx src/ask-agent.ts "What tools are available for Teams?"
 *   npx tsx src/ask-agent.ts  (interactive — reads from stdin)
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import {
  AuthStorage,
  codingTools,
  createAgentSession,
  DefaultResourceLoader,
  ModelRegistry,
  SessionManager,
} from "@mariozechner/pi-coding-agent";

// ── 1. Discover all server README.md files ──────────────────────────────────

function discoverToolDocs(): string {
  const serversDir = path.resolve(import.meta.dirname, "..", "servers");
  if (!fs.existsSync(serversDir)) {
    return "No server tool documentation found yet. Run generate:all first.";
  }

  const domains = fs.readdirSync(serversDir).filter((d) => {
    const readmePath = path.join(serversDir, d, "README.md");
    return fs.existsSync(readmePath);
  });

  if (domains.length === 0) {
    return "No server tool documentation found yet. Run generate scripts first.";
  }

  const docs: string[] = [];
  for (const domain of domains) {
    const readmePath = path.join(serversDir, domain, "README.md");
    const content = fs.readFileSync(readmePath, "utf-8");
    docs.push(`\n${"=".repeat(60)}\nDOMAIN: ${domain.toUpperCase()}\n${"=".repeat(60)}\n\n${content}`);
  }

  return docs.join("\n");
}

// ── 2. Build the system prompt ──────────────────────────────────────────────

function buildSystemPrompt(toolDocs: string): string {
  return `You are an expert assistant for the EnterpriseOps-Gym benchmark.

You know all about the MCP tools available across 8 enterprise domains:
- Teams (port 8002): Channels, messages, team management
- CSM / Customer Service (port 8001): Tickets, cases, customer records
- Email (port 8004): Send/read emails, mailboxes, attachments
- ITSM / IT Service Mgmt (port 8006): Incidents, change requests, CMDB
- Calendar (port 8003): Events, scheduling, availability
- HR (port 8008): Employee records, leave, org structure
- Drive (port 8009): Files, folders, sharing permissions

When asked about tools, answer from the documentation below.
When asked how to use a tool, show the TypeScript usage example.
Be concise but thorough.

## Available Tool Documentation

${toolDocs}
`;
}

// ── 3. Format tool results for display ─────────────────────────────────────

function formatToolResult(result: any): string {
  // Pi tools return { content: [{ type: "text", text: "..." }] }
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

// ── 4. Create agent session & prompt ────────────────────────────────────────

async function main() {
  const toolDocs = discoverToolDocs();
  const systemPrompt = buildSystemPrompt(toolDocs);

  console.log("🔧 EnterpriseOps-Gym Tool Explorer Agent");
  console.log("─".repeat(45));

  // Set up auth (uses env var ANTHROPIC_API_KEY or ~/.pi/agent/auth.json)
  const authStorage = AuthStorage.create();
  const modelRegistry = ModelRegistry.create(authStorage);

  // Custom resource loader with our system prompt
  const loader = new DefaultResourceLoader({
    systemPromptOverride: () => systemPrompt,
    appendSystemPromptOverride: () => [],
  });
  await loader.reload();

  const { session } = await createAgentSession({
    resourceLoader: loader,
    sessionManager: SessionManager.inMemory(),
    authStorage,
    modelRegistry,
    tools: codingTools, // read, bash, edit, write — lets the agent explore & answer
  });

  // Stream text + show tool calls (Claude-style)
  session.subscribe((event) => {
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

  // ── Single-shot mode (CLI argument) ─────────────────────────────────────
  const question = process.argv.slice(2).join(" ").trim();
  if (question) {
    console.log(`\n❓ ${question}\n`);
    await session.prompt(question);
    console.log("\n");
    session.dispose();
    return;
  }

  // ── Interactive mode ────────────────────────────────────────────────────
  console.log("Ask me anything about the available MCP tools.");
  console.log('Type "exit" or Ctrl+C to quit.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (): void => {
    rl.question("You> ", async (input) => {
      const trimmed = input.trim();
      if (!trimmed || trimmed.toLowerCase() === "exit") {
        console.log("👋 Bye!");
        rl.close();
        session.dispose();
        return;
      }

      console.log(); // blank line before response
      await session.prompt(trimmed);
      console.log("\n"); // blank line after response
      askQuestion();
    });
  };

  askQuestion();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
