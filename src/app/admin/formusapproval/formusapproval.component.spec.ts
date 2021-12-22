import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormusapprovalComponent } from './formusapproval.component';

describe('FormusapprovalComponent', () => {
  let component: FormusapprovalComponent;
  let fixture: ComponentFixture<FormusapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormusapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormusapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
