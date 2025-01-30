import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSetpasswordComponent } from './page-setpassword.component';

describe('PageSetpasswordComponent', () => {
  let component: PageSetpasswordComponent;
  let fixture: ComponentFixture<PageSetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
