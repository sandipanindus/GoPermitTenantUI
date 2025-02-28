import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageChangePasswordComponent } from './page-change-password.component';

describe('PageChangePasswordComponent', () => {
  let component: PageChangePasswordComponent;
  let fixture: ComponentFixture<PageChangePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
