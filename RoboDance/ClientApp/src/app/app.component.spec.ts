import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';
import { selectHasCompetitionFinished } from './store/dance.selector';
import * as Constants from './models/Constants';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ModalComponent,
        FooterComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectHasCompetitionFinished,
              value: false
            }
          ]
        })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should has the title', () => {
    expect(fixture.debugElement.query(By.css('h1'))).withContext(Constants.App_Title).toBeTruthy();
  });

});
