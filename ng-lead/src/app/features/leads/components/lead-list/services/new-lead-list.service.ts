import { Injectable } from '@angular/core';

import { LeadListService } from './lead-list.service';
import { LeadStatus } from '@features/leads/models/lead';

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
