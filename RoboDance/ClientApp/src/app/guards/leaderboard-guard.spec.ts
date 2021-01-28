import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LeaderboardGuard } from './leaderboard-guard';
import { selectHasCompetitionFinished } from '../store/dance.selector';

//const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
const routerSpy = {
  navigate: jasmine.createSpy('navigate')
};

describe('LeaderboardGuard', () => {
  let guard: LeaderboardGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeaderboardGuard,
        {
          provide: Router, useValue: routerSpy
        },
        provideMockStore({
          selectors: [
            {
              selector: selectHasCompetitionFinished,
              value: false
            },
          ]
        })
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(LeaderboardGuard);
  });

  afterEach(() => {
    routerSpy.navigate.calls.reset();
  });

  it('should be createable', () => expect(guard).toBeTruthy());

  it('should be defined', () => expect(guard).toBeDefined());

  it('should return false if no competition has been finished yet', () => {
    store.overrideSelector(selectHasCompetitionFinished, false);
    store.refreshState();

    guard.canActivate().subscribe(response => {
      expect(response).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/not-found']);
    });
  });

  it('should return true if there was at least one finished competition', () => {
    store.overrideSelector(selectHasCompetitionFinished, true);
    store.refreshState();

    guard.canActivate().subscribe(response => {
      expect(response).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

});
