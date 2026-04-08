# Agent Learnings

Runtime discoveries from running tasks. Each entry has what failed, why, and the fix.
This file is appended to the agent's system prompt so every run benefits.

---

## Known Server Bugs

### `create_virtual_event_townhall` — always crashes
- **Error:** `schemas.virtual_event_townhall.VirtualEventTownhallResponse() argument after ** must be a mapping, not NoneType`
- **Cause:** Bug in Docker image (`router.pyc`) — cannot be fixed
- **Action:** Skip this tool. Complete all other steps, then note the townhall creation is blocked by a known server bug.

---

## Parameter Gotchas

### Channel IDs — never assume, always look up
- **Wrong:** `--channelId "channel_techcorp_general"` (guessed)
- **Right:** Call `teams list-channels --teamId <id>` first, use the `id` from the response
- **Why:** Channel IDs are UUIDs like `2da4cc29dd784156a8903cc978016bd6`, not human-readable names

### `create_user` — passwordProfile needs forceChangePasswordNextSignIn
- **Wrong:** `--passwordProfile '{"password":"Test1234!"}'`
- **Right:** `--passwordProfile '{"password":"Test1234!","forceChangePasswordNextSignIn":false}'`
- **Why:** Server validates this field is present

### `create_team` — members array with owner is required
- **Wrong:** No members provided
- **Right:**
```bash
teams create-team \
  --template_odata_bind "https://graph.microsoft.com/v1.0/teamsTemplates('standard')" \
  --displayName "My Team" \
  --members '[{"_odata_type":"#microsoft.graph.aadUserConversationMember","roles":["owner"],"user_odata_bind":"https://graph.microsoft.com/v1.0/users('"'"'james.wilson'"'"')"}]'
```
- **Why:** Application permissions require at least one owner

### `create_channel` (private) — members need user_odata_bind not userId
- **Wrong:** `--members '[{"@odata.type":"...","userId":"alice.manager@techcorp.com"}]'`
- **Right:**
```bash
teams create-channel \
  --teamId "team_techcorp_001" \
  --displayName "Private Channel" \
  --membershipType "private" \
  --members '[{"_odata_type":"#microsoft.graph.aadUserConversationMember","roles":["owner"],"user_odata_bind":"https://graph.microsoft.com/v1.0/users('"'"'alice.johnson'"'"')"}]'
```
- **Why:** `user_odata_bind` is required, not `userId` or email. Use the user's `id` field (e.g. `alice.johnson`), not their email

### `create_call` — targets need correct identity format
- **Wrong:** `--targets '[{"identity":{"user":{"id":"alice.johnson"}}}]'`
- **Right:** Verify the exact identity format from `get_user` response first — use the `id` field
- **Why:** The verifier checks a `calls` table that only gets populated if the call was created with valid participant format

---

## Dependency Chains

Always resolve IDs before using them:

```bash
# Get team ID
teams list-teams | grep -A2 "TechCorp"

# Get channel ID (never assume)
teams list-channels --teamId <teamId>

# Get user ID (use id field, not email)
teams get-user --userPrincipalName alice.manager@techcorp.com | grep '"id"'

# Get chat ID
teams list-chats | grep <userId>
```

### `add_tabs_to_channels` / `add_tab_to_chat` — teamsApp_odata_bind needs real app ID
- **Wrong:** guessing `teamsApp_odata_bind` value
- **Right:** call `teams list-teams-apps` first to get the real app `id`, then build the URL:
```bash
# Step 1 — get available apps
teams list-teams-apps

# Step 2 — use the id to build teamsApp_odata_bind
teams add-tabs-to-channels \
  --teamId "team_techcorp_001" \
  --channelId "<real_channel_id>" \
  --displayName "Planner" \
  --teamsApp_odata_bind "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.planner"
```
- **Known app IDs in the DB:**

| App | ID | teamsApp_odata_bind |
|---|---|---|
| Planner | `com.microsoft.teamspace.tab.planner` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.planner` |
| SharePoint | `2a527703-1f6f-4559-a332-d8a7d288cd88` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/2a527703-1f6f-4559-a332-d8a7d288cd88` |
| OneNote | `0d820ecd-def2-4297-adad-78056cde7c79` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/0d820ecd-def2-4297-adad-78056cde7c79` |
| Power BI | `com.microsoft.teamspace.tab.powerbi` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.powerbi` |
| Website | `com.microsoft.teamspace.tab.web` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web` |
| Trello | `com.trello.tab` | `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.trello.tab` |

---

## Patterns That Work

### Creating a one-on-one chat
```bash
teams create-chat \
  --chatType "oneOnOne" \
  --members '[
    {"_odata_type":"#microsoft.graph.aadUserConversationMember","roles":["owner"],"user_odata_bind":"https://graph.microsoft.com/v1.0/users('"'"'james.wilson'"'"')"},
    {"_odata_type":"#microsoft.graph.aadUserConversationMember","roles":[],"user_odata_bind":"https://graph.microsoft.com/v1.0/users('"'"'bob.smith'"'"')"}
  ]'
```

### Sending a message
```bash
teams send-chat-message \
  --chatId "bob.smith_james.wilson" \
  --body '{"contentType":"text","content":"Hello Bob Smith, this is James Wilson..."}'
```

### Cancelling a virtual event
```bash
teams cancel-virtual-event-webinar --webinar_id "a57082a9-7629-4f74-8da0-8d621aab4d2d@4aa05bcc-1cac-4a83-a9ae-0db84b88f4ba"
teams cancel-virtual-event-townhall --townhall_id "bce9a3ca-a310-48fa-baf3-1cedcd04bb3f@4aa05bcc-1cac-4a83-a9ae-0db84b88f4ba"
```
