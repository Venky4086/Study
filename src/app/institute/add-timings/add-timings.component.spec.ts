import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimingsComponent } from './add-timings.component';

describe('AddTimingsComponent', () => {
  let component: AddTimingsComponent;
  let fixture: ComponentFixture<AddTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
