import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectHasCompetitionFinished } from '../store/dance.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  hasCompetitionFinished$: Observable<boolean> = this.store.select(selectHasCompetitionFinished);

  constructor(private store: Store<fromApp.AppState>) {
  }

}
