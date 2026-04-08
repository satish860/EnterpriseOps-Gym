# TEAMS Tools (70 total)

This is the reference manual for the `teams` CLI. All commands require `TEAMS_DB` to be set.

## How to use this file

Do NOT read the whole file. Instead:
1. Scan the **Tool Index** below to find the right tool
2. Use `grep` to look up parameters on demand:

```bash
grep -A 20 "^### \`create_channel\`" agent/servers/teams/README.md
```

## Quick start

```bash
# Seed a database for a task
export TEAMS_DB=$(teams seed --sql-file path/to/db.sql)

# Run any tool
teams list-users --_top 5
teams list-teams
teams get-user --userPrincipalName alice.manager@techcorp.com
teams create-channel --teamId team_techcorp_001 --displayName "Engineering"
teams send-chat-message --chatId chat_001 --body '{"contentType":"text","content":"Hello"}'
```

**CLI rule:** tool names use hyphens (`list-users`), parameters use `--` flags (`--teamId`). For object/array params pass JSON: `--body '{"content":"hi"}'`

## Tool Index

| Tool | What it does |
|---|---|
| `list_users` | List users in the organization |
| `create_user` | Create a new user |
| `get_user` | Get a user by ID or email |
| `update_user` | Update user properties |
| `delete_user` | Delete a user |
| `create_chat` | Create a one-on-one or group chat |
| `update_chat` | Update a chat topic |
| `list_chats` | List chats for the current user |
| `list_chat_messages` | List messages in a chat |
| `add_tab_to_chat` | Pin a tab to a chat |
| `send_chat_message` | Send a message in a chat |
| `soft_delete_chat_message` | Soft-delete a chat message |
| `undo_soft_delete_chat_message` | Restore a soft-deleted chat message |
| `update_chat_message` | Update a chat message |
| `set_chat_message_reaction` | React to a chat message |
| `unset_chat_message_reaction` | Remove a reaction from a chat message |
| `pin_chat_message` | Pin a message in a chat |
| `create_channel` | Create a channel in a team |
| `update_channel` | Update channel properties |
| `list_channels` | List channels in a team |
| `list_all_channels` | List all channels including shared |
| `get_primary_channel` | Get the General channel of a team |
| `add_channel_member` | Add a member to a channel |
| `archive_channel` | Archive a channel |
| `list_channel_messages` | List messages in a channel |
| `send_channel_message` | Send a message to a channel |
| `soft_delete_channel_message` | Soft-delete a channel message |
| `undo_soft_delete_channel_message` | Restore a soft-deleted channel message |
| `update_channel_message` | Update a channel message |
| `set_channel_message_reaction` | React to a channel message |
| `unset_channel_message_reaction` | Remove a reaction from a channel message |
| `get_files_folder` | Get the file storage folder for a channel |
| `list_tabs_in_channel` | List tabs in a channel |
| `add_tabs_to_channels` | Pin a tab to a channel |
| `provision_channel_email` | Provision email for a channel |
| `update_channel_tab` | Update a channel tab |
| `delete_channel_tab` | Remove a tab from a channel |
| `create_team` | Create a new team |
| `list_teams` | List all teams in the organization |
| `update_team` | Update team properties |
| `delete_team` | Delete a team |
| `list_team_members` | List members of a team |
| `add_team_member` | Add a member to a team |
| `add_team_members_in_bulk` | Add multiple members to a team at once |
| `update_team_member` | Update a member's role in a team |
| `remove_team_member` | Remove a member from a team |
| `list_installed_apps` | List apps installed in a team |
| `create_teamwork_tag` | Create a tag in a team |
| `list_teamwork_tags` | List tags in a team |
| `update_teamwork_tag` | Update a tag |
| `create_teamwork_tag_member` | Add a user to a tag |
| `create_group` | Create a Microsoft 365 / security group |
| `list_groups` | List groups in the organization |
| `update_group` | Update group properties |
| `add_group_owner` | Add an owner to a group |
| `list_call_records` | List call records |
| `get_call_record` | Get a specific call record |
| `list_call_sessions` | List sessions in a call record |
| `create_call` | Create an outgoing call or join a meeting |
| `create_audio_routing_group` | Create an audio routing group for a call |
| `set_user_status_message` | Set a user's status message |
| `create_virtual_event_webinar` | Create a webinar (draft) |
| `get_virtual_event_webinar` | Get a webinar by ID |
| `list_virtual_event_webinars` | List all webinars |
| `publish_virtual_event_webinar` | Publish a webinar |
| `cancel_virtual_event_webinar` | Cancel a webinar |
| `create_virtual_event_townhall` | Create a townhall (draft) |
| `list_virtual_event_townhalls` | List all townhalls |
| `cancel_virtual_event_townhall` | Cancel a townhall |
| `list_teams_apps` | List apps in the Teams app catalog |

---

## Tool Details

_Grep for any tool name to see its parameters. Example:_
```bash
grep -A 20 "^### \`send_chat_message\`" agent/servers/teams/README.md
```

## Tools

### `list_users`
List users in the organization.

