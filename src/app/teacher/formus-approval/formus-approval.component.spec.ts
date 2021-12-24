import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormusApprovalComponent } from './formus-approval.component';

describe('FormusApprovalComponent', () => {
  let component: FormusApprovalComponent;
  let fixture: ComponentFixture<FormusApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormusApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormusApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
