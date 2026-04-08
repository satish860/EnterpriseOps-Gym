import { setTaskContext } from "../src/client.js";
import * as teams from "./index.js";

setTaskContext('default', {
  'x-teams-access-token': 'test-token'
});

const allTeams = await teams.listTeams({});
console.log("TEAMS:", JSON.stringify(allTeams, null, 2));
