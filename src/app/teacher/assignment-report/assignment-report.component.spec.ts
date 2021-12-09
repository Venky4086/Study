import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentReportComponent } from './assignment-report.component';

describe('AssignmentReportComponent', () => {
  let component: AssignmentReportComponent;
  let fixture: ComponentFixture<AssignmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
