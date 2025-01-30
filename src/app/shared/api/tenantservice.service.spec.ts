import { TestBed } from '@angular/core/testing';

import { TenantserviceService } from './tenantservice.service';

describe('TenantserviceService', () => {
  let service: TenantserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
