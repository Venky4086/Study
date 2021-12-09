import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractiseQuestionComponent } from './practise-question.component';

describe('PractiseQuestionComponent', () => {
  let component: PractiseQuestionComponent;
  let fixture: ComponentFixture<PractiseQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractiseQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractiseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
