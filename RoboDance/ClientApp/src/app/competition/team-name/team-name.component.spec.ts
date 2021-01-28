import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';

import { TeamNameComponent } from './team-name.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectIsLoading } from '../../store/dance.selector';
import * as DanceActions from '../../store/dance.actions'; +

  describe('TeamNameComponent', () => {
    let component: TeamNameComponent;
    let fixture: ComponentFixture<TeamNameComponent>;
    let store: MockStore;
    const teamNo: number = 1;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TeamNameComponent],
        imports: [FormsModule],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: selectIsLoading,
                value: false
              }
            ]
          }),
        ],
      })
        .compileComponents();
    });

    beforeEach(() => {
      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(TeamNameComponent);
      component = fixture.componentInstance;
      component.teamNo = teamNo;
      fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should be defined', () => expect(component).toBeDefined());

    it('should label has team no', () => {
      expect(fixture.debugElement.query(By.css('label'))).withContext(`Enter Team ${teamNo} Name : `).toBeTruthy();
    });

    it('should input has appropriate id', () => {
      expect(fixture.debugElement.nativeElement.querySelector('input').id).toEqual(`name${teamNo}`);
    });

    it('should form be invalid if name is empty', async () => {
      await fixture.whenStable();
      component.myForm.setValue({ 'name': '' });
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.myForm.valid).toBeFalse();
      expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTruthy();
    });

    it('should form be valid if name is not empty', async () => {
      await fixture.whenStable();
      component.myForm.setValue({ 'name': 'team name' });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.myForm.valid).toBeTrue();
        expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalsy();
      });
      //await fixture.whenStable();
      //expect(component.myForm.valid).toBeTrue();
    });

    it('should button be enabled when isLoading is false', async () => {
      store.overrideSelector(selectIsLoading, false);
      store.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isLoading$).toBeObservable(cold('a', { a: false }));
      expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeFalsy();
    });

    it('should button be disabled when isLoading is true', async () => {
      store.overrideSelector(selectIsLoading, true);
      store.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isLoading$).toBeObservable(cold('a', { a: true }));
      //expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();
      expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTruthy();
    });

    it('should call onCreate when submit button is clicked', async () => {
      await fixture.whenStable();
      component.teamNo = teamNo;
      component.myForm.setValue({ 'name': 'team name' });
      fixture.detectChanges();
      await fixture.whenStable();

      spyOn(component, 'onCreate');
      //component.myForm.onSubmit(null);
      //fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.onCreate).toHaveBeenCalled();
      });
    });

    it('should call store dispatch createTeam when submit button is clicked', async () => {
      await fixture.whenStable();
      component.teamNo = teamNo;
      component.myForm.setValue({ 'name': 'team name' });
      fixture.detectChanges();
      await fixture.whenStable();

      spyOn(store, 'dispatch');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(DanceActions.createTeam({
          teamNo: teamNo,
          name: 'team name'
        }));
      });
    });

  });
