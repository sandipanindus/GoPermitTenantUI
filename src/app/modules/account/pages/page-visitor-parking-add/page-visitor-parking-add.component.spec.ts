import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageVisitorParkingAddComponent } from './page-visitor-parking-add.component';

describe('PageVisitorParkingAddComponent', () => {
  let component: PageVisitorParkingAddComponent;
  let fixture: ComponentFixture<PageVisitorParkingAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVisitorParkingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVisitorParkingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
