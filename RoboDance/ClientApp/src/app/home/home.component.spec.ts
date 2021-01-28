import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of();
    }
  }
};

const routerSpy = {
  navigate: jasmine.createSpy('navigate')
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    routerSpy.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should call onNewCompetition when New Competition button is clicked', async () => {
    const onNewCompetitionSpy = spyOn(component, 'onNewCompetition');
    const button = fixture.debugElement.nativeElement.querySelector('span.button');
    button.click();

    await fixture.whenStable();
    expect(onNewCompetitionSpy).toHaveBeenCalled();
  });

  it('should navigate to competition when New Competition button is clicked', async () => {
    const button = fixture.debugElement.nativeElement.querySelector('span.button');
    button.click();

    fixture.whenStable().then(() => {
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['competition'], { relativeTo: activatedRouteStub });
    });
  });

});
