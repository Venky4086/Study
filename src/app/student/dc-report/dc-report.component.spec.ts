import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcReportComponent } from './dc-report.component';

describe('DcReportComponent', () => {
  let component: DcReportComponent;
  let fixture: ComponentFixture<DcReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
