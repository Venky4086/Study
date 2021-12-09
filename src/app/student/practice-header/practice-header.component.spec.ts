import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeHeaderComponent } from './practice-header.component';

describe('PracticeHeaderComponent', () => {
  let component: PracticeHeaderComponent;
  let fixture: ComponentFixture<PracticeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