**Parameters:**
- `_top` (optional): Number of items to return (1-999)
- `_skip` (optional): Number of items to skip for pagination
- `_filter` (optional): OData filter expression. Supports: eq, ne, gt, lt, ge, le operators; startswith(
- `_orderby` (optional): OData orderby expression (e.g., "displayName asc" or "createdDateTime desc")
- `_select` (optional): Comma-separated list of properties to return (e.g., "displayName,mail,jobTitle")
- `_count` (optional): Include total count in response

```bash
teams list-users
```

### `create_user`
Create a new user in the organization.

**Parameters:**
- `userPrincipalName` (**required**): User principal name in email format (e.g., john.doe@contoso.com)
- `displayName` (**required**): Display name of the user
- `accountEnabled` (**required**): Whether the account is enabled
- `mailNickname` (**required**): Mail alias (mailNickname)
- `passwordProfile` (**required**): Password profile settings
- `givenName` (optional): Given name (first name)
- `surname` (optional): Surname (last name)
- `jobTitle` (optional): Job title
- `mail` (optional): Primary email address
- `businessPhones` (optional): Business phone numbers
- `mobilePhone` (optional): Mobile phone number
- `officeLocation` (optional): Office location
- `preferredLanguage` (optional): Preferred language code (e.g., en-US, fr-FR)
- `department` (optional): Department
- `companyName` (optional): Company name
- `usageLocation` (optional): Usage location (e.g., 'US')
- `city` (optional): City
- `state` (optional): State/Province
- `country` (optional): Country/Region
- `streetAddress` (optional): Street address
- `postalCode` (optional): Postal/ZIP code
- `employeeId` (optional): Employee identifier assigned by organization
- `employeeType` (optional): Worker type (e.g., Employee, Contractor, Consultant, Vendor)
- `userType` (optional): User classification (Member or Guest)
- `employeeHireDate` (optional): Hire date in ISO 8601 format (e.g., 2024-01-15T00:00:00Z)
- `otherMails` (optional): Additional email addresses (max 250 entries, 250 chars each)
- `aboutMe` (optional): Freeform text for user self-description
- `birthday` (optional): User's birthday in ISO 8601 format (e.g., 1990-05-15T00:00:00Z)
- `interests` (optional): List of user interests
- `skills` (optional): List of user skills
- `mySite` (optional): URL for user's personal website
- `preferredName` (optional): User's preferred name
- `faxNumber` (optional): Fax number
- `ageGroup` (optional): Age group classification
- `pastProjects` (optional): List of past projects
- `responsibilities` (optional): List of user responsibilities
- `schools` (optional): List of schools attended
- `employeeOrgData` (optional): Organization data (costCenter and division)

```bash
teams create-user --userPrincipalName "userPrincipalName_value" --displayName "displayName_value" --accountEnabled true --mailNickname "mailNickname_value" --passwordProfile 0
```

### `get_user`
Retrieve a specific user by their ID or userPrincipalName.

**Parameters:**
- `userId` (optional): User identifier (UUID format). Either 'userId' or 'userPrincipalName' must be pr
- `userPrincipalName` (optional): User principal name in email format (e.g., 'alice.manager@techcorp.com'). Either
- `_select` (optional): Comma-separated list of properties to return (e.g., "displayName,mail,jobTitle")

```bash
teams get-user
```

### `update_user`
Update user properties.

**Parameters:**
- `userId` (optional): User identifier - accepts either user ID (UUID) or userPrincipalName (e.g., 'ali
- `userPrincipalName` (optional): User principal name in email format (e.g., 'alice.manager@techcorp.com'). Can be
- `displayName` (optional): Display name of the user
- `givenName` (optional): Given name (first name) - omit or use empty string to clear
- `surname` (optional): Surname (last name) - omit or use empty string to clear
- `jobTitle` (optional): Job title - omit or use empty string to clear
- `mail` (optional): Primary email address - omit or use empty string to clear
- `businessPhones` (optional): Business phone numbers - omit or use empty array to clear
- `mobilePhone` (optional): Mobile phone number - omit or use empty string to clear
- `officeLocation` (optional): Office location - omit or use empty string to clear
- `preferredLanguage` (optional): Preferred language code - omit or use empty string to clear
- `accountEnabled` (optional): Account enabled state (true/false). Omit to leave unchanged.
- `mailNickname` (optional): Mail alias (mailNickname) - omit or use empty string to clear
- `department` (optional): Department - omit or use empty string to clear
- `companyName` (optional): Company name - omit or use empty string to clear
- `usageLocation` (optional): Usage location (e.g., 'US') - omit or use empty string to clear
- `city` (optional): City - omit or use empty string to clear
- `state` (optional): State/Province - omit or use empty string to clear
- `country` (optional): Country/Region - omit or use empty string to clear
- `streetAddress` (optional): Street address - omit or use empty string to clear
- `postalCode` (optional): Postal/ZIP code - omit or use empty string to clear
- `employeeId` (optional): Employee identifier - omit or use empty string to clear
- `employeeType` (optional): Worker type - omit or use empty string to clear
- `userType` (optional): User classification (Member or Guest) - omit to leave unchanged. Note: Cannot be
- `employeeHireDate` (optional): Hire date - omit or use empty string to clear
- `otherMails` (optional): Additional email addresses - omit or use empty array to clear
- `aboutMe` (optional): Self-description - omit or use empty string to clear
- `birthday` (optional): Birthday - omit or use empty string to clear
- `interests` (optional): Interests - omit or use empty array to clear
- `skills` (optional): Skills - omit or use empty array to clear
- `mySite` (optional): Personal website - omit or use empty string to clear
- `preferredName` (optional): Preferred name - omit or use empty string to clear
- `faxNumber` (optional): Fax number - omit or use empty string to clear
- `ageGroup` (optional): Age group classification - omit to leave unchanged
- `isResourceAccount` (optional): Resource account flag - omit to leave unchanged
- `pastProjects` (optional): Past projects - omit or use empty array to clear
- `responsibilities` (optional): Responsibilities - omit or use empty array to clear
- `schools` (optional): Schools attended - omit or use empty array to clear
- `employeeOrgData` (optional): Organization data - omit to leave unchanged, provide empty object {} to clear

```bash
teams update-user
```

### `delete_user`
Delete a user by ID or userPrincipalName.

**Parameters:**
- `userId` (optional): User identifier (UUID format). Either 'userId' or 'userPrincipalName' must be pr
- `userPrincipalName` (optional): User principal name in email format (e.g., 'alice.manager@techcorp.com'). Either

```bash
teams delete-user
```

### `create_chat`
Create a new chat (one-on-one or group) following Microsoft Graph API v1.0 specification.

**Parameters:**
- `chatType` (**required**): Type of chat to create: 'oneOnOne' or 'group'
- `topic` (optional): Chat topic/title. Optional for oneOnOne (must be null), required for group chats
- `members` (**required**): List of conversation members. Each member must include _odata_type, roles, and u
- `installedApps` (optional): Apps to install in the chat during creation (optional)

```bash
teams create-chat --chatType "chatType_value" --members []
```

### `update_chat`
Update a chat's properties (currently only topic is supported). Only group chats can be updated.

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `topic` (**required**): Chat topic/title to update

```bash
teams update-chat --chatId "chatId_value" --topic "topic_value"
```

### `list_chats`
List chats for the authenticated user (Microsoft Graph API compliant).

**Parameters:**
- `_expand` (optional): Expand related entities. Currently supports 'members' and 'lastMessagePreview' p
- `_top` (optional): Controls the number of items per response. Maximum allowed $top value is 50 per 
- `_filter` (optional): Filters results. OData filter expression for filtering chat results.
- `_orderby` (optional): Sort order. Currently supports 'lastMessagePreview/createdDateTime desc' only. A

```bash
teams list-chats
```

### `list_chat_messages`
List messages in a chat (Microsoft Graph API compliant).

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `userId` (optional): User identifier (user ID or user principal name). REQUIRED for application permi
- `_top` (optional): Controls the number of items per response. Maximum allowed value is 50 per Micro
- `_orderby` (optional): Sort order. ONLY supports 'lastModifiedDateTime desc' (default) or 'createdDateT
- `_filter` (optional): Date range filter. MUST match the property in _orderby parameter. Format: 'lastM

```bash
teams list-chat-messages --chatId "chatId_value"
```

### `add_tab_to_chat`
Add (pin) a tab to the specified chat.

**Parameters:**
- `chatId` (**required**): Unique chat identifier where the tab will be added
- `displayName` (**required**): Name of the tab
- `teamsApp_odata_bind` (**required**): Teams app reference. Must be full Microsoft Graph URL: https://graph.microsoft.c
- `configuration` (optional): Container for custom settings applied to a tab

```bash
teams add-tab-to-chat --chatId "chatId_value" --displayName "displayName_value" --teamsApp_odata_bind "teamsApp_odata_bind_value"
```

### `send_chat_message`
Send a new message in a chat (Microsoft Graph API compliant). API Endpoint: POST /chats/{chat_id}/messages.

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `body` (**required**): Message body content (required). Plaintext/HTML representation of the content of
- `replyToId` (optional): Read-only. ID of the parent chat message or root chat message of the thread. (On
- `subject` (optional): Subject of the message, in plaintext (optional)
- `summary` (optional): Summary text of the chat message that could be used for push notifications and s
- `importance` (optional): The importance of the chat message. The possible values are: normal, high, urgen
- `locale` (optional): Locale of the chat message set by the client. Always set to en-us.
- `attachments` (optional): References to attached objects like files, tabs, meetings etc.
- `mentions` (optional): List of entities mentioned in the chat message. Supported entities are: user, bo
- `channelIdentity` (optional): If the message was sent in a channel, represents identity of the channel. This p
- `policyViolation` (optional): Defines the properties of a policy violation set by a data loss prevention (DLP)
- `messageType` (optional): The type of chat message. The possible values are: message, chatEvent, typing, u

```bash
teams send-chat-message --chatId "chatId_value" --body 0
```

### `soft_delete_chat_message`
Delete a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}/chats/{chatsId

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): Unique message identifier to soft delete

```bash
teams soft-delete-chat-message --chatId "chatId_value" --messageId "messageId_value"
```

### `undo_soft_delete_chat_message`
Undo soft deletion of a single chatMessage in a chat (Microsoft Graph API compliant). API Endpoint: POST /users/{userId}

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): Unique message identifier to restore

```bash
teams undo-soft-delete-chat-message --chatId "chatId_value" --messageId "messageId_value"
```

### `update_chat_message`
Update a chat message (Microsoft Graph API compliant). API Endpoint: PATCH /chats/{chat_id}/messages/{message_id}.

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): Unique message identifier to update
- `body` (optional): Updated message body content
- `subject` (optional): Updated subject of the message
- `importance` (optional): Updated importance level of the message
- `attachments` (optional): Updated file attachments
- `mentions` (optional): Updated user mentions in the message
- `reactions` (optional): Updated message reactions
- `messageHistory` (optional): Updated message edit history
- `policyViolation` (optional): ONLY application permissions (Chat.UpdatePolicyViolation.All) can update this pr

