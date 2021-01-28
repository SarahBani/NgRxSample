import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import { selectHasApiConnectionProblem } from '../../store/dance.selector';
import * as DanceActions from '../../store/dance.actions';

@Component({
  selector: 'app-fetch-robots-status',
  templateUrl: './fetch-robots-status.component.html',
  styleUrls: ['./fetch-robots-status.component.css']
})
export class FetchRobotsStatusComponent {

  hasApiConnectionProblem$: Observable<boolean> = this.store.select(selectHasApiConnectionProblem);

  constructor(private store: Store<fromApp.AppState>) { }

  onRefetch(): void {
    this.store.dispatch(DanceActions.fetchRobots());
  }

}
