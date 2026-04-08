# EnterpriseOps-Gym — Pi Coding Agent Challenge

> **Thesis:** A coding agent with 3 tools (read/write/bash) can solve enterprise tasks designed for 512 MCP tools — by writing code instead of calling tools.

---

## What This Project Is

We're running ServiceNow's [EnterpriseOps-Gym](https://github.com/ServiceNow/EnterpriseOps-Gym) benchmark with a Pi coding agent to prove that coding agents don't need MCP. The benchmark gives agents 512 specialized MCP tools across 8 enterprise domains. We give our agent bash.

**If a generic coding agent with zero domain-specific tooling matches or beats purpose-built MCP agents on enterprise tasks, that validates the entire Coding Agent Thesis.**

### The Three Principles Being Tested

| # | Principle | How It Applies Here |
|---|---|---|
| 1 | **Code over specialized tools** | 3 tools (read/write/bash) vs 512 MCP tools |
| 2 | **CLI over MCP** | Agent writes scripts / curls endpoints instead of calling MCP |
| 3 | **Pre-indexed context over runtime discovery** | Pre-built schema index of 164 tables instead of runtime exploration |

---

## The Benchmark

| Fact | Detail |
|---|---|
| **Paper** | [arXiv:2603.13594](https://arxiv.org/abs/2603.13594) |
| **From** | ServiceNow AI Research + Mila (Montreal) |
| **Tasks** | 1,150 expert-curated across 8 enterprise domains |
| **Tools** | 512 MCP tools across 8 domain servers |
| **Database** | 164 PostgreSQL tables with avg 1.7 FK dependencies per table |
| **Avg steps** | 9.15 per task (up to 34 sequential steps) |
| **Avg context** | 89K tokens per task |
| **Verification** | SQL-based — checks final DB state, not action traces |
| **Best score** | Claude Opus 4.6 = 45.9% (oracle mode) |
| **License** | CC BY-NC 4.0 (non-commercial, academic only) |
| **GitHub** | [ServiceNow/EnterpriseOps-Gym](https://github.com/ServiceNow/EnterpriseOps-Gym) |
| **Dataset** | [HuggingFace: ServiceNow-AI/EnterpriseOps-Gym](https://huggingface.co/datasets/ServiceNow-AI/EnterpriseOps-Gym) |
| **Website** | [enterpriseops-gym.github.io](https://enterpriseops-gym.github.io/) |

### Domains

| Domain | Port | Tasks (oracle) | What agents do |
|---|---|---|---|
| Calendar | 8003 | 61 | Schedule meetings, manage events, check availability |
| CSM (Customer Service) | 8001 | 103 | Create/update tickets, manage cases, customer records |
| Drive | 8009 | 64 | File management, folder operations, sharing permissions |
| Email | 8004 | 67 | Send/read emails, manage mailboxes, attachments |
| HR | 8008 | 102 | Employee records, leave management, org structure |
| ITSM (IT Service Mgmt) | 8006 | 103 | Incident management, change requests, CMDB |
| Teams | 8002 | 61 | Channels, messages, team management |
| Hybrid | Multiple | 88 | Cross-domain tasks (e.g., resolve CSM ticket by checking HR records + updating Teams) |

### Leaderboard (Oracle Mode — Current Best)

| Model | Teams | CSM | Email | ITSM | Calendar | HR | Drive | Hybrid | **Avg** |
|---|---|---|---|---|---|---|---|---|---|
| Claude Opus 4.6 | 52.0 | 45.1 | 57.7 | 33.3 | 43.3 | 45.1 | 57.1 | 34.0 | **45.9** |
| Claude Sonnet 4.6 | 47.0 | 32.6 | 58.6 | 35.5 | 40.4 | 37.0 | 57.1 | 29.4 | **42.2** |
| Gemini-3.1-Pro | 46.0 | 46.7 | 47.1 | 32.8 | 40.4 | 10.9 | 55.2 | 30.1 | **38.7** |
| GPT-5 | 26.3 | 36.4 | 49.0 | 18.9 | 41.3 | 17.9 | 34.0 | 23.5 | **30.9** |

---

## Our Approach

### Architecture: Pre-Index + Code Agent (Same as DAB Win)

```
Phase 1: Pre-Index (run once per domain)
  ├── Connect to PostgreSQL
  ├── Map all tables, columns, types, FKs, constraints
  ├── Sample data (5 rows per table)
  ├── Read MCP tool list → generate concise CLI reference
  └── Output: domain-index.md per domain

Phase 2: Per-Task Agent Run
  ├── Read task description from HuggingFace dataset
  ├── Read domain-index.md (schema + tool summary)
  ├── Agent writes Python script that either:
  │     a. Queries/updates PostgreSQL directly (simple CRUD)
  │     b. Calls MCP endpoint via HTTP/curl (when business logic needed)
  │     c. Mix of both
  ├── Run script via bash
  ├── Read output, verify, iterate if errors
  └── Output: final DB state for SQL verifier

Phase 3: Score
  └── Run compute_score.py against results
```

### Key Insight: The SQL Verifier Doesn't Care HOW You Got There

The benchmark verifies outcomes by running SQL queries against the final database state. It checks:
- Were the right records created/updated/deleted?
- Are FK constraints satisfied?
- Are business rules met?

It does NOT check:
- Which MCP tools were called
- How many tool calls were made
- Whether the agent used the "correct" tool

**This means a Python script that writes SQL directly produces the same verified result as an agent that calls 15 MCP tools sequentially.**

### The Three Paths Per Task

| Path | When to use | Example |
|---|---|---|
| **Direct SQL** | Simple CRUD, data clearly maps to tables | `INSERT INTO tickets (title, priority) VALUES (...)` |
| **HTTP to MCP endpoint** | Business logic in MCP layer (validations, triggers, computed fields) | `curl http://localhost:8001/tools/create_ticket -d '{...}'` |
| **Hybrid** | Read via SQL (fast), write via MCP (safe) | Query DB to find records, then call MCP to update with business logic |

The agent decides per task which path is optimal. This is the coding agent advantage — it adapts the approach to the task, not the task to the tool.

---

## Setup

### Prerequisites

- **Docker Desktop** running (7 MCP server containers)
- **Python 3.11+** with uv
- **Pi SDK** (`npm install -g @mariozechner/pi-coding-agent`)
- ~20GB disk for Docker images + DB snapshots

### Step 1: Clone & Install Benchmark

```bash
git clone https://github.com/ServiceNow/EnterpriseOps-Gym.git
cd EnterpriseOps-Gym
uv sync --extra anthropic
cp -r conf.example/ conf/
unzip gym_dbs.zip
```

### Step 2: Start MCP Servers (Docker)

```bash
# Pull images
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-teams:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-csm:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-email:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-itsm:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-calendar:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-hr:latest
docker pull shivakrishnareddyma225/enterpriseops-gym-mcp-drive:latest

# Run containers
docker run -d -p 8002:8002 shivakrishnareddyma225/enterpriseops-gym-mcp-teams:latest
docker run -d -p 8001:8001 shivakrishnareddyma225/enterpriseops-gym-mcp-csm:latest
docker run -d -p 8004:8004 shivakrishnareddyma225/enterpriseops-gym-mcp-email:latest
docker run -d -p 8006:8006 shivakrishnareddyma225/enterpriseops-gym-mcp-itsm:latest
docker run -d -p 8003:8003 shivakrishnareddyma225/enterpriseops-gym-mcp-calendar:latest
docker run -d -p 8008:8008 shivakrishnareddyma225/enterpriseops-gym-mcp-hr:latest
docker run -d -p 8009:8009 shivakrishnareddyma225/enterpriseops-gym-mcp-drive:latest
```

### Step 3: LLM Config

Create `conf/llm/claude-opus.json`:
```json
{
    "llm_provider": "anthropic",
    "llm_model": "claude-opus-4-6",
    "llm_api_key": "<your-api-key>",
    "temperature": 0.0,
    "max_tokens": 16384
}
```

---

## Current Focus: Teams Domain (61 tasks, 70 MCP tools)

We're starting with Teams because it's the simplest domain with the fewest tasks. Once we nail it, we scale to the other 7 domains.

---

## Build Plan

### Phase 0: Recon ✅ DONE

What we learned:

| Finding | Detail |
|---|---|
| MCP protocol | JSON-RPC via `POST /mcp` with `x-database-id` header |
| DB is SQLite | Each MCP server uses isolated SQLite DBs, not PostgreSQL |
| Seed endpoint | `POST /api/seed-database` with `{database_id, sql_content}` |
| DB per task | Each task run gets a fresh DB seeded from a `.sql` snapshot |
| DB reuse | 61 teams tasks share only 13 DB snapshots (multiple tasks per DB) |
| No auth needed | `x-database-id` header is the only requirement, no tokens |
| Tool listing | `POST /mcp` with `{method: "tools/list"}` returns all 70 tools |
| 70 Teams tools | Auto-generated wrappers in `agent/servers/teams/` |

### Phase 1: Teams CLI + Infrastructure (CURRENT)

Three pieces to build:

| Component | File | What it does |
|---|---|---|
| **HTTP client** | `src/client.ts` | `callTool(domain, tool, args)` → JSON-RPC to MCP server. Reads `$TEAMS_DB` for the `x-database-id` header. |
| **Teams CLI** | `src/teams-cli.ts` | Single CLI binary. `teams list-users --top 5` → calls `callTool("teams", "list_users", {_top:5})`. Agent uses this via bash. |
| **Task runner** | `src/task-runner.ts` | Per-task orchestrator: (1) read task config, (2) seed DB, (3) set `$TEAMS_DB`, (4) launch Pi agent with the question, (5) run verifier SQL. |

#### The Flow

```
Task Runner (per task)
│
├─ 1. Read task config (from HuggingFace dataset)
│     → gets: question, seed_database_file, verifier SQL
│
├─ 2. Seed the DB
│     → POST /api/seed-database with SQL content
│     → gets back: database_id (e.g. db_1712345678_abc123)
│
├─ 3. Export TEAMS_DB=db_1712345678_abc123
│
├─ 4. Launch Pi agent with the question
│     → Agent has: read, write, bash (+ teams CLI on PATH)
│     → Agent runs: teams list-users, teams create-team, etc.
│     → CLI reads $TEAMS_DB automatically
│
├─ 5. Agent finishes → run verifier SQL against same DB
│     → SQL checks final DB state
│     → pass/fail
│
└─ 6. Save result → next task
```

#### What the Agent Sees

The agent gets a system prompt with:
- The task question (e.g. "Create a private channel called 'Design Reviews' in the Engineering team")
- The Teams CLI reference (tool names, parameters, examples)
- bash tool to run CLI commands

The agent never knows about JSON-RPC, ports, headers, or DB IDs. It just types:
```bash
teams list-teams
teams create-channel --teamId team_eng_001 --displayName "Design Reviews" --membershipType private
```

### Phase 2: Run All 61 Teams Tasks

Score. Analyze failures. Iterate on the CLI and agent prompt.

### Phase 3: Scale to Other Domains

Repeat the CLI pattern for CSM, Email, ITSM, Calendar, HR, Drive. Each domain gets its own CLI.

### Phase 4: Blog Post

*"EnterpriseOps-Gym Gives Agents 512 MCP Tools. We Used 3."*

---

## Project Structure

```
C:\code\EnterpriseOps-Gym\
├── AGENTS.md                    ← This file
├── benchmark/                   ← Cloned ServiceNow repo
│   ├── evaluate.py
│   ├── compute_score.py
│   └── benchmark/
│       ├── executor.py          ← How they seed DBs & run tasks
│       └── mcp_client.py        ← create_database_from_file()
├── Domain Wise DBs and Task-DB Mappings/
│   └── teams/dbs/               ← 13 SQL snapshots for 61 tasks
├── gym_dbs.zip                  ← All domain DB snapshots
├── agent/                       ← Our Pi coding agent
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── client.ts            ← HTTP client: callTool() → MCP JSON-RPC
│   │   ├── teams-cli.ts         ← CLI binary: `teams list-users --top 5`
│   │   ├── task-runner.ts       ← Per-task: seed DB → launch agent → verify
│   │   └── ask-agent.ts         ← Interactive Q&A agent (dev tool)
│   └── servers/
│       └── teams/               ← 70 auto-generated tool wrappers
│           ├── index.ts
│           ├── README.md         ← CLI reference for the agent
│           ├── list_users.ts
│           ├── create_team.ts
│           └── ...
└── results/                     ← Output for scoring
```

---

## Success Criteria

| Target | Score | Meaning |
|---|---|---|
| Beat worst closed-source (GPT-5-Mini) | >22.9% | Coding agent is viable for enterprise |
| Match mid-tier (GPT-5) | >30.9% | Coding agent competes with MCP agents |
| Match Gemini-3.1-Pro | >38.7% | Coding agent is genuinely competitive |
| Match Claude Sonnet 4.6 | >42.2% | Coding agent matches top-tier MCP agents |
| Beat Claude Opus 4.6 | >45.9% | **Headline: "3 tools beat 512"** |

Even 30% would be a powerful result — a generic coding agent achieving 65% of what purpose-built MCP agents achieve, with zero domain-specific tooling.

---

## Connection to Thesis

This project is Step 5 in the [Coding Agent Thesis](C:\Source\Business\CODING_AGENT_THESIS.md) roadmap:

| Step | What | Status |
|---|---|---|
| 1 | DAB leaderboard #1 (62.6%) | ✅ Done, PR pending |
| 2 | Blog: "How We Beat the Data Agent Benchmark by 15%" | 🔜 Next |
| 3 | llm-kb: document KB without vector DB (600+ docs) | ✅ Done, v0.4.0 |
| 4 | "No More Claude Code" blog post | ✅ Done (355 views, 2 days) |
| **5** | **EnterpriseOps-Gym: 3 tools vs 512 MCP tools** | **🔵 THIS PROJECT** |
| 6 | Blog: "512 MCP Tools vs 3" | After #5 |

---

## Prior Art (Our DAB Win)

On UC Berkeley's Data Agent Benchmark, we used the exact same approach:
- **Their agent:** 4 constrained tools, runtime schema discovery
- **Our agent:** 3 tools (read/write/bash), pre-indexed schemas
- **Result:** 62.6% vs 54.3% (PromptQL) — #1 on leaderboard

The pre-indexing pattern and the "let the agent write code" pattern are proven. This project applies them to a harder, more enterprise-realistic benchmark.

DAB code: `C:\code\DataAgentBench\`
DAB plan: `C:\code\DataAgentBench\PLAN.md`

---

## Key Files in Benchmark Repo

| File | What |
|---|---|
| `evaluate.py` | Main evaluation script — runs agent against tasks |
| `compute_score.py` | Scores results against SQL verifiers |
| `ray_experiment_queue.py` | Parallel execution via Ray |
| `conf.example/` | Config templates (LLM, domain ports, experiments) |
| `gym_dbs.zip` | Seed database SQL snapshots per domain |
| `orchestrators/` | Agent orchestrators (react, planner_react, decomposing) |

---

## Machine Specs

| Resource | Available |
|---|---|
| RAM | 32 GB |
| CPU | Intel Ultra 7 258V |
| Disk free | ~43 GB (tight — run one domain at a time) |
| Docker | v29.0.1 (needs Docker Desktop started) |
| Python | 3.13.5 |
| uv | 0.8.8 |
| Node.js | Available (for Pi SDK agent) |

---

*Created April 7, 2026. DeltaXY.*
*"512 MCP tools cost 13,000 tokens each. Bash costs zero. The model already knows both. Only one scales."*
