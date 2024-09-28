import { Type } from '@angular/core';

import { LeadStatusRoute } from '../lead-list.routes';
import { LeadListService } from './lead-list.service';
import { NewLeadListService } from './lead-types/new-lead-list.service';
import { PlacedLeadListService } from './lead-types/placed-lead-list.service';
import { QualifiedListService } from './lead-types/qualified-lead-list.service';
import { RejectedLeadListService } from './lead-types/rejected-lead-list.service';

// Maps each lead status route to its corresponding service class
export const LeadListServiceMap: Record<
  LeadStatusRoute | never,
  Type<LeadListService>
> = {
  new: NewLeadListService,
  placed: PlacedLeadListService,
  qualified: QualifiedListService,
  rejected: RejectedLeadListService,
};
