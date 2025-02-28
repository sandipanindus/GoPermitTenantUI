import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageAddVisitorRegistrationComponent } from './page-add-visitor-registration.component';

describe('PageAddVisitorRegistrationComponent', () => {
  let component: PageAddVisitorRegistrationComponent;
  let fixture: ComponentFixture<PageAddVisitorRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddVisitorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddVisitorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
