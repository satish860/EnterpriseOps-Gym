/**
 * teams MCP server — auto-generated barrel export
 * External port: 8002  |  Internal port: 8002
 * Tools: 70
 */

export const SERVER_CONFIG = {
  domain: "teams",
  externalPort: 8002,
  internalPort: 8002,
  baseUrl: "http://localhost:8002",
  mcpEndpoint: "/mcp",
  sqlEndpoint: "/api/sql-runner",
  seedEndpoint: "/api/seed-database",
};

export * from "./list_users.js";
export * from "./create_user.js";
export * from "./get_user.js";
export * from "./update_user.js";
export * from "./delete_user.js";
export * from "./create_chat.js";
export * from "./update_chat.js";
export * from "./list_chats.js";
export * from "./list_chat_messages.js";
export * from "./add_tab_to_chat.js";
export * from "./send_chat_message.js";
export * from "./soft_delete_chat_message.js";
export * from "./undo_soft_delete_chat_message.js";
export * from "./update_chat_message.js";
export * from "./set_chat_message_reaction.js";
export * from "./unset_chat_message_reaction.js";
export * from "./pin_chat_message.js";
export * from "./create_channel.js";
export * from "./update_channel.js";
export * from "./list_channels.js";
export * from "./list_all_channels.js";
export * from "./get_primary_channel.js";
export * from "./add_channel_member.js";
export * from "./archive_channel.js";
export * from "./list_channel_messages.js";
export * from "./send_channel_message.js";
export * from "./soft_delete_channel_message.js";
export * from "./undo_soft_delete_channel_message.js";
export * from "./update_channel_message.js";
export * from "./set_channel_message_reaction.js";
export * from "./unset_channel_message_reaction.js";
export * from "./get_files_folder.js";
export * from "./list_tabs_in_channel.js";
export * from "./add_tabs_to_channels.js";
export * from "./provision_channel_email.js";
export * from "./update_channel_tab.js";
export * from "./delete_channel_tab.js";
export * from "./create_team.js";
export * from "./list_teams.js";
export * from "./update_team.js";
export * from "./delete_team.js";
export * from "./list_team_members.js";
export * from "./add_team_member.js";
export * from "./add_team_members_in_bulk.js";
export * from "./update_team_member.js";
export * from "./remove_team_member.js";
export * from "./list_installed_apps.js";
export * from "./create_teamwork_tag.js";
export * from "./list_teamwork_tags.js";
export * from "./update_teamwork_tag.js";
export * from "./create_teamwork_tag_member.js";
export * from "./create_group.js";
export * from "./list_groups.js";
export * from "./update_group.js";
export * from "./add_group_owner.js";
export * from "./list_call_records.js";
export * from "./get_call_record.js";
export * from "./list_call_sessions.js";
export * from "./create_call.js";
export * from "./create_audio_routing_group.js";
export * from "./set_user_status_message.js";
export * from "./create_virtual_event_webinar.js";
export * from "./get_virtual_event_webinar.js";
export * from "./list_virtual_event_webinars.js";
export * from "./publish_virtual_event_webinar.js";
export * from "./cancel_virtual_event_webinar.js";
export * from "./create_virtual_event_townhall.js";
export * from "./list_virtual_event_townhalls.js";
export * from "./cancel_virtual_event_townhall.js";
export * from "./list_teams_apps.js";
