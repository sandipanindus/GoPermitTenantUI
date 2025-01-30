import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesForgetpasswordComponent } from './pages-forgetpassword.component';

describe('PagesForgetpasswordComponent', () => {
  let component: PagesForgetpasswordComponent;
  let fixture: ComponentFixture<PagesForgetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesForgetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
