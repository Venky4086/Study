import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdminComponent } from './general-admin.component';

describe('GeneralAdminComponent', () => {
  let component: GeneralAdminComponent;
  let fixture: ComponentFixture<GeneralAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
