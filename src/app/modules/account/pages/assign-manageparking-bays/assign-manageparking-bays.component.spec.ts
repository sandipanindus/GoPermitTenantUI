import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignManageparkingBaysComponent } from './assign-manageparking-bays.component';

describe('AssignManageparkingBaysComponent', () => {
  let component: AssignManageparkingBaysComponent;
  let fixture: ComponentFixture<AssignManageparkingBaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignManageparkingBaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignManageparkingBaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
