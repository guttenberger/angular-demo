import { Injectable } from '@angular/core';

import { LeadStatus } from '@features/leads/models/lead';
import { LeadListService } from './lead-list.service';

@Injectable()
export class RejectedLeadListService extends LeadListService {
  constructor() {
    super({
      title: 'Rejected Leads',
      filterStatuses: [LeadStatus.Rejected],
      viewModel: {
        showUnrejectButton: true,
      },
    });
  }
}
