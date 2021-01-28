"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLeaderboard = exports.fetchLeaderboardFailed = exports.fetchLeaderboard = exports.setCompetitionResult = exports.startCompetition = exports.resetTeam = exports.setTeam = exports.arrangeTeam = exports.createTeam = exports.setRobots = exports.fetchRobotsFailed = exports.fetchRobots = exports.clearError = exports.errorRaised = void 0;
var store_1 = require("@ngrx/store");
exports.errorRaised = store_1.createAction('[Dance] Error Raised', store_1.props());
exports.clearError = store_1.createAction('[Dance] Clear Error');
exports.fetchRobots = store_1.createAction('[Dance] Fetch Robots');
exports.fetchRobotsFailed = store_1.createAction('[Dance] Fetch Robots Failed');
exports.setRobots = store_1.createAction('[Dance] Set Robots', store_1.props());
exports.createTeam = store_1.createAction('[Dance] Create Team', store_1.props());
exports.arrangeTeam = store_1.createAction('[Dance] Arrange Team', store_1.props());
exports.setTeam = store_1.createAction('[Dance] Set Team', store_1.props());
exports.resetTeam = store_1.createAction('[Dance] Reset Team', store_1.props());
exports.startCompetition = store_1.createAction('[Dance] Start Competition');
exports.setCompetitionResult = store_1.createAction('[Dance] Set Competition Result', store_1.props());
exports.fetchLeaderboard = store_1.createAction('[Dance] Fetch Leaderboard');
exports.fetchLeaderboardFailed = store_1.createAction('[Dance] Fetch Leaderboard Failed');
exports.setLeaderboard = store_1.createAction('[Dance] Set Leaderboard', store_1.props());
//# sourceMappingURL=dance.actions.js.map