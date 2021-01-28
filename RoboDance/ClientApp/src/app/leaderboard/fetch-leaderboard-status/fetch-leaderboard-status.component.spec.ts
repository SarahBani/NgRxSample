import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { By } from '@angular/platform-browser';

import { FetchLeaderboardStatusComponent } from './fetch-leaderboard-status.component';
import { selectHasApiConnectionProblem } from '../../store/dance.selector';
import * as DanceActions from '../../store/dance.actions';

describe('FetchLeaderboardStatusComponent', () => {
  let component: FetchLeaderboardStatusComponent;
  let fixture: ComponentFixture<FetchLeaderboardStatusComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchLeaderboardStatusComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectHasApiConnectionProblem,
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
    fixture = TestBed.createComponent(FetchLeaderboardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should display Connecting to the API when hasApiConnectionProblem is false', () => {
    store.overrideSelector(selectHasApiConnectionProblem, false);
    store.refreshState();
    fixture.detectChanges();

    expect(component.hasApiConnectionProblem$).toBeObservable(cold('a', { a: false }));
    expect(fixture.debugElement.query(By.css('h4'))).withContext("Connecting to the API. Please wait ...");
  });

  it('should display Unable to connect to the API when hasApiConnectionProblem is true', () => {
    store.overrideSelector(selectHasApiConnectionProblem, true);
    store.refreshState();
    fixture.detectChanges();

    expect(component.hasApiConnectionProblem$).toBeObservable(cold('a', { a: true }));
    expect(fixture.debugElement.query(By.css('h4'))).withContext("Unable to connect to the API!");
  });

  it('should call onRefetch when TryAgain button is clicked', () => {
    store.overrideSelector(selectHasApiConnectionProblem, true);
    store.refreshState();
    fixture.detectChanges();

    const spyRefetch =  spyOn(component, 'onRefetch');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-refresh.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(spyRefetch).toHaveBeenCalled();
    });
  });

  it('should store dispatch fetchLeaderboard when TryAgain button is clicked', () => {
    store.overrideSelector(selectHasApiConnectionProblem, true);
    store.refreshState();
    fixture.detectChanges();

    const dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('span.fa-refresh.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(DanceActions.fetchLeaderboard());
    });
  });

});
