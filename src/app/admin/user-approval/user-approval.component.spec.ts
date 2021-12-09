import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovalComponent } from './user-approval.component';

describe('UserApprovalComponent', () => {
  let component: UserApprovalComponent;
  let fixture: ComponentFixture<UserApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
