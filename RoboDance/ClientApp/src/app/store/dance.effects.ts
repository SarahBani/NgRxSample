import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError, exhaustMap } from 'rxjs/operators';

import * as DanceActions from './dance.actions';
import * as fromApp from './app.reducer';
import { DanceService } from '../services/dance-service';
import { of } from 'rxjs';
import { selectDanceState } from './dance.selector';
import { State } from './dance.reducer';
import { CustomError } from '../models/CustomError';
import { CustomException } from '../models/Enums';

@Injectable()
export class DanceEffects {

  @Effect()
  fetchRobots$ = this.actions$.pipe(
    ofType(DanceActions.fetchRobots),
    switchMap(() => {
      return this.danceService.fetchRobots().pipe(
        map(robots => DanceActions.setRobots({ robots: robots })),
        catchError(error => of(DanceActions.fetchRobotsFailed()))
      )
    }),
    catchError((error, caught) => {
      const customError: CustomError = (error as CustomError ? error : new CustomError());
      this.store$.dispatch(DanceActions.errorRaised({ error: customError }));
      return caught;
    })
  );

  @Effect()
  createTeam$ = this.actions$.pipe(
    ofType(DanceActions.createTeam),
    map(action => DanceActions.arrangeTeam({ teamNo: action.teamNo })),
    catchError((error, caught) => {
      const customError: CustomError = (error as CustomError ? error : new CustomError());
      this.store$.dispatch(DanceActions.errorRaised({ error: customError }));
      return caught;
    })
  );

  @Effect()
  arrangeTeam$ = this.actions$.pipe(
    ofType(DanceActions.arrangeTeam),
    withLatestFrom(this.store$.select(selectDanceState)),
    map(([action, state]) => {
      const updatedTeamMembers = [...state.teamsMembers[action.teamNo - 1]];
      this.danceService.arrangeTeam(updatedTeamMembers, state.selectiveRobots);
      return DanceActions.setTeam({
        teamNo: action.teamNo,
        members: updatedTeamMembers
      })
    }),
    catchError((error, caught) => {
      const customError: CustomError = (error as CustomError ? error : new CustomError());
      this.store$.dispatch(DanceActions.errorRaised({ error: customError }));
      return caught;
    })
  );

  @Effect()
  startCompetition$ = this.actions$.pipe(
    ofType(DanceActions.startCompetition),
    withLatestFrom(this.store$.select(selectDanceState)),
    switchMap(([action, state]: [Action, State]) => {
      const updatedTeamMembers = [...state.teamsMembers];
      return this.danceService.startCompetition(updatedTeamMembers).pipe(
        map(danceOffResults => {
          const winnerTeamNo = this.danceService.getWinnerTeamNo(updatedTeamMembers, danceOffResults);
          return DanceActions.setCompetitionResult({
            result: null,
            winnerTeam: winnerTeamNo
          });
        }),
        catchError(error => {
          throw new CustomError(CustomException.APIConnectionProblem);
        }))
    }),
    //map(() => {
    //  return this.store$.select(selectTeamsMembers).subscribe(response => {
    //    const updatedTeamMembers = response;
    //    return this.danceService.startCompetition(updatedTeamMembers).pipe(
    //      map(danceOffResults => {
    //        const winnerTeamNo = this.danceService.getWinnerTeamNo(updatedTeamMembers, danceOffResults);
    //        return DanceActions.setCompetitionResult({
    //          result: null,
    //          winnerTeam: winnerTeamNo
    //        });
    //      }),
    //      catchError(error => {
    //        throw new CustomError(CustomException.APIConnectionProblem);
    //      }))
    //  });
    //}),
    catchError((error, caught) => {
      const customError: CustomError = (error as CustomError ? error : new CustomError());
      this.store$.dispatch(DanceActions.errorRaised({ error: customError }));
      return caught;
    })
  );

  @Effect()
  fetchLeaderboard$ = this.actions$.pipe(
    ofType(DanceActions.fetchLeaderboard),
    withLatestFrom(this.store$.select(selectDanceState)),
    switchMap(([action, state]: [Action, State]) => {
      return this.danceService.fetchLeaderboard().pipe(
        map(danceOffResults => {
          danceOffResults.map(q => {
            q.winnerRobot = state.robots.find(x => x.id === q.winner);
            q.loserRobot = state.robots.find(x => x.id === q.loser);
            return q;
          });
          return DanceActions.setLeaderboard({ result: danceOffResults });
        }),
        catchError(error => of(DanceActions.fetchLeaderboardFailed()))
      );
    }),
    catchError((error, caught) => {
      const customError: CustomError = (error as CustomError ? error : new CustomError());
      this.store$.dispatch(DanceActions.errorRaised({ error: customError }));
      return caught;
    })
  );

  constructor(private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private danceService: DanceService) {
  }

}
