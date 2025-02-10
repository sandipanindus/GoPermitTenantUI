import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddVisitorRegistrationComponent } from './page-add-visitor-registration.component';

describe('PageAddVisitorRegistrationComponent', () => {
  let component: PageAddVisitorRegistrationComponent;
  let fixture: ComponentFixture<PageAddVisitorRegistrationComponent>;

  beforeEach(async(() => {
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
