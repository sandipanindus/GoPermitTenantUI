import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagesResetpasswordComponent } from './pages-resetpassword.component';

describe('PagesResetpasswordComponent', () => {
  let component: PagesResetpasswordComponent;
  let fixture: ComponentFixture<PagesResetpasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
