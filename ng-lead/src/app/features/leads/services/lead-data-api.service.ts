import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Lead } from '../models/lead';

@Injectable()
export class LeadDataApiService extends DefaultDataService<Lead> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Lead', http, httpUrlGenerator);
  }
}
