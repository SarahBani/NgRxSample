import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as DanceActions from '../../store/dance.actions';
import { selectIsLoading } from '../../store/dance.selector';

@Component({
  selector: 'app-team-name',
  templateUrl: './team-name.component.html',
  styleUrls: ['./team-name.component.css']
})
export class TeamNameComponent {

  @ViewChild('f') myForm: NgForm;
  @Input() teamNo: number;
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private store: Store<fromApp.AppState>) { }

  onCreate(): void {
    this.store.dispatch(DanceActions.createTeam({
      teamNo: this.teamNo,
      name: this.myForm.value.name
    }));
  }

}
