import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialyChallengeQuestionViewComponent } from './daily-challenge-question-view.component';

describe('DialyChallengeQuestionViewComponent', () => {
  let component: DialyChallengeQuestionViewComponent;
  let fixture: ComponentFixture<DialyChallengeQuestionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialyChallengeQuestionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialyChallengeQuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
