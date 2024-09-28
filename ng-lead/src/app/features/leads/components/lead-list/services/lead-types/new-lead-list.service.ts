import { Injectable } from '@angular/core';

import { LeadStatus } from '@features/leads/models/lead';
import { LeadListService } from '../lead-list.service';

@Injectable()
export class NewLeadListService extends LeadListService {
  constructor() {
    super({
      title: 'New Leads',
      filterStatuses: [LeadStatus.New],
      viewModel: {
        showCreateButton: true,
        showQualifyButton: true,
      },
    });
  }
}
