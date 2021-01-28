import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { TeamNameComponent } from '../team-name/team-name.component';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectTeamsNames, selectTeamsMembers, selectCompetitionWinnerTeam, selectIsLoading } from '../../store/dance.selector';
import { Robot } from '../../models/Robot';
import { FormsModule } from '@angular/forms';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let store: MockStore;
  const teamNo: number = 1;
  const teamsNames: string[] = ['aaaa', 'bbbb'];
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
  let teamsMembers: Robot[][] = [robots, null];
  //teamsMembers[teamNo - 1] = robots;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamComponent,
        TeamNameComponent,
        TeamDetailComponent
      ],
      imports: [FormsModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        provideMockStore({
          selectors: [
            {
              selector: selectIsLoading,
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
        }),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectTeamsNames, teamsNames);
    store.overrideSelector(selectTeamsMembers, teamsMembers);
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    component.teamNo = teamNo;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should display team name component if hasArranged is false', async () => {
    component.hasArranged = false;
    fixture.detectChanges();

    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('app-team-name'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-team-detail'))).toBeFalsy();
  });

  it('should display team detail component if hasArranged is true', async () => {
    component.hasArranged = true;
    fixture.detectChanges();

    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('app-team-name'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('app-team-detail'))).toBeTruthy();
  });

});
