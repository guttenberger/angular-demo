import { Injectable } from '@angular/core';

import { LeadStatus } from '@features/leads/models/lead';
import { LeadListService } from '../lead-list.service';

@Injectable()
export class PlacedLeadListService extends LeadListService {
  constructor() {
    super({
      title: 'Placed Leads',
      filterStatuses: [LeadStatus.Placed],
    });
  }
}
