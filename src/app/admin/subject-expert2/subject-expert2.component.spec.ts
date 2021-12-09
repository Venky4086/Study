import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExpert2Component  } from './subject-expert2.component';

describe('SubjectExpert2Component ', () => {
  let component: SubjectExpert2Component ;
  let fixture: ComponentFixture<SubjectExpert2Component >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectExpert2Component  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExpert2Component );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
