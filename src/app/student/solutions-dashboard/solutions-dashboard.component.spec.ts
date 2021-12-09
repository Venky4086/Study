import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsDashboardComponent } from './solutions-dashboard.component';

describe('SolutionsDashboardComponent', () => {
  let component: SolutionsDashboardComponent;
  let fixture: ComponentFixture<SolutionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
