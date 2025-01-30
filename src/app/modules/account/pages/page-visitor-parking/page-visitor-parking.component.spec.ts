import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVisitorParkingComponent } from './page-visitor-parking.component';

describe('PageVisitorParkingComponent', () => {
  let component: PageVisitorParkingComponent;
  let fixture: ComponentFixture<PageVisitorParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVisitorParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVisitorParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
