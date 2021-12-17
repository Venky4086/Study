import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Terms2Component } from './terms2.component';

describe('Terms2Component', () => {
  let component: Terms2Component;
  let fixture: ComponentFixture<Terms2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Terms2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Terms2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
