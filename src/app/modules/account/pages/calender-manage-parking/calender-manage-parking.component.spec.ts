import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderManageParkingComponent } from './calender-manage-parking.component';

describe('CalenderManageParkingComponent', () => {
  let component: CalenderManageParkingComponent;
  let fixture: ComponentFixture<CalenderManageParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderManageParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderManageParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
