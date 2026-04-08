/**
 * MCP HTTP Client — talks to the MCP server via JSON-RPC
 *
 * Environment variables:
 *   TEAMS_DB      — database_id for the x-database-id header (required for tool calls)
 *   TEAMS_TOKEN   — access token for x-teams-access-token header (auto-detected from DB if not set)
 *   MCP_HOST      — override server host (default: 127.0.0.1)
 *   MCP_PORT      — override server port (default: 8002)
 */

// ── Config ──────────────────────────────────────────────────────────────────

const MCP_HOST = process.env.MCP_HOST ?? "127.0.0.1";
const MCP_PORT = process.env.MCP_PORT ?? "8002";
const BASE_URL = `http://${MCP_HOST}:${MCP_PORT}`;

let _taskContext: Record<string, Record<string, string>> = {};

export function setTaskContext(
  contextId: string,
  headers: Record<string, string>
) {
  _taskContext[contextId] = headers;
}

// ── JSON-RPC ID counter ─────────────────────────────────────────────────────

let _rpcId = 0;

// ── callTool ────────────────────────────────────────────────────────────────

export async function callTool(
  domain: string,
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const databaseId = process.env.TEAMS_DB;
  if (!databaseId) {
    throw new Error(
      "TEAMS_DB environment variable is required. Set it to a valid database_id."
    );
  }

  const body = {
    jsonrpc: "2.0",
    id: ++_rpcId,
    method: "tools/call",
    params: {
      name: toolName,
      arguments: args,
    },
  };

  const response = await fetch(`${BASE_URL}/mcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-database-id": databaseId,
      ...(process.env.TEAMS_TOKEN
        ? { "x-teams-access-token": process.env.TEAMS_TOKEN }
        : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`MCP server error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as any;

  if (json.error) {
    throw new Error(`MCP RPC error: ${json.error.message ?? JSON.stringify(json.error)}`);
  }

  // The result is { content: [{ type: "text", text: "..." }], isError: bool }
  const result = json.result;
  if (result?.isError) {
    const errorText = result.content?.[0]?.text ?? "Unknown MCP tool error";
    throw new Error(errorText);
  }

  // Parse the text content as JSON if possible
  const text = result?.content?.[0]?.text;
  if (text) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  return result;
}

// ── seedDatabase ────────────────────────────────────────────────────────────

export async function seedDatabase(
  databaseId: string,
  sqlContent: string
): Promise<{ success: boolean; message: string; database_id: string }> {
  const response = await fetch(`${BASE_URL}/api/seed-database`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      database_id: databaseId,
      sql_content: sqlContent,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Seed failed (${response.status}): ${text}`);
  }

  return (await response.json()) as any;
}

// ── deleteDatabase ──────────────────────────────────────────────────────────

export async function deleteDatabase(databaseId: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/delete-database`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ database_id: databaseId }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// ── runSQL ──────────────────────────────────────────────────────────────────

export async function runSQL(
  databaseId: string,
  query: string
): Promise<any> {
  const response = await fetch(`${BASE_URL}/api/sql-runner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-database-id": databaseId,
    },
    body: JSON.stringify({ database_id: databaseId, query }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SQL runner error (${response.status}): ${text}`);
  }

  return (await response.json()) as any;
}

// ── listTools ───────────────────────────────────────────────────────────────

export async function listTools(): Promise<any[]> {
  const body = {
    jsonrpc: "2.0",
    id: ++_rpcId,
    method: "tools/list",
    params: {},
  };

  const response = await fetch(`${BASE_URL}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await response.json()) as any;
  return json.result?.tools ?? [];
}
