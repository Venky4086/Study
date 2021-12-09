import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstitutesComponent } from './manage-institutes.component';

describe('ManageInstitutesComponent', () => {
  let component: ManageInstitutesComponent;
  let fixture: ComponentFixture<ManageInstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInstitutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
