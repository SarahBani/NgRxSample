import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectHasCompetitionFinished } from '../store/dance.selector';

@Injectable({ providedIn: 'root' })
export class LeaderboardGuard implements CanActivate {

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  canActivate(): Observable<boolean>  {
    return this.store.select(selectHasCompetitionFinished).pipe(
      take(1),
      map(hasCompetitionFinished => {
        if (hasCompetitionFinished) {
          return true;
        }
        this.router.navigate(['/not-found']);
        return false;
      }));
  }

}
