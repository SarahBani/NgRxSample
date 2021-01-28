import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { DanceOffResult } from '../models/DanceOffResult';
import { BaseComponent } from '../base/base-component';
import { ModalService } from '../services/modal-service';
import * as fromApp from '../store/app.reducer';
import * as DanceActions from '../store/dance.actions';
import { selectLeaderboard, selectHasLeaderboardFetched } from '../store/dance.selector';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent extends BaseComponent implements OnInit {

  hasLeaderboardFetched$: Observable<boolean> = this.store.select(selectHasLeaderboardFetched);
  danceOffResults$: Observable<DanceOffResult[]> = this.store.select(selectLeaderboard);

  constructor(modalService: ModalService,
    store: Store<fromApp.AppState>) {
    super(modalService, store);
  }

  ngOnInit(): void {
    this.store.dispatch(DanceActions.fetchLeaderboard());
  }

}
