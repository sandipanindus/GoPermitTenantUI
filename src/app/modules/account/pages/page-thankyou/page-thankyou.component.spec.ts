import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageThankyouComponent } from './page-thankyou.component';

describe('PageThankyouComponent', () => {
  let component: PageThankyouComponent;
  let fixture: ComponentFixture<PageThankyouComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
