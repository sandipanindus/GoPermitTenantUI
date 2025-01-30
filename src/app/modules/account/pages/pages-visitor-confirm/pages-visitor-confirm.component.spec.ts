import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesVisitorConfirmComponent } from './pages-visitor-confirm.component';

describe('PagesVisitorConfirmComponent', () => {
  let component: PagesVisitorConfirmComponent;
  let fixture: ComponentFixture<PagesVisitorConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesVisitorConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesVisitorConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
