import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardItemComponent } from './leaderboard-item.component';
import { DanceOffResult } from '../../models/DanceOffResult';
import { By } from '@angular/platform-browser';
import { LeaderboardItemMemberComponent } from '../leaderboard-item-member/leaderboard-item-member.component';
import { formatDate } from '@angular/common';
import { Robot } from '../../models/Robot';

describe('LeaderboardItemComponent', () => {
  let component: LeaderboardItemComponent;
  let fixture: ComponentFixture<LeaderboardItemComponent>;
  let itemNo: number = 1;
  let result: DanceOffResult = {
    id: 2,
    winner: 1,
    loser: 2,
    dancedAt: '2021-01-25T11:35:30.226Z',
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
  };
  const formattedDateTime = formatDate(result.dancedAt, 'MM/dd/yyyy h:mm:ss a', 'en_US');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LeaderboardItemComponent,
        LeaderboardItemMemberComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardItemComponent);
    component = fixture.componentInstance;
    component.itemNo = itemNo;
    component.result = result;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should has correct title', () => {
    expect(fixture.debugElement.query(By.css('a')).nativeElement.href).toContain(`#collapse${itemNo}`);
    expect(fixture.debugElement.query(By.css('a span:nth-of-type(1)')))
      .withContext(`Dance-Off No ${itemNo}`).toBeTruthy();
  });

  it('should has correct date', () => {
    expect(fixture.debugElement.query(By.css('.panel-heading > span')))
      .withContext(`${formattedDateTime}`).toBeTruthy();
  });

  it('should has correct item id', () => {
    expect(fixture.debugElement.query(By.css('.panel-collapse.collapse')).nativeElement.id)
      .toEqual(`collapse${itemNo}`);
  });

  it('should has item members', async () => {
    await fixture.whenStable();

    expect(fixture.debugElement.queryAll(By.css('app-leaderboard-item-member')).length).toEqual(2);
  });

});
