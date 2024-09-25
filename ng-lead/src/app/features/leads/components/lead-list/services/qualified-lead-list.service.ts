import { Injectable } from '@angular/core';

import { LeadStatus } from '@features/leads/models/lead';
import { LeadListService } from './lead-list.service';

@Injectable()
export class QualifiedListService extends LeadListService {
  constructor() {
    super({
      title: 'Qualified Leads',
      filterStatuses: [LeadStatus.Contacted, LeadStatus.Qualified],
      viewModel: {
        showPlacedButton: true,
        showContactedButton: true,
      },
    });
  }
}
