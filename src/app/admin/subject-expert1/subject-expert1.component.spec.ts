import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExpert1Component  } from './subject-expert1.component';

describe('SubjectExpert1Component ', () => {
  let component: SubjectExpert1Component ;
  let fixture: ComponentFixture<SubjectExpert1Component >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectExpert1Component  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExpert1Component );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
