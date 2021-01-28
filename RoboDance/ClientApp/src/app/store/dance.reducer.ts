import { createReducer, on, Action } from '@ngrx/store';

import * as DanceActions from "./dance.actions";
import { Robot } from "../models/Robot";
import { DanceOffResult } from '../models/DanceOffResult';
import { CustomError } from '../models/CustomError';

export const danceFeatureKey = 'dance';

export interface State {
  isLoading: boolean;
  hasApiConnectionProblem: boolean;
  error: CustomError;

  hasRobotsFetched: boolean;
  robots: Robot[];
  inOrderRobots: Robot[];
  selectiveRobots: Robot[];

  hasTeamArrangementProblem: boolean;
  hasTeamsArranged: boolean[];
  teamsNames: string[];
  teamsMembers: Robot[][];

  winnerTeam: number;
  competitionResult: DanceOffResult[];
  hasCompetitionFinished: boolean;
  hasLeaderboardFetched: boolean;
  leaderboard: DanceOffResult[];
}

const initialState: State = {
  isLoading: false,
  hasApiConnectionProblem: false,
  error: null,

  hasRobotsFetched: false,
  robots: null,
  inOrderRobots: [],
  selectiveRobots: [],

  hasTeamArrangementProblem: false,
  hasTeamsArranged: new Array<boolean>(2),
  teamsNames: new Array<string>(2),
  teamsMembers: new Array<Robot[]>(2),

  winnerTeam: 0,
  competitionResult: [],
  hasCompetitionFinished: false,
  hasLeaderboardFetched: false,
  leaderboard: []
};

export const danceReducer = createReducer(
  initialState,
  on(DanceActions.errorRaised, (state: State, props) =>
    ({
      ...state,
      isLoading: false,
      error: props.error,
    })),
  on(DanceActions.clearError, (state: State) =>
    ({
      ...state,
      error: null
    })),
  on(DanceActions.fetchRobots, (state: State) =>
    ({
      ...state,
      isLoading: true,
      hasApiConnectionProblem: false,
      hasRobotsFetched: false,
    })),
  on(DanceActions.fetchRobotsFailed, (state: State) =>
    ({
      ...state,
      isLoading: false,
      hasApiConnectionProblem: true
    })),
  on(DanceActions.setRobots, (state: State, props) => {
    return ({
      ...state,
      isLoading: false,
      hasRobotsFetched: true,
      robots: props.robots,
      inOrderRobots: props.robots.filter(q => !q.outOfOrder)
    });
  }),
  on(DanceActions.createTeam, (state: State, props) => {
    const updatedTeamsNames: string[] = [...state.teamsNames];
    updatedTeamsNames[props.teamNo - 1] = props.name;

    return ({
      ...state,
      teamsNames: updatedTeamsNames
    })
  }),
  on(DanceActions.arrangeTeam, (state: State, props) => {
    const updatedTeamsMembers: Robot[][] = [...state.teamsMembers];
    updatedTeamsMembers[props.teamNo - 1] = [];
    const otherTeamMembers = state.teamsMembers[(props.teamNo == 1 ? 1 : 0)];
    const updatedSelectiveRobots = state.inOrderRobots.filter(q => !otherTeamMembers?.some(x => x.id === q.id));

    return ({
      ...state,
      isLoading: true,
      selectiveRobots: updatedSelectiveRobots,
      hasTeamArrangementProblem: false,
      teamsMembers: updatedTeamsMembers,
      winnerTeam: 0
    })
  }),
  on(DanceActions.setTeam, (state: State, props) => {
    const updatedHasTeamsArranged: boolean[] = [...state.hasTeamsArranged];
    updatedHasTeamsArranged[props.teamNo - 1] = true;
    const updatedTeamsMembers: Robot[][] = [...state.teamsMembers];
    updatedTeamsMembers[props.teamNo - 1] = props.members;

    return ({
      ...state,
      isLoading: false,
      hasTeamArrangementProblem: false,
      hasTeamsArranged: updatedHasTeamsArranged,
      teamsMembers: updatedTeamsMembers
    });
  }),
  on(DanceActions.resetTeam, (state: State, props) => {
    const updatedHasTeamsArranged: boolean[] = [...state.hasTeamsArranged];
    updatedHasTeamsArranged[props.teamNo - 1] = false;
    const updatedTeamsMembers: Robot[][] = [...state.teamsMembers];
    updatedTeamsMembers[props.teamNo - 1] = [];

    return ({
      ...state,
      isLoading: false,
      hasTeamsArranged: updatedHasTeamsArranged,
      teamsMembers: updatedTeamsMembers,
      winnerTeam: 0
    });
  }),
  on(DanceActions.startCompetition, (state: State) =>
    ({
      ...state,
      isLoading: true,
      hasApiConnectionProblem: false,
      winnerTeam: 0,
      danceOffResults: []
    })),
  on(DanceActions.setCompetitionResult, (state: State, props) =>
    ({
      ...state,
      isLoading: false,
      winnerTeam: props.winnerTeam,
      danceOffResults: props.result,
      hasCompetitionFinished: true
    })),
  on(DanceActions.fetchLeaderboard, (state: State) =>
    ({
      ...state,
      isLoading: true,
      hasApiConnectionProblem: false,
      hasLeaderboardFetched: false,
      leaderboard: []
    })),
  on(DanceActions.fetchLeaderboardFailed, (state: State) =>
    ({
      ...state,
      isLoading: false,
      hasApiConnectionProblem: true
    })),
  on(DanceActions.setLeaderboard, (state: State, props) =>
    ({
      ...state,
      isLoading: false,
      hasLeaderboardFetched: true,
      leaderboard: props.result
    }))
);

export function reducer(state: State | undefined, action: Action): any {
  return danceReducer(state, action);
}
