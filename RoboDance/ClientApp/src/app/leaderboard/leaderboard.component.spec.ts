import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { LeaderboardComponent } from './leaderboard.component';
import { FetchLeaderboardStatusComponent } from './fetch-leaderboard-status/fetch-leaderboard-status.component';
import { LeaderboardItemComponent } from './leaderboard-item/leaderboard-item.component';
import { LeaderboardItemMemberComponent } from './leaderboard-item-member/leaderboard-item-member.component';
import { selectHasLeaderboardFetched, selectHasApiConnectionProblem, selectLeaderboard, selectError, selectIsLoading } from '../store/dance.selector';
import { DanceOffResult } from '../models/DanceOffResult';
import * as DanceActions from '../store/dance.actions';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let store: MockStore;
  const result: DanceOffResult[] = [
    {
      id: 1123,
      winner: 1,
      loser: 2,
      dancedAt: '2021-01-24T11:35:30.226Z',
      winnerRobot: {
        id: 1,
        name: 'Sarah',
        powermove: 'flying',
        experience: 10,
        outOfOrder: false,
        avatar: 'https://robohash.org/decisive-sarah.png'
      },
      loserRobot: {
        id: 2,
        name: 'Agile Anna',
        powermove: 'Pretzel Hop',
        experience: 5,
        outOfOrder: false,
        avatar: 'https://robohash.org/agile-anna.png'
      }
    },
    {
      id: 2123,
      winner: 2,
      loser: 1,
      dancedAt: '2021-01-25T11:35:30.226Z',
      winnerRobot: {
        id: 2,
        name: 'Agile Anna',
        powermove: 'Pretzel Hop',
        experience: 5,
        outOfOrder: false,
        avatar: 'https://robohash.org/agile-anna.png'
      },
      loserRobot: {
        id: 1,
        name: 'Sarah',
        powermove: 'flying',
        experience: 10,
        outOfOrder: false,
        avatar: 'https://robohash.org/decisive-sarah.png'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LeaderboardComponent,
        FetchLeaderboardStatusComponent,
        LeaderboardItemComponent,
        LeaderboardItemMemberComponent,
        SpinnerComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectHasLeaderboardFetched,
              value: false
            },
            {
              selector: selectLeaderboard,
              value: []
            },
            {
              selector: selectIsLoading,
              value: false
            },
            {
              selector: selectError,
              value: null
            },
            {
              selector: selectHasApiConnectionProblem,
              value: false
            }
          ]
        })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should be defined', () => expect(component).toBeDefined());

  it('should display FetchLeaderboardStatus if hasLeaderboardFetched is false', () => {
    store.overrideSelector(selectHasLeaderboardFetched, false);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-fetch-leaderboard-status'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#accordion'))).toBeFalsy();
    expect(fixture.debugElement.queryAll(By.css('app-leaderboard-item')).length).toEqual(0);
  });

  it('should not display FetchLeaderboardStatus if hasLeaderboardFetched is true', () => {
    store.overrideSelector(selectHasLeaderboardFetched, true);
    store.overrideSelector(selectLeaderboard, result);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-fetch-leaderboard-status'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#accordion'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('app-leaderboard-item')).length).toEqual(result.length);
  });

  it('should not display spinner if isLoading is false', () => {
    store.overrideSelector(selectIsLoading, false);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-spinner'))).toBeFalsy();
  });

  it('should display spinner if isLoading is true', () => {
    store.overrideSelector(selectIsLoading, true);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-spinner'))).toBeTruthy();
  });

  it('should store dispatch fetchLeaderboard when init', () => {
    fixture.detectChanges(); // ngOnInit()
    spyOn(store,'dispatch');

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(DanceActions.fetchLeaderboard());
    });
  });

});
