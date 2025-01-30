import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVisitorParkingEditComponent } from './page-visitor-parking-edit.component';

describe('PageVisitorParkingEditComponent', () => {
  let component: PageVisitorParkingEditComponent;
  let fixture: ComponentFixture<PageVisitorParkingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVisitorParkingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVisitorParkingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
