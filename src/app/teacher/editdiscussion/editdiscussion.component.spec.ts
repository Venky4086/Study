import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdiscussionComponent } from './editdiscussion.component';

describe('EditdiscussionComponent', () => {
  let component: EditdiscussionComponent;
  let fixture: ComponentFixture<EditdiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
