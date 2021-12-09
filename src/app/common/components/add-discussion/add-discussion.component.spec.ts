import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscussionComponent } from './add-discussion.component';

describe('AddDiscussionComponent', () => {
  let component: AddDiscussionComponent;
  let fixture: ComponentFixture<AddDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
