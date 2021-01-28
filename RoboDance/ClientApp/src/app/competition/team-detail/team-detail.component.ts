import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { Robot } from '../../models/Robot';
import * as fromApp from '../../store/app.reducer';
import * as DanceActions from '../../store/dance.actions';
import { selectTeamsMembers, selectTeamsNames, selectCompetitionWinnerTeam } from '../../store/dance.selector';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent {

  @Input() teamNo: number;
  totalExperience: number = 0;
  name$: Observable<string> = this.store.select(selectTeamsNames).pipe(
    map(teamNames => teamNames[this.teamNo - 1]));
  members$: Observable<Robot[]> = this.store.select(selectTeamsMembers).pipe(
    map(teamsMembers => teamsMembers[this.teamNo - 1]),
    tap(teamsMembers => {
      this.totalExperience = teamsMembers.reduce((sum, current) => sum + current.experience, 0);
    }));
  className$: Observable<string> = this.store.select(selectCompetitionWinnerTeam).pipe(
    map(winnerTeam => {
      switch (winnerTeam) {
        case 0:
          return '';
        case this.teamNo:
          return 'winner';
        default:
          return 'loser';
      }
    }));

  constructor(private store: Store<fromApp.AppState>) {
  }

  onReset(): void {
    this.store.dispatch(DanceActions.resetTeam({ teamNo: this.teamNo }));
  }

  onRearrange(): void {
    this.store.dispatch(DanceActions.arrangeTeam({ teamNo: this.teamNo }));
  }

}
