import { Injectable } from '@angular/core';

import { LeadListService } from './lead-list.service';
import { LeadStatus } from '@features/leads/models/lead';

@Injectable()
export class PlacedLeadListService extends LeadListService {
  constructor() {
    super({
      title: 'Placed Leads',
      filterStatuses: [LeadStatus.Placed],
    });
  }
}
