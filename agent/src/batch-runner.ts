/**
 * Batch Runner — runs all tasks for a domain and saves results
 *
 * Usage:
 *   npx tsx src/batch-runner.ts --domain teams
 *   npx tsx src/batch-runner.ts --domain teams --start 5 --end 20
 *   npx tsx src/batch-runner.ts --domain teams --start 10 --count 5
 */

import * as fs from "fs";
import * as path from "path";
import { deleteDatabase } from "./client.js";
import { runTask } from "./ask-agent.js";

// Re-use fetchTask, setupTask, verifyTask from task-runner but need to
// import them. Since task-runner runs main() on import when argv matches,
// we import the pieces we need by duplicating the fetch/setup/verify here
// or by refactoring. Let's import what we can and inline what we must.

// We need these from task-runner but it auto-runs main(). The ask-agent
// already guards with isDirectRun. task-runner doesn't. Let's just
// duplicate the core functions here to keep it clean.

import { seedDatabase, runSQL } from "./client.js";
import type { Task } from "./task-runner.js";

const HF_DATASET = "ServiceNow-AI/EnterpriseOps-Gym";
const HF_CONFIG = "oracle";
const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const RESULTS_DIR = path.resolve(REPO_ROOT, "results");

// ── Fetch task ───────────────────────────────────────────────────────────────

async function fetchTask(domain: string, index: number): Promise<Task> {
  const url = `https://datasets-server.huggingface.co/rows?dataset=${encodeURIComponent(HF_DATASET)}&config=${HF_CONFIG}&split=${domain}&offset=${index}&length=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HF API error: ${res.status}`);
  const data = (await res.json()) as any;
  const row = data.rows?.[0]?.row;
  if (!row) throw new Error(`No task at index ${index}`);

  const gymServersConfig = typeof row.gym_servers_config === "string"
    ? JSON.parse(row.gym_servers_config) : row.gym_servers_config;
  const verifiers = typeof row.verifiers === "string"
    ? JSON.parse(row.verifiers) : row.verifiers;
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

// ── Setup task ───────────────────────────────────────────────────────────────

