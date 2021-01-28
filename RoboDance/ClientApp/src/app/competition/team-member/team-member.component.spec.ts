import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberComponent } from './team-member.component';
import { Robot } from '../../models/Robot';
import { By } from '@angular/platform-browser';

describe('TeamMemberComponent', () => {
  let component: TeamMemberComponent;
  let fixture: ComponentFixture<TeamMemberComponent>;
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
      declarations: [TeamMemberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberComponent);
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

});
