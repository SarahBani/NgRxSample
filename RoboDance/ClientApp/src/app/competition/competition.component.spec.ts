import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CompetitionComponent } from './competition.component';
import { FetchRobotsStatusComponent } from './fetch-robots-status/fetch-robots-status.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { selectHasRobotsFetched, selectHasTeamsArranged, selectError, selectIsLoading, selectHasApiConnectionProblem, selectTeamsNames, selectTeamsMembers, selectCompetitionWinnerTeam } from '../store/dance.selector';
import { TeamComponent } from './team/team.component';
import { TeamNameComponent } from './team-name/team-name.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { Robot } from '../models/Robot';
import { TeamMemberComponent } from './team-member/team-member.component';
import * as DanceActions from '../store/dance.actions';

describe('CompetitionComponent', () => {
  let component: CompetitionComponent;
  let fixture: ComponentFixture<CompetitionComponent>;
  let store: MockStore;
  const teamNo: number = 1;
  const robots: Robot[] = [
    {
      id: 1,
      name: 'Sarah',
      powermove: 'flying',
      experience: 10,
      outOfOrder: false,
      avatar: 'https://robohash.org/decisive-sarah.png'
    },
    {
      id: 2,
      name: 'Agile Anna',
      powermove: 'Pretzel Hop',
      experience: 5,
      outOfOrder: false,
      avatar: 'https://robohash.org/agile-anna.png'
    },
    {
      id: 3,
      name: 'Paula',
      powermove: 'Celebrating Lobster',
      experience: 11,
      outOfOrder: false,
      avatar: 'https://robohash.org/productive-paula.png'
    },
    {
      id: 4,
      name: 'Joe',
      powermove: 'Spinning Turtle',
      experience: 5,
      outOfOrder: false,
      avatar: 'https://robohash.org/funky-joe.png'
    },
    {
      id: 5,
      name: 'Stephanie',
      powermove: 'Cache Invalidation',
      experience: 8,
      outOfOrder: false,
      avatar: 'https://robohash.org/sliding-stephanie.png'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CompetitionComponent,
        FetchRobotsStatusComponent,
        TeamComponent,
        TeamNameComponent,
        TeamDetailComponent,
        TeamMemberComponent,
        SpinnerComponent
      ],
      imports: [FormsModule],
      providers: [
        //{ provide: ComponentFixtureAutoDetect, useValue: true },
        provideMockStore({
          selectors: [
            {
              selector: selectHasRobotsFetched,
              value: true
            },
            {
              selector: selectHasTeamsArranged,
              value: new Array<boolean>(2)
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
            },
            {
              selector: selectTeamsNames,
              value: new Array<string>(2)
            },
            {
              selector: selectTeamsMembers,
              value: new Array<Robot[]>(2),
            },
            {
              selector: selectCompetitionWinnerTeam,
              value: 0,
            }
          ]
        })
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should display FetchRobotsStatus if hasRobotsFetched is false', () => {
    store.overrideSelector(selectHasRobotsFetched, false);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-fetch-robots-status'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('app-team')).length).toEqual(0);
  });

  it('should not display FetchRobotsStatus if hasRobotsFetched is true', () => {
    store.overrideSelector(selectHasRobotsFetched, true);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-fetch-robots-status'))).toBeFalsy();
    expect(fixture.debugElement.queryAll(By.css('app-team')).length).toEqual(2);
  });

  it('should set team hasArranged to false if the teams has not been arranged', () => {
    store.overrideSelector(selectHasTeamsArranged, [false, false]);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-team'))[teamNo - 1]
      .nativeElement.getAttribute('ng-reflect-has-arranged')).toEqual('false');
  });

  it('should set team hasArranged to true if the teams has been arranged', () => {
    store.overrideSelector(selectHasTeamsArranged, [true, false]);
    store.overrideSelector(selectTeamsNames, ['sss', null]);
    store.overrideSelector(selectTeamsMembers, [robots, null]);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-team'))[teamNo - 1]
      .nativeElement.getAttribute('ng-reflect-has-arranged')).toEqual('true');
  });

  it('should display StartCompetition button if both teams are not arranged', () => {
    store.overrideSelector(selectHasTeamsArranged, [false, true]);
    store.overrideSelector(selectTeamsNames, [null, 'sss']);
    store.overrideSelector(selectTeamsMembers, [null, robots]);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('div.justify-content-center'))).toBeFalsy();
  });

  it('should not display StartCompetition button if both teams are arranged', () => {
    store.overrideSelector(selectHasTeamsArranged, [true, true]);
    store.overrideSelector(selectTeamsNames, ['aaa', 'bbb']);
    store.overrideSelector(selectTeamsMembers, [robots, robots]);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('div.justify-content-center'))).toBeTruthy();
  });

  it('should StartCompetition button be disabled if isLoading is true', () => {
    store.overrideSelector(selectIsLoading, true);
    store.refreshState();
    fixture.detectChanges();

    //expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();
  });

  it('should StartCompetition button not be disabled if isLoading is false', () => {
    store.overrideSelector(selectIsLoading, false);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeFalsy();
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

  it('should store dispatch fetchRobots if hasRobotsFetched is false', async () => {
    store.overrideSelector(selectHasRobotsFetched, false);
    const dispatchSpy = spyOn(store, 'dispatch');
    store.refreshState();
    component.ngOnInit();

    await fixture.whenStable();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DanceActions.fetchRobots());
  });

  it('should call onStartCompetition when StartCompetition button is clicked', () => {
    store.overrideSelector(selectHasRobotsFetched, true);
    store.overrideSelector(selectHasTeamsArranged, [true, true]);
    store.overrideSelector(selectIsLoading, false);
    store.overrideSelector(selectTeamsMembers, [robots, robots]);
    store.refreshState();
    fixture.detectChanges();
    spyOn(component, 'onStartCompetition');

    const button = fixture.debugElement.nativeElement.querySelector('span.button.fa-play-circle');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onStartCompetition).toHaveBeenCalledTimes(1);
    });
  });

  it('should store dispatch startCompetition when StartCompetition button is clicked', () => {
    store.overrideSelector(selectHasRobotsFetched, true);
    store.overrideSelector(selectHasTeamsArranged, [true, true]);
    store.overrideSelector(selectIsLoading, false);
    store.overrideSelector(selectTeamsMembers, [robots, robots]);
    store.refreshState();
    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');

    const button = fixture.debugElement.nativeElement.querySelector('span.button.fa-play-circle');
    button.click();

    fixture.whenStable().then(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(DanceActions.startCompetition());
    });
  });

});
