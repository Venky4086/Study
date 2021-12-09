import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QhistoryComponent } from './qhistory.component';

describe('QhistoryComponent', () => {
  let component: QhistoryComponent;
  let fixture: ComponentFixture<QhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
