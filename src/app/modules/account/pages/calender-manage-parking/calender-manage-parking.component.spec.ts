import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalenderManageParkingComponent } from './calender-manage-parking.component';

describe('CalenderManageParkingComponent', () => {
  let component: CalenderManageParkingComponent;
  let fixture: ComponentFixture<CalenderManageParkingComponent>;

  beforeEach(waitForAsync(() => {
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
