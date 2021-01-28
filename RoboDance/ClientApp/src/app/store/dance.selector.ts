import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDance from './dance.reducer';

export const selectDanceState = createFeatureSelector<fromDance.State>(fromDance.danceFeatureKey);

export const selectIsLoading = createSelector(selectDanceState, (state: fromDance.State) => state.isLoading);

export const selectHasApiConnectionProblem = createSelector(selectDanceState, (state: fromDance.State) => state.hasApiConnectionProblem);

export const selectError = createSelector(selectDanceState, (state: fromDance.State) => state.error);

export const selectHasRobotsFetched = createSelector(selectDanceState, (state: fromDance.State) => state.hasRobotsFetched);

export const selectHasTeamArrangementProblem = createSelector(selectDanceState, (state: fromDance.State) => state.hasTeamArrangementProblem);

export const selectHasTeamsArranged = createSelector(selectDanceState, (state: fromDance.State) => state.hasTeamsArranged);

export const selectSelectiveRobots = createSelector(selectDanceState, (state: fromDance.State) => state.selectiveRobots);

export const selectTeamsNames = createSelector(selectDanceState, (state: fromDance.State) => state.teamsNames);

export const selectTeamsMembers = createSelector(selectDanceState, (state: fromDance.State) => state.teamsMembers);

export const selectCompetitionWinnerTeam = createSelector(selectDanceState, (state: fromDance.State) => state.winnerTeam);

export const selectHasCompetitionFinished = createSelector(selectDanceState, (state: fromDance.State) => state.hasCompetitionFinished);

export const selectHasLeaderboardFetched = createSelector(selectDanceState, (state: fromDance.State) => state.hasLeaderboardFetched);

export const selectLeaderboard = createSelector(selectDanceState, (state: fromDance.State) => state.leaderboard);
