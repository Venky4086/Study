import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAssignmentsComponent } from './post-assignments.component';

describe('PostAssignmentsComponent', () => {
  let component: PostAssignmentsComponent;
  let fixture: ComponentFixture<PostAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
