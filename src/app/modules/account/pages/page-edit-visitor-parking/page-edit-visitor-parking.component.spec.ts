import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditVisitorParkingComponent } from './page-edit-visitor-parking.component';

describe('PageEditVisitorParkingComponent', () => {
  let component: PageEditVisitorParkingComponent;
  let fixture: ComponentFixture<PageEditVisitorParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditVisitorParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditVisitorParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
