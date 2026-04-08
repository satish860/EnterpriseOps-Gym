/**
 * Task Runner — loads a task from HuggingFace and displays it
 *
 * Usage:
 *   npx tsx src/task-runner.ts --domain teams --index 0
 *   npx tsx src/task-runner.ts --domain teams --task-id task_20251121_102744_757_7ebc1127_dadb0c94
 */

const HF_DATASET = "ServiceNow-AI/EnterpriseOps-Gym";
const HF_CONFIG  = "oracle";

// ── Types ────────────────────────────────────────────────────────────────────

interface GymServerConfig {
  mcp_server_name: string;
  mcp_server_url: string;
  seed_database_file: string;
  context: Record<string, string>;
  user_info: { user_id: string; name: string; email: string };
}

interface Verifier {
  verifier_type: string;
  name: string;
  description: string;
  gym_name: string;
  validation_config: {
    query: string;
    expected_value: unknown;
    comparison_type: string;
  };
}

export interface Task {
  task_id: string;
  domain: string;
  system_prompt: string;
  user_prompt: string;
  selected_tools: string[];
  restricted_tools: string[];
  gym_servers_config: GymServerConfig[];
  verifiers: Verifier[];
  seed_database_file: string;
  access_token: string;
  user_info: { user_id: string; name: string; email: string };
}

// ── Fetch task from HuggingFace ──────────────────────────────────────────────

async function fetchTask(domain: string, index: number): Promise<Task> {
  const url = `https://datasets-server.huggingface.co/rows?dataset=${encodeURIComponent(HF_DATASET)}&config=${HF_CONFIG}&split=${domain}&offset=${index}&length=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HuggingFace API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as any;
  const row = data.rows?.[0]?.row;
  if (!row) {
    throw new Error(`No task found at index ${index} for domain ${domain}`);
  }

  // Parse JSON string fields
  const gymServersConfig: GymServerConfig[] =
    typeof row.gym_servers_config === "string"
      ? JSON.parse(row.gym_servers_config)
      : row.gym_servers_config;

  const verifiers: Verifier[] =
    typeof row.verifiers === "string"
      ? JSON.parse(row.verifiers)
      : row.verifiers;

  // Pull convenient top-level fields from the first gym server
  const primaryGym = gymServersConfig[0];

  return {
    task_id: row.task_id,
    domain: row.domain,
    system_prompt: row.system_prompt,
    user_prompt: row.user_prompt,
    selected_tools: row.selected_tools ?? [],
    restricted_tools: row.restricted_tools ?? [],
    gym_servers_config: gymServersConfig,
    verifiers,
    seed_database_file: primaryGym.seed_database_file,
    access_token: primaryGym.context?.["x-teams-access-token"] ?? "",
    user_info: primaryGym.user_info,
  };
}

// ── Display task ─────────────────────────────────────────────────────────────

function displayTask(task: Task) {
  const line = "─".repeat(60);

  console.log(`\n${line}`);
  console.log(`TASK: ${task.task_id}`);
  console.log(`Domain: ${task.domain.toUpperCase()}`);
  console.log(line);

  console.log(`\n👤 Acting as:`);
  console.log(`   ${task.user_info.name} <${task.user_info.email}>`);

  console.log(`\n🗃️  Seed DB file:`);
  console.log(`   ${task.seed_database_file}`);

  console.log(`\n🔧 Tools available (${task.selected_tools.length}):`);
  console.log(`   ${task.selected_tools.join(", ")}`);

  console.log(`\n❓ Task:`);
  console.log(`   ${task.user_prompt}`);

  console.log(`\n✅ Verifiers (${task.verifiers.length}):`);
  for (const v of task.verifiers) {
    console.log(`   [${v.name}]`);
    console.log(`   ${v.description}`);
    console.log(`   SQL: ${v.validation_config.query}`);
    console.log(`   Expect: ${v.validation_config.comparison_type} ${v.validation_config.expected_value}\n`);
  }

  console.log(line);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const domain = args[args.indexOf("--domain") + 1] ?? "teams";
  const index  = parseInt(args[args.indexOf("--index") + 1] ?? "0", 10);

  console.log(`Fetching task ${index} from ${domain}...`);
  const task = await fetchTask(domain, index);
  displayTask(task);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
