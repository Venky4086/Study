import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubmitComponent } from './test-submit.component';

describe('TestSubmitComponent', () => {
  let component: TestSubmitComponent;
  let fixture: ComponentFixture<TestSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
