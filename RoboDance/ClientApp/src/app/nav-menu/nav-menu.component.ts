import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { selectHasCompetitionFinished } from '../store/dance.selector';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  hasCompetitionFinished$: Observable<boolean> = this.store.select(selectHasCompetitionFinished);

  constructor(private store: Store<fromApp.AppState>) {
  }

}
