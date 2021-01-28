import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { selectHasCompetitionFinished } from '../store/dance.selector';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],

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
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should be defined', () => expect(component).toBeDefined());

  it('should not display leaderboard when hasCompetitionFinished is false', () => {
    //testStore.select.and.returnValue(
    //  of({ hasCompetitionFinished: false })
    //);
    store.overrideSelector(selectHasCompetitionFinished, false);
    store.refreshState();
    fixture.detectChanges();

    expect(component.hasCompetitionFinished$).toBeObservable(cold('a', { a: false }));
    expect(fixture.debugElement.query(By.css('.nav-link span.fa-list'))).toBeFalsy();
  });

  it('should display leaderboard when hasCompetitionFinished is true', () => {
    store.overrideSelector(selectHasCompetitionFinished, true);
    store.refreshState();
    fixture.detectChanges();
    // Wait for ngOnInit(and its subscriptions) to complete
    //await fixture.whenStable();

    expect(component.hasCompetitionFinished$).toBeObservable(cold('a', { a: true }));
    expect(fixture.debugElement.query(By.css('.nav-link span.fa-list'))).toBeTruthy();
  });

});