async function setupTask(task: Task): Promise<string> {
  const sqlFile = path.resolve(REPO_ROOT, task.seed_database_file);
  if (!fs.existsSync(sqlFile)) throw new Error(`Seed file not found: ${sqlFile}`);
  const sqlContent = fs.readFileSync(sqlFile, "utf-8");
  const databaseId = `db_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  await seedDatabase(databaseId, sqlContent);
  return databaseId;
}

// ── Verify task ──────────────────────────────────────────────────────────────

interface VerifyResult {
  name: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  error?: string;
}

async function verifyTask(task: Task, dbId: string): Promise<VerifyResult[]> {
  const results: VerifyResult[] = [];

  for (const v of task.verifiers) {
    try {
      const result = await runSQL(dbId, v.validation_config.query);
      const row = result?.data?.[0];
      const actual = row ? Object.values(row)[0] : undefined;
      const expected = v.validation_config.expected_value;

      let ok = false;
      switch (v.validation_config.comparison_type) {
        case "equals":  ok = actual == expected; break;
        case "gt":      ok = (actual as number) > (expected as number); break;
        case "gte":     ok = (actual as number) >= (expected as number); break;
        case "lt":      ok = (actual as number) < (expected as number); break;
        case "lte":     ok = (actual as number) <= (expected as number); break;
        default:        ok = actual == expected;
      }

      results.push({ name: v.name, passed: ok, expected, actual });
    } catch (err: any) {
      results.push({ name: v.name, passed: false, expected: v.validation_config.expected_value, actual: null, error: err.message });
    }
  }

  return results;
}

// ── Task result type ─────────────────────────────────────────────────────────

interface TaskResult {
  index: number;
  task_id: string;
  domain: string;
  user_prompt: string;
  passed: number;
  failed: number;
  total: number;
  verifiers: VerifyResult[];
  error?: string;
  duration_s: number;
}

// ── Run single task with full error handling ─────────────────────────────────

async function runSingleTask(domain: string, index: number): Promise<TaskResult> {
  const start = Date.now();
  let dbId: string | null = null;

  try {
    console.log(`\n${"═".repeat(60)}`);
    console.log(`TASK ${index + 1} — Fetching...`);
    const task = await fetchTask(domain, index);
    console.log(`Task: ${task.task_id}`);
    console.log(`Prompt: ${task.user_prompt.slice(0, 100)}...`);

    console.log(`Seeding DB...`);
    dbId = await setupTask(task);

    console.log(`Running agent...`);
    await runTask(task, dbId);

    console.log(`Verifying...`);
    const verifiers = await verifyTask(task, dbId);

    const passed = verifiers.filter((v) => v.passed).length;
    const failed = verifiers.filter((v) => !v.passed).length;

    // Print scorecard
    for (const v of verifiers) {
      console.log(`${v.passed ? "✅" : "❌"} ${v.name}`);
    }
    console.log(`Score: ${passed}/${passed + failed}`);

    // Cleanup DB
    if (dbId) await deleteDatabase(dbId).catch(() => {});

    return {
      index,
      task_id: task.task_id,
      domain: task.domain,
      user_prompt: task.user_prompt,
      passed,
      failed,
      total: passed + failed,
      verifiers,
      duration_s: (Date.now() - start) / 1000,
    };
  } catch (err: any) {
    console.error(`❌ Task ${index} crashed: ${err.message}`);
    if (dbId) await deleteDatabase(dbId).catch(() => {});

    return {
      index,
      task_id: `unknown_${index}`,
      domain,
      user_prompt: "",
      passed: 0,
      failed: 0,
      total: 0,
      verifiers: [],
      error: err.message,
      duration_s: (Date.now() - start) / 1000,
    };
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const domain = args[args.indexOf("--domain") + 1] ?? "teams";
  const start = parseInt(args[args.indexOf("--start") + 1] ?? "0", 10);

  // Determine end index
  let end: number;
  if (args.includes("--end")) {
    end = parseInt(args[args.indexOf("--end") + 1], 10);
  } else if (args.includes("--count")) {
    end = start + parseInt(args[args.indexOf("--count") + 1], 10);
  } else {
    end = 61; // All teams tasks
  }

  // Ensure results dir exists
  fs.mkdirSync(RESULTS_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const resultsFile = path.join(RESULTS_DIR, `${domain}_${timestamp}.json`);

  console.log(`\n${"═".repeat(60)}`);
  console.log(`BATCH RUN: ${domain} tasks ${start}–${end - 1}`);
  console.log(`Results: ${resultsFile}`);
  console.log(`${"═".repeat(60)}`);

  const allResults: TaskResult[] = [];
  let totalPassed = 0;
  let totalFailed = 0;
  let totalVerifiers = 0;
  let tasksPassed = 0; // tasks where ALL verifiers pass

  for (let i = start; i < end; i++) {
    const result = await runSingleTask(domain, i);
    allResults.push(result);

    totalPassed += result.passed;
    totalFailed += result.failed;
    totalVerifiers += result.total;
    if (result.total > 0 && result.failed === 0) tasksPassed++;

    // Save after each task so we don't lose progress on crash
    const summary = {
      domain,
      range: `${start}-${end - 1}`,
      timestamp,
      tasks_run: allResults.length,
      tasks_passed: tasksPassed,
      tasks_total: end - start,
      verifiers_passed: totalPassed,
      verifiers_failed: totalFailed,
      verifiers_total: totalVerifiers,
      pass_rate: totalVerifiers > 0
        ? `${((totalPassed / totalVerifiers) * 100).toFixed(1)}%`
        : "N/A",
      task_pass_rate: allResults.length > 0
        ? `${((tasksPassed / allResults.length) * 100).toFixed(1)}%`
        : "N/A",
      results: allResults,
    };

    fs.writeFileSync(resultsFile, JSON.stringify(summary, null, 2));
  }

  // Final summary
  console.log(`\n${"═".repeat(60)}`);
  console.log(`FINAL RESULTS`);
  console.log(`${"═".repeat(60)}`);
  console.log(`Tasks run:        ${allResults.length}`);
  console.log(`Tasks passed:     ${tasksPassed}/${allResults.length} (${((tasksPassed / allResults.length) * 100).toFixed(1)}%)`);
  console.log(`Verifiers passed: ${totalPassed}/${totalVerifiers} (${((totalPassed / totalVerifiers) * 100).toFixed(1)}%)`);
  console.log(`Crashed:          ${allResults.filter((r) => r.error).length}`);
  console.log(`Results saved:    ${resultsFile}`);
  console.log(`${"═".repeat(60)}`);
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
