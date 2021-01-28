import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';
import { selectHasCompetitionFinished } from '../store/dance.selector';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectHasCompetitionFinished,
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
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should disable leaderboard link when hasCompetitionFinished is false', () => {
    store.overrideSelector(selectHasCompetitionFinished, false);
    store.refreshState();
    fixture.detectChanges();

    expect(component.hasCompetitionFinished$).toBeObservable(cold('a', { a: false }));
    expect(fixture.debugElement.query(By.css('li a.disabled'))).toBeTruthy();
  });

  it('should not disable leaderboard link when hasCompetitionFinished is true', () => {
    store.overrideSelector(selectHasCompetitionFinished, true);
    store.refreshState();
    fixture.detectChanges();

    expect(component.hasCompetitionFinished$).toBeObservable(cold('a', { a: true }));
    expect(fixture.debugElement.query(By.css('li a.disabled'))).toBeFalsy();
  });

});
