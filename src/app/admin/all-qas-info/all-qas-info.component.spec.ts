import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQasInfoComponent } from './all-qas-info.component';

describe('AllQasInfoComponent', () => {
  let component: AllQasInfoComponent;
  let fixture: ComponentFixture<AllQasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQasInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
