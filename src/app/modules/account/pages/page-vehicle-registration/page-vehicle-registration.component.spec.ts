import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVehicleRegistrationComponent } from './page-vehicle-registration.component';

describe('PageVehicleRegistrationComponent', () => {
  let component: PageVehicleRegistrationComponent;
  let fixture: ComponentFixture<PageVehicleRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVehicleRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVehicleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
