import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddvehicleRegistrationComponent } from './page-addvehicle-registration.component';

describe('PageAddvehicleRegistrationComponent', () => {
  let component: PageAddvehicleRegistrationComponent;
  let fixture: ComponentFixture<PageAddvehicleRegistrationComponent>;

  beforeEach(async(() => {
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
