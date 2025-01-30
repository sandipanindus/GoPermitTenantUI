import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVisitorparkingAppointComponent } from './page-visitorparking-appoint.component';

describe('PageVisitorparkingAppointComponent', () => {
  let component: PageVisitorparkingAppointComponent;
  let fixture: ComponentFixture<PageVisitorparkingAppointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVisitorparkingAppointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVisitorparkingAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
