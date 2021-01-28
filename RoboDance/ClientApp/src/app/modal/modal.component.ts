import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as DanceActions from '../store/dance.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private store: Store<fromApp.AppState>) { }

   onClose(): void {
     this.store.dispatch(DanceActions.clearError());
  }

}
