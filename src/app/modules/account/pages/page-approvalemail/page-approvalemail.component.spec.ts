import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageApprovalemailComponent } from './page-approvalemail.component';

describe('PageApprovalemailComponent', () => {
  let component: PageApprovalemailComponent;
  let fixture: ComponentFixture<PageApprovalemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageApprovalemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageApprovalemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
