import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAccuracyComponent } from './test-accuracy.component';

describe('TestAccuracyComponent', () => {
  let component: TestAccuracyComponent;
  let fixture: ComponentFixture<TestAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAccuracyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
