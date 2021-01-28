import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LeaderboardItemMemberComponent } from './leaderboard-item-member.component';
import { Robot } from '../../models/Robot';

describe('LeaderboardItemMemberComponent', () => {
  let component: LeaderboardItemMemberComponent;
  let fixture: ComponentFixture<LeaderboardItemMemberComponent>;
  const robot: Robot = {
    id: 1,
    name: 'Sarah',
    powermove: 'flying',
    experience: 10,
    outOfOrder: false,
    avatar: 'https://robohash.org/decisive-sarah.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardItemMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardItemMemberComponent);
    component = fixture.componentInstance;
    component.member = robot;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should elements have the member fields', async () => {
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(robot.avatar);
    expect(fixture.debugElement.query(By.css('img')).nativeElement.alt).toBe(robot.name);
    expect(fixture.debugElement.query(By.css('strong'))).withContext(robot.name).toBeTruthy();
    expect(fixture.debugElement.query(By.css('em'))).withContext(`${robot.experience} years of experience`).toBeTruthy();
    expect(fixture.debugElement.query(By.css('span'))).withContext(robot.powermove).toBeTruthy();
  });

  it('should have winner class when isWinner is true', async () => {
    component.isWinner = true;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('p')).nativeElement.className).toEqual('winner');
    expect(fixture.debugElement.query(By.css('p')).nativeElement.className).not.toEqual('loser');
  });

  it('should have loser class when isWinner is false', async () => {
    component.isWinner = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('p')).nativeElement.className).not.toEqual('winner');
    expect(fixture.debugElement.query(By.css('p')).nativeElement.className).toEqual('loser');
  });

});