```bash
teams update-chat-message --chatId "chatId_value" --messageId "messageId_value"
```

### `set_chat_message_reaction`
Set a reaction to a chat message (Microsoft Graph API compliant).

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): Unique message identifier to react to
- `reactionType` (**required**): The reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡')

```bash
teams set-chat-message-reaction --chatId "chatId_value" --messageId "messageId_value" --reactionType "reactionType_value"
```

### `unset_chat_message_reaction`
Unset a reaction from a chat message (Microsoft Graph API compliant).

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): Unique message identifier to remove reaction from
- `reactionType` (**required**): The reaction type as unicode to remove (e.g., '💘', '👍', '❤️', '😂', '😮', '😢'

```bash
teams unset-chat-message-reaction --chatId "chatId_value" --messageId "messageId_value" --reactionType "reactionType_value"
```

### `pin_chat_message`
Pin a message in a chat (Microsoft Graph API compliant).

**Parameters:**
- `chatId` (**required**): Unique chat identifier
- `messageId` (**required**): The unique identifier of the message to pin

```bash
teams pin-chat-message --chatId "chatId_value" --messageId "messageId_value"
```

### `create_channel`
Create a new channel in a team. API Endpoint: POST /teams/{team-id}/channels

**Parameters:**
- `teamId` (**required**): Unique team identifier where the channel will be created
- `displayName` (**required**): Channel display name
- `description` (optional): Channel description (optional)
- `membershipType` (optional): Channel membership type
- `members` (optional): Initial channel members (required for private/shared channels)
- `isFavoriteByDefault` (optional): Whether channel is favorite by default
- `_microsoft_graph_channelCreationMode` (optional): Special creation mode for data migration. When specified, createdDateTime can be

```bash
teams create-channel --teamId "teamId_value" --displayName "displayName_value"
```

### `update_channel`
Update a channel's properties. API Endpoint: PATCH /teams/{team-id}/channels/{channel-id}

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `displayName` (optional): Updated channel display name
- `description` (optional): Updated channel description
- `isFavoriteByDefault` (optional): Updated favorite by default setting

```bash
teams update-channel --teamId "teamId_value" --channelId "channelId_value"
```

### `list_channels`
Retrieve the list of channels in a team (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier (must be a team where the user is a member)
- `_filter` (optional): OData filter expression. Examples: 'membershipType eq \'private\'', 'membershipT
- `_select` (optional): Comma-separated list of properties to return for performance optimization. Recom

```bash
teams list-channels --teamId "teamId_value"
```

### `list_all_channels`
Get the list of channels either in this team or shared with this team (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier (use team_techcorp_001 or team_globalex_002 for sample da
- `_filter` (optional): OData filter expression for membershipType filtering
- `_select` (optional): Comma-separated list of properties to return for performance optimization. Recom

```bash
teams list-all-channels --teamId "teamId_value"
```

### `get_primary_channel`
Get the primary channel (General channel) for a team (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier (must be a team where the user is a member or user has ad
- `_filter` (optional): OData filter expression. Examples: 'membershipType eq \'standard\'', 'membership
- `_select` (optional): Comma-separated list of properties to return for better performance. Use this to
- `_expand` (optional): OData expand expression to include related entities

```bash
teams get-primary-channel --teamId "teamId_value"
```

### `add_channel_member`
Add a member to a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `_odata_type` (optional): OData type indicator
- `user_odata_bind` (**required**): OData bind URL for the user. Format: 'https://graph.microsoft.com/v1.0/users('{u
- `roles` (optional): The role for the user. Must be 'owner' or empty.

```bash
teams add-channel-member --teamId "teamId_value" --channelId "channelId_value" --user_odata_bind "user_odata_bind_value"
```

### `archive_channel`
Archive a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier to archive

```bash
teams archive-channel --teamId "teamId_value" --channelId "channelId_value"
```

### `list_channel_messages`
List messages in a channel. API Endpoint: GET /teams/{team-id}/channels/{channel-id}/messages

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `_top` (optional): Number of messages to return
- `_expand` (optional): OData expand parameter to include related entities (e.g., 'replies' to include m

```bash
teams list-channel-messages --teamId "teamId_value" --channelId "channelId_value"
```

### `send_channel_message`
Send a new chatMessage in the specified channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `body` (**required**): The message body content (MANDATORY property - only required field per Microsoft
- `subject` (optional): Optional subject line for the message
- `attachments` (optional): Optional message attachments
- `mentions` (optional): Users mentioned in the message
- `importance` (optional): Message importance level

```bash
teams send-channel-message --teamId "teamId_value" --channelId "channelId_value" --body 0
```

### `soft_delete_channel_message`
Delete a single chatMessage or reply in a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `messageId` (**required**): Unique message identifier to soft delete
- `replyId` (optional): Optional reply identifier (for soft deleting a specific reply to a message)

```bash
teams soft-delete-channel-message --teamId "teamId_value" --channelId "channelId_value" --messageId "messageId_value"
```

### `undo_soft_delete_channel_message`
Undo soft deletion of a single chatMessage or reply in a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `messageId` (**required**): Unique message identifier to restore
- `replyId` (optional): Optional reply identifier (for restoring a specific reply to a message)

```bash
teams undo-soft-delete-channel-message --teamId "teamId_value" --channelId "channelId_value" --messageId "messageId_value"
```

### `update_channel_message`
Update a chatMessage in a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `messageId` (**required**): Unique message identifier to update
- `replyId` (optional): Optional reply identifier to update a specific reply to a message
- `model` (optional): Payment model for licensing (evaluation mode used if not specified). Only suppor
- `messageType` (optional): The type of chat message
- `subject` (optional): The subject line of the chat message (can be null)
- `summary` (optional): Summary text of the chat message that could be used for push notifications and s
- `importance` (optional): The importance of the chat message
- `locale` (optional): Locale of the chat message set by the client (e.g., 'en-us')
- `from` (optional): Details of the sender of the chat message (read-only during updates)
- `body` (optional): Updated message body content (OPTIONAL - only provide if updating message body. 
- `attachments` (optional): References to attached objects like files, tabs, meetings etc.
- `mentions` (optional): List of entities mentioned in the chat message
- `reactions` (optional): Reactions for this chat message (for example, Like)
- `messageHistory` (optional): List of activity history of a message item
- `policyViolation` (optional): Defines the properties of a policy violation set by a data loss prevention (DLP)

```bash
teams update-channel-message --teamId "teamId_value" --channelId "channelId_value" --messageId "messageId_value"
```

### `set_channel_message_reaction`
Set a reaction to a channel message or reply (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `messageId` (**required**): Unique message identifier
- `replyId` (optional): Optional reply identifier (for setting reaction on a reply)
- `reactionType` (**required**): Reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡')

```bash
teams set-channel-message-reaction --teamId "teamId_value" --channelId "channelId_value" --messageId "messageId_value" --reactionType "reactionType_value"
```

### `unset_channel_message_reaction`
Unset a reaction from a channel message or reply (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `messageId` (**required**): Unique message identifier
- `replyId` (optional): Optional reply identifier (for unsetting reaction from a reply)
- `reactionType` (**required**): Reaction type as unicode (e.g., '💘', '👍', '❤️', '😂', '😮', '😢', '😡')

```bash
teams unset-channel-message-reaction --teamId "teamId_value" --channelId "channelId_value" --messageId "messageId_value" --reactionType "reactionType_value"
```

### `get_files_folder`
Get the metadata for the location where the files of a channel are stored (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier

```bash
teams get-files-folder --teamId "teamId_value" --channelId "channelId_value"
```

### `list_tabs_in_channel`
Retrieve the list of tabs in the specified channel within a team (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `_filter` (optional): OData filter expression (e.g., 'teamsApp/id eq \'com.microsoft.teamspace.tab.wik
- `_select` (optional): Comma-separated list of properties to return
- `_expand` (optional): OData expand expression (e.g., 'teamsApp' to include app details)

```bash
teams list-tabs-in-channel --teamId "teamId_value" --channelId "channelId_value"
```

### `add_tabs_to_channels`
Add (pin) a tab to the specified channel within a team (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier where the tab will be added
- `channelId` (**required**): Unique channel identifier where the tab will be pinned
- `displayName` (**required**): Name of the tab as it will appear to users in Microsoft Teams
- `teamsApp_odata_bind` (**required**): OData bind URL for the Teams app to pin as a tab. Format: 'https://graph.microso
- `configuration` (optional): Container for custom settings applied to a tab (required for configurable tabs)

```bash
teams add-tabs-to-channels --teamId "teamId_value" --channelId "channelId_value" --displayName "displayName_value" --teamsApp_odata_bind "teamsApp_odata_bind_value"
```

### `provision_channel_email`
Provision an email address for a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier for which to provision email

```bash
teams provision-channel-email --teamId "teamId_value" --channelId "channelId_value"
```

### `update_channel_tab`
Update the properties of a tab in a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `tabId` (**required**): Unique tab identifier to update
- `displayName` (optional): Updated tab display name (1-128 characters)
- `configuration` (optional): Updated tab configuration settings

```bash
teams update-channel-tab --teamId "teamId_value" --channelId "channelId_value" --tabId "tabId_value"
```

### `delete_channel_tab`
Remove (unpin) a tab from a channel (Microsoft Graph API compliant).

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `channelId` (**required**): Unique channel identifier
- `tabId` (**required**): Unique tab identifier to delete

```bash
teams delete-channel-tab --teamId "teamId_value" --channelId "channelId_value" --tabId "tabId_value"
```

### `create_team`
Create a new team following MS Graph API v1.0. Two creation methods: 1) Create team with new group (requires template_od

**Parameters:**
- `template_odata_bind` (**required**): REQUIRED. Template reference (e.g., 'https://graph.microsoft.com/v1.0/teamsTempl
- `group_odata_bind` (optional): OPTIONAL. Group reference for creating team from existing group (e.g., 'https://
- `members` (optional): REQUIRED for Application permissions, OPTIONAL for Delegated permissions. Member
- `displayName` (optional): REQUIRED when creating new group (no group_odata_bind). Team display name.
- `description` (optional): Team description (optional)
- `classification` (optional): OPTIONAL. An optional label. Typically describes the data or business sensitivit
- `tenantId` (optional): OPTIONAL. Tenant identifier. If not provided, will be auto-fetched from the orga
- `visibility` (optional): Team visibility
- `specialization` (optional): Team specialization
- `createdDateTime` (optional): OPTIONAL. Timestamp at which the team was created. Used only in migration mode (
- `_microsoft_graph_teamCreationMode` (optional): OPTIONAL. Indicates that the team is in migration state and is currently being u
- `classSettings` (optional): OPTIONAL. Configure settings of a class. Available only when the team represents
- `firstChannelName` (optional): Name for the first channel of the team
- `channels` (optional): Channels to create with the team
- `installedApps` (optional): Apps to install in the team
- `memberSettings` (optional): Member settings for the team
- `guestSettings` (optional): Guest settings for the team
- `messagingSettings` (optional): Messaging settings for the team
- `funSettings` (optional): Fun settings for the team
- `discoverySettings` (optional): Discovery settings for the team

```bash
teams create-team --template_odata_bind "template_odata_bind_value"
```

### `list_teams`
List all teams in an organization following Microsoft Graph API v1.0. Supports OData query parameters: $filter, $select,

**Parameters:**
- `_top` (optional): Number of items to return (max 1000)
- `_skiptoken` (optional): Pagination token for retrieving the next page of results
- `_filter` (optional): OData filter expression to filter teams. Examples: "startswith(displayName, 'A')
- `_select` (optional): Comma-separated list of properties to return. By default returns id, displayName
- `_count` (optional): Include count of total items in the response

```bash
teams list-teams
```

### `update_team`
Update team properties. API Endpoint: PATCH /teams/{team-id}

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `displayName` (optional): Updated team display name
- `description` (optional): Updated team description
- `visibility` (optional): Updated team visibility
- `specialization` (optional): Updated team specialization
- `memberSettings` (optional): Updated member settings for the team
- `guestSettings` (optional): Updated guest settings for the team
- `messagingSettings` (optional): Updated messaging settings for the team
- `funSettings` (optional): Updated fun settings for the team
- `discoverySettings` (optional): Updated discovery settings for the team

```bash
teams update-team --teamId "teamId_value"
```

### `delete_team`
Delete a team (and its associated Microsoft 365 group). API Endpoint: DELETE /groups/{group-id}

**Parameters:**
- `teamId` (**required**): Unique team identifier (same as group ID)

```bash
teams delete-team --teamId "teamId_value"
```

### `list_team_members`
List members of a team following Microsoft Graph API v1.0. This method supports the _filter, _select, and _top OData que

**Parameters:**
- `teamId` (**required**): REQUIRED. Unique team identifier
- `_filter` (optional): OPTIONAL. OData filter expression to filter team members. Examples: "(microsoft.
- `_select` (optional): OPTIONAL. Comma-separated list of properties to return. Examples: 'id,roles,disp
- `_top` (optional): OPTIONAL. Number of items per response (default 50, max 999)

```bash
teams list-team-members --teamId "teamId_value"
```

### `add_team_member`
Add a member to a team. API Endpoint: POST /teams/{team-id}/members

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `_odata_type` (optional): OData type identifier
- `roles` (optional): Member roles in the team
- `user_odata_bind` (**required**): User reference (e.g., 'https://graph.microsoft.com/v1.0/users('user-id')')
- `visibleHistoryStartDateTime` (optional): Timestamp denoting how far back a conversation's history is shared with the memb

```bash
teams add-team-member --teamId "teamId_value" --user_odata_bind "user_odata_bind_value"
```

### `add_team_members_in_bulk`
Add multiple members to a team in bulk. API Endpoint: POST /teams/{team-id}/members/add

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `values` (**required**): List of members to add

```bash
teams add-team-members-in-bulk --teamId "teamId_value" --values []
```

### `update_team_member`
Update a team member's roles. API Endpoint: PATCH /teams/{team-id}/members/{membership-id}

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `membershipId` (**required**): Unique membership identifier
- `roles` (**required**): Updated member roles in the team

```bash
teams update-team-member --teamId "teamId_value" --membershipId "membershipId_value" --roles []
```

### `remove_team_member`
Remove a member from a team. API Endpoint: DELETE /teams/{team-id}/members/{membership-id}

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `membershipId` (**required**): Unique membership identifier

```bash
teams remove-team-member --teamId "teamId_value" --membershipId "membershipId_value"
```

### `list_installed_apps`
Retrieve the list of apps installed in the specified team. Supports OData query parameters for filtering, expanding, and

**Parameters:**
- `teamId` (**required**): Unique team identifier
- `_expand` (optional): Expand related entities. Use 'teamsAppDefinition' to get app version details, 't
- `_filter` (optional): Filter results by app external ID (manifest ID). Use format: teamsApp/externalId
- `_select` (optional): Select specific fields to return. Useful for getting resource-specific permissio

```bash
teams list-installed-apps --teamId "teamId_value"
```

### `create_teamwork_tag`
Create a new teamworkTag. API Endpoint: POST /teams/{team_id}/tags

**Parameters:**
- `team_id` (**required**): ID of the team in which the tag is defined
- `displayName` (**required**): The name of the tag (max 40 characters)
- `description` (optional): Optional description of the tag
- `members` (optional): Members assigned to the tag (max 25 members)

```bash
teams create-teamwork-tag --team_id "team_id_value" --displayName "displayName_value"
```

### `list_teamwork_tags`
List all teamworkTags. API Endpoint: GET /teams/{team_id}/tags. Supports OData query parameters for filtering and pagina

**Parameters:**
- `team_id` (**required**): ID of the team to list tags from
- `_filter` (optional): OData $filter query parameter (e.g., "tagType eq 'standard'")
- `_top` (optional): OData $top query parameter - number of items to return

```bash
teams list-teamwork-tags --team_id "team_id_value"
```

### `update_teamwork_tag`
Update a teamworkTag. API Endpoint: PATCH /teams/{team_id}/tags/{tag_id}

**Parameters:**
- `team_id` (**required**): ID of the team containing the tag
- `tag_id` (**required**): Unique teamworkTag identifier
- `displayName` (optional): Updated name of the tag (max 40 characters)
- `description` (optional): Updated description of the tag
- `members` (optional): Updated members list (max 25 members)

```bash
teams update-teamwork-tag --team_id "team_id_value" --tag_id "tag_id_value"
```

### `create_teamwork_tag_member`
Create a new teamworkTagMember - add a user to a teamwork tag. API Endpoint: POST /teams/{team_id}/tags/{tag_id}/members

**Parameters:**
- `team_id` (**required**): ID of the team containing the tag
- `tag_id` (**required**): ID of the teamwork tag to add member to
- `userId` (**required**): The unique identifier for the member of the team

```bash
teams create-teamwork-tag-member --team_id "team_id_value" --tag_id "tag_id_value" --userId "userId_value"
```

### `create_group`
Create a new group following MS Graph API v1.0. Creates a Microsoft Entra group which can be a Microsoft 365 group, a se

**Parameters:**
- `displayName` (**required**): REQUIRED. The name to display in the address book for the group. Maximum length:
- `mailEnabled` (**required**): REQUIRED. Set to true for mail-enabled groups. Required.
- `mailNickname` (**required**): REQUIRED. The mail alias for the group, unique for Microsoft 365 groups in the o
- `securityEnabled` (**required**): REQUIRED. Set to true for security-enabled groups, including Microsoft 365 group
- `description` (optional): OPTIONAL. An optional description for the group.
- `groupTypes` (optional): OPTIONAL. Specifies the group type and its membership. If the collection contain
- `visibility` (optional): OPTIONAL. Specifies the group join policy and group content visibility for group
- `classification` (optional): OPTIONAL. Describes a classification for the group (such as low, medium or high 
- `assignedLabels` (optional): OPTIONAL. The list of sensitivity label pairs (label ID, label name) associated 
- `membershipRule` (optional): OPTIONAL. The rule that determines members for this group if the group is a dyna
- `membershipRuleProcessingState` (optional): OPTIONAL. Indicates whether the dynamic membership processing is on or paused. P
- `isAssignableToRole` (optional): OPTIONAL. Indicates whether this group can be assigned to a Microsoft Entra role
- `isManagementRestricted` (optional): OPTIONAL. Indicates whether the group is a member of a restricted management adm
- `preferredDataLocation` (optional): OPTIONAL. The preferred data location for the Microsoft 365 group. By default, t
- `preferredLanguage` (optional): OPTIONAL. The preferred language for a Microsoft 365 group. Should follow ISO 63
- `resourceBehaviorOptions` (optional): OPTIONAL. Specifies the group behaviors that can be set for a Microsoft 365 grou
- `resourceProvisioningOptions` (optional): OPTIONAL. Specifies the group resources that are associated with the Microsoft 3
- `theme` (optional): OPTIONAL. Specifies a Microsoft 365 group's color theme. Possible values are Tea
- `owners_odata_bind` (optional): OPTIONAL. List of owner references in OData format. Format: ['https://graph.micr
- `members_odata_bind` (optional): OPTIONAL. List of member references in OData format. Format: ['https://graph.mic

```bash
teams create-group --displayName "displayName_value" --mailEnabled true --mailNickname "mailNickname_value" --securityEnabled true
```

### `list_groups`
List groups in the organization. Per Microsoft Graph API documentation: Supports _count, _expand, _filter, _orderby, _se

**Parameters:**
- `_top` (optional): OPTIONAL. Number of items per response (max 999, default 100)
- `_filter` (optional): OPTIONAL. OData filter expression. Examples: "displayName eq 'Marketing'", "secu
- `_select` (optional): OPTIONAL. Comma-separated list of properties to return. Schema extensions are re
- `_orderby` (optional): OPTIONAL. Order results by properties. Examples: 'displayName asc', 'createdDate
- `_search` (optional): OPTIONAL. Search query. Supports tokenization only on displayName and descriptio
- `_count` (optional): OPTIONAL. Include count of total matching results in response
- `_expand` (optional): OPTIONAL. Expand related entities. Open extensions are returned only with _expan

```bash
teams list-groups
```

### `update_group`
Update group properties. Only updates the properties provided in the request. API Endpoint: PATCH /groups/{id}

**Parameters:**
- `groupId` (**required**): REQUIRED. Unique group identifier
- `allowExternalSenders` (optional): OPTIONAL. Default is false. Indicates whether people external to the organizatio
- `assignedLabels` (optional): OPTIONAL. The list of sensitivity label pairs (label ID, label name) associated 
- `autoSubscribeNewMembers` (optional): OPTIONAL. Default is false. Indicates whether new members added to the group wil
- `description` (optional): OPTIONAL. An optional description for the group.
- `displayName` (optional): OPTIONAL. The display name for the group. This property is required when a group
- `mailNickname` (optional): OPTIONAL. The mail alias for the group, unique for Microsoft 365 groups in the o
- `preferredDataLocation` (optional): OPTIONAL. The preferred data location for the Microsoft 365 group. To update thi
- `securityEnabled` (optional): OPTIONAL. Specifies whether the group is a security group.
- `uniqueName` (optional): OPTIONAL. The unique identifier that can be assigned to a group and used as an a
- `visibility` (optional): OPTIONAL. Specifies the visibility of a Microsoft 365 group. The possible values

```bash
teams update-group --groupId "groupId_value"
```

### `add_group_owner`
Add an owner to a group. Returns 204 No Content on success. API Endpoint: POST /groups/{id}/owners/$ref

**Parameters:**
- `groupId` (**required**): REQUIRED. Unique group identifier
- `_odata_id` (**required**): REQUIRED. OData reference to the owner user (e.g., 'https://graph.microsoft.com/

```bash
teams add-group-owner --groupId "groupId_value" --_odata_id "_odata_id_value"
```

### `list_call_records`
Get the list of callRecord objects and their properties.

**Parameters:**
- `_filter` (optional): Filter query parameter. Supported filters:
- `_select` (optional): Select specific properties to return.

```bash
teams list-call-records
```

### `get_call_record`
Retrieve the properties and relationships of a callRecord object.

**Parameters:**
- `id` (**required**): The unique identifier of the call record to retrieve
- `_select` (optional): Select specific properties to return.
- `_expand` (optional): Expand relationships to include in the response.

```bash
teams get-call-record --id "id_value"
```

### `list_call_sessions`
Retrieve the list of sessions associated with a callRecord object.

**Parameters:**
- `id` (**required**): The unique identifier of the call record
- `_select` (optional): Optional OData _select parameter to return specific properties (e.g., 'id,startD
- `_expand` (optional): Optional OData _expand parameter to include segments. Use 'segments' to include 

```bash
teams list-call-sessions --id "id_value"
```

### `create_call`
Create a new outgoing peer-to-peer or group call, or join an existing meeting.

**Parameters:**
- `callbackUri` (**required**): HTTPS callback URL for notifications (required)
- `source` (optional): Source participant info (optional, for PSTN calls with applicationInstance)
- `targets` (optional): Target participants for peer-to-peer or group calls (max 5). Do not use with mee
- `requestedModalities` (**required**): Requested modalities (required)
- `callOptions` (optional): Call options
- `mediaConfig` (**required**): Media configuration (required). Must include _odata_type
- `chatInfo` (optional): Chat information for joining meetings (use with meetingInfo)
- `meetingInfo` (optional): Meeting information for joining meetings. Do not use with targets.
- `subject` (optional): Call subject
- `tenantId` (optional): Tenant ID

```bash
teams create-call --callbackUri "callbackUri_value" --requestedModalities [] --mediaConfig 0
```

### `create_audio_routing_group`
Create a new audio routing group for a call.

**Parameters:**
- `call_id` (**required**): Parent call ID (required)
- `routingMode` (**required**): Routing mode: oneToOne (immutable) or multicast (updatable receivers)
- `sources` (**required**): Source participant IDs (must have exactly 1 participant - the authenticated bot/
- `receivers` (**required**): Receiver participant IDs. For oneToOne mode: exactly 1 receiver. For multicast m

```bash
teams create-audio-routing-group --call_id "call_id_value" --routingMode "routingMode_value" --sources [] --receivers []
```

### `set_user_status_message`
Set a user's status message.

**Parameters:**
- `user_id` (**required**): User identifier - accepts either user ID (UUID) or userPrincipalName (e.g., 'ali
- `statusMessage` (**required**): Status message object containing message details

```bash
teams set-user-status-message --user_id "user_id_value" --statusMessage 0
```

### `create_virtual_event_webinar`
Create a new virtualEventWebinar object in draft mode.

**Parameters:**
- `displayName` (**required**): The display name of the webinar (required, 1-500 characters)
- `description` (**required**): Description of the webinar (required)
- `startDateTime` (**required**): Start date and time (required)
- `endDateTime` (**required**): End date and time (required, must be after startDateTime)
- `audience` (**required**): Audience visibility (required). Use 'organization' for internal webinars, 'every
- `coOrganizers` (optional): Coorganizers of the webinar (optional). Each coorganizer must exist in the syste
- `settings` (optional): Webinar settings (optional)

```bash
teams create-virtual-event-webinar --displayName "displayName_value" --description 0 --startDateTime 0 --endDateTime 0 --audience "audience_value"
```

### `get_virtual_event_webinar`
Get a virtualEventWebinar object by ID.

**Parameters:**
- `webinar_id` (**required**): The unique identifier of the webinar (required, format: guid@guid). Example: '88

```bash
teams get-virtual-event-webinar --webinar_id "webinar_id_value"
```

### `list_virtual_event_webinars`
Get the list of all virtualEventWebinar objects created in a tenant.

**Parameters:**
- `_count` (optional): Include total count in response (@odata.count). Maps to $count query parameter. 

```bash
teams list-virtual-event-webinars
```

### `publish_virtual_event_webinar`
Publish a virtualEventWebinar to make it visible to its audience.

**Parameters:**
- `webinar_id` (**required**): Unique identifier of the webinar (format: guid@guid). Example: 'a57082a9-7629-4f

```bash
teams publish-virtual-event-webinar --webinar_id "webinar_id_value"
```

### `cancel_virtual_event_webinar`
Cancel a virtualEventWebinar. A canceled webinar has its status set to canceled permanently.

**Parameters:**
- `webinar_id` (**required**): Unique identifier of the webinar (format: guid@guid). Example: 'a57082a9-7629-4f

```bash
teams cancel-virtual-event-webinar --webinar_id "webinar_id_value"
```

### `create_virtual_event_townhall`
Create a new virtualEventTownhall object in draft mode.

**Parameters:**
- `displayName` (**required**): The display name of the townhall (required, 1-500 characters)
- `description` (**required**): Description of the townhall (required)
- `startDateTime` (**required**): Start date and time (required)
- `endDateTime` (**required**): End date and time (required, must be after startDateTime)
- `audience` (**required**): Audience visibility (required). 'organization' = internal only, 'everyone' = pub
- `isInviteOnly` (optional): Whether townhall is invite-only (optional, default: false). CRITICAL: Can ONLY b
- `invitedAttendees` (optional): Invited attendees for the townhall (optional). Provide user IDs for existing use
- `coOrganizers` (optional): Coorganizers of the townhall (optional). Provide only user IDs - displayName and
- `settings` (optional): Townhall settings (optional)

```bash
teams create-virtual-event-townhall --displayName "displayName_value" --description 0 --startDateTime 0 --endDateTime 0 --audience "audience_value"
```

### `list_virtual_event_townhalls`
Get the list of all virtualEventTownhall objects created in a tenant.

**Parameters:**
- `_count` (optional): Include total count in response (@odata.count). Maps to $count query parameter. 

```bash
teams list-virtual-event-townhalls
```

### `cancel_virtual_event_townhall`
Cancel a virtualEventTownhall. A canceled town hall has its status set to canceled permanently.

**Parameters:**
- `townhall_id` (**required**): Unique identifier of the townhall (format: guid@guid). Example: 'bce9a3ca-a310-4

```bash
teams cancel-virtual-event-townhall --townhall_id "townhall_id_value"
```

### `list_teams_apps`
List Teams apps from the Microsoft Teams app catalog.

**Parameters:**
- `_filter` (optional): OData filter to apply. Examples: "distributionMethod eq 'organization'", "id eq 
- `_select` (optional): Comma-separated list of properties to return. Example: "id,displayName,distribut
- `_expand` (optional): Comma-separated list of relationships to expand. Example: "appDefinitions"

```bash
teams list-teams-apps
```
