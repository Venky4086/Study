import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscusiionboardAccuracyComponent } from './discusiionboard-accuracy.component';

describe('DiscusiionboardAccuracyComponent', () => {
  let component: DiscusiionboardAccuracyComponent;
  let fixture: ComponentFixture<DiscusiionboardAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscusiionboardAccuracyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscusiionboardAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
