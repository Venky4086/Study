import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeMathsAccuracyComponent } from './practice-maths-accuracy.component';

describe('PracticeMathsAccuracyComponent', () => {
  let component: PracticeMathsAccuracyComponent;
  let fixture: ComponentFixture<PracticeMathsAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeMathsAccuracyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeMathsAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
