import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QdiscussionComponent } from './qdiscussion.component';

describe('QdiscussionComponent', () => {
  let component: QdiscussionComponent;
  let fixture: ComponentFixture<QdiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QdiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QdiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
