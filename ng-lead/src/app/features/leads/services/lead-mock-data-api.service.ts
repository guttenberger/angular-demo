import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrlGenerator } from '@ngrx/data';

import { GenericMockDataApiService } from '@store/services/generic-mock-data-api.service';
import { Lead } from '../models/lead';
import { LEAD_MOCK_DATA } from '../models/lead-mock-data';

@Injectable()
export class LeadMockDataApiService extends GenericMockDataApiService<Lead> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Lead', http, httpUrlGenerator, LEAD_MOCK_DATA);
  }
}
