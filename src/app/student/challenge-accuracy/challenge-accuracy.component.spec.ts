import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeAccuracyComponent } from './challenge-accuracy.component';

describe('ChallengeAccuracyComponent', () => {
  let component: ChallengeAccuracyComponent;
  let fixture: ComponentFixture<ChallengeAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeAccuracyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
