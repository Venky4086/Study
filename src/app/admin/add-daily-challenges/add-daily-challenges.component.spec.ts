import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyChallengesComponent } from './add-daily-challenges.component';

describe('AddDailyChallengesComponent', () => {
  let component: AddDailyChallengesComponent;
  let fixture: ComponentFixture<AddDailyChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailyChallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
