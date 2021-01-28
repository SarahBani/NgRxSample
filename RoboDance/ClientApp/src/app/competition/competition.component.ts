import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { BaseComponent } from '../base/base-component';
import { ModalService } from '../services/modal-service';
import * as fromApp from '../store/app.reducer';
import * as DanceActions from '../store/dance.actions';
import { selectHasRobotsFetched, selectHasTeamsArranged } from '../store/dance.selector';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent extends BaseComponent implements OnInit {

  hasRobotsFetched$: Observable<boolean> = this.store.select(selectHasRobotsFetched);
  hasTeamsArranged$: Observable<boolean[]> = this.store.select(selectHasTeamsArranged);

  constructor(modalService: ModalService,
    store: Store<fromApp.AppState>) {
    super(modalService, store);
  }

  ngOnInit(): void {
    this.subscribe();
  }

  private subscribe(): void {
    this.store.select(selectHasRobotsFetched).pipe(
      take(1)
    ).subscribe(hasRobots => {
      if (!hasRobots) {
        this.store.dispatch(DanceActions.fetchRobots());
      }
    });
  }

  onStartCompetition(): void {
    this.store.dispatch(DanceActions.startCompetition());
  }

}
