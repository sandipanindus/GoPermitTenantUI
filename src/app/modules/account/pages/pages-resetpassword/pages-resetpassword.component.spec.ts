import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesResetpasswordComponent } from './pages-resetpassword.component';

describe('PagesResetpasswordComponent', () => {
  let component: PagesResetpasswordComponent;
  let fixture: ComponentFixture<PagesResetpasswordComponent>;

  beforeEach(async(() => {
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
