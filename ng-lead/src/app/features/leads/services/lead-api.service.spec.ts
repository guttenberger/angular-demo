import { TestBed } from '@angular/core/testing';

import { LeadApiService } from './lead-api.service';

describe('LeadApiService', () => {
  let service: LeadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
