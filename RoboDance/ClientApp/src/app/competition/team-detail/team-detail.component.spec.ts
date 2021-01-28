import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { TeamDetailComponent } from './team-detail.component';
import { selectTeamsNames, selectTeamsMembers, selectCompetitionWinnerTeam } from '../../store/dance.selector';
import { Robot } from '../../models/Robot';
import { TeamMemberComponent } from '../team-member/team-member.component';
import * as DanceActions from '../../store/dance.actions';

describe('TeamDetailComponent', () => {
  let component: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;
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
  teamsMembers[teamNo - 1] = robots;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamDetailComponent,
        TeamMemberComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
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
    //store.refreshState();
    fixture = TestBed.createComponent(TeamDetailComponent);
    component = fixture.componentInstance;
    component.teamNo = teamNo;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should className be empty if winnerTeam is 0', () => {
    //expect(fixture.debugElement.nativeElement.querySelector('.card').className).not.toBe('winner');
    expect(fixture.debugElement.nativeElement.querySelector('.card')).not.toHaveClass('winner');
    expect(fixture.debugElement.nativeElement.querySelector('.card')).not.toHaveClass('loser');
  });

  it('should className be winner if winnerTeam equals to teamNo',  () => {
    store.overrideSelector(selectCompetitionWinnerTeam, teamNo);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.card')).toHaveClass('winner');
   });

  it('should className be winner if winnerTeam not equals to teamNo',  () => {
    store.overrideSelector(selectCompetitionWinnerTeam, teamNo + 1);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.card')).toHaveClass('loser');
  });

  it('should team name equals to specific name',  () => {
    expect(fixture.debugElement.nativeElement.querySelector('.card-title'))
      .withContext(`Team ${teamsNames[teamNo - 1]}`).toBeTruthy();
  });

  it('should has specific team members', () => {
    expect(fixture.debugElement.queryAll(By.css('app-team-member')).length).toBe(robots.length);
    //expect(fixture.debugElement.queryAll(By.css('app-team-member')).length).toEqual(robots.length);
  });

  it('should Total Experience equals to sum of team members experience',  () => {
    const totalExperience = robots.reduce((sum, current) => sum + current.experience, 0);

    expect(fixture.debugElement.nativeElement.querySelector('.card-text span'))
      .withContext(`${totalExperience} years`).toBeTruthy();
  });

  it('should call onRearrange when Arrange again button is clicked', async () => {
    spyOn(component, 'onRearrange');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-refresh.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onRearrange).toHaveBeenCalled();
    });
  });

  it('should store dispatch arrangeTeam when Arrange again button is clicked', async () => {
    spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-refresh.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(DanceActions.arrangeTeam({ teamNo: teamNo }));
    });
  });

  it('should call onReset when Reset button is clicked', async () => {
    spyOn(component, 'onReset');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-times.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onReset).toHaveBeenCalled();
    });
  });

  it('should store dispatch resetTeam when Reset button is clicked', async () => {
    spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-times.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(DanceActions.resetTeam({ teamNo: teamNo }));
    });
  });

});
