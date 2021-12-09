import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsolutionComponent } from './qsolution.component';

describe('QsolutionComponent', () => {
  let component: QsolutionComponent;
  let fixture: ComponentFixture<QsolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
