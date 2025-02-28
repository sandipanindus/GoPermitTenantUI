import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageAddvehicleRegistrationComponent } from './page-addvehicle-registration.component';

describe('PageAddvehicleRegistrationComponent', () => {
  let component: PageAddvehicleRegistrationComponent;
  let fixture: ComponentFixture<PageAddvehicleRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddvehicleRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddvehicleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
