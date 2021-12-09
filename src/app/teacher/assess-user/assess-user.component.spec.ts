import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessUserComponent } from './assess-user.component';

describe('AssessUserComponent', () => {
  let component: AssessUserComponent;
  let fixture: ComponentFixture<AssessUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
