import { createAction, props } from '@ngrx/store';

import { Robot } from '../models/Robot';
import { CustomError } from '../models/CustomError';
import { DanceOffResult } from '../models/DanceOffResult';

export const errorRaised = createAction('[Dance] Error Raised',
  props<{ error: CustomError }>());

export const clearError = createAction('[Dance] Clear Error');

export const fetchRobots = createAction('[Dance] Fetch Robots');

export const fetchRobotsFailed = createAction('[Dance] Fetch Robots Failed');

export const setRobots = createAction('[Dance] Set Robots',
  props<{ robots: Robot[] }>());

export const createTeam = createAction('[Dance] Create Team',
  props<{ teamNo: number, name: string }>());

export const arrangeTeam = createAction('[Dance] Arrange Team',
  props<{ teamNo: number }>());

export const setTeam = createAction('[Dance] Set Team',
  props<{ teamNo: number, members: Robot[] }>());

export const resetTeam = createAction('[Dance] Reset Team',
  props<{ teamNo: number }>());

export const startCompetition = createAction('[Dance] Start Competition');

export const setCompetitionResult = createAction('[Dance] Set Competition Result',
  props<{ result: DanceOffResult[], winnerTeam: number }>());

export const fetchLeaderboard = createAction('[Dance] Fetch Leaderboard');

export const fetchLeaderboardFailed = createAction('[Dance] Fetch Leaderboard Failed');

export const setLeaderboard = createAction('[Dance] Set Leaderboard',
  props<{ result: DanceOffResult[] }>());
