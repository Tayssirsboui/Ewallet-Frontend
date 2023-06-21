import { TestBed } from '@angular/core/testing';

import { RevenuserviceService } from './revenuservice.service';

describe('RevenuserviceService', () => {
  let service: RevenuserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenuserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
