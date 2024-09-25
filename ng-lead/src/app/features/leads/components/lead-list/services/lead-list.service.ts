import { computed, inject, Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';

import { Lead, LeadStatusType } from '@features/leads/models/lead';
import { LeadService } from '@features/leads/services/lead.service';

interface LeadListServiceOptions {
  title: string;
  filterStatuses?: LeadStatusType[];
  viewModel?: {
    showCreateButton?: boolean;
    showQualifyButton?: boolean;
    showPlacedButton?: boolean;
    showUnrejectButton?: boolean;
    showContactedButton?: boolean;
  };
}

@Injectable()
export abstract class LeadListService {
  // Services
  protected leadService = inject(LeadService);

  // State
  readonly title: string;
  readonly viewModel: Required<LeadListServiceOptions['viewModel']>;

  // Signals
  readonly entitiesSignal: Signal<Lead[]>;
  readonly isLoadingSignal = this.leadService.isLoadingSignal;

  constructor({ title, filterStatuses, viewModel }: LeadListServiceOptions) {
    this.title = title;
    this.viewModel = {
      showCreateButton: false,
      showQualifyButton: false,
      showPlacedButton: false,
      showUnrejectButton: false,
      showContactedButton: false,
      ...(viewModel ?? {}),
    };

    this.entitiesSignal = this.assignEntitySignal(filterStatuses);
  }

  loadAll(): Observable<Lead[]> {
    return this.leadService.loadAll();
  }

  delete(id: Lead['id']): Observable<Lead['id']> {
    return this.leadService.delete(id);
  }

  updateLeadStatus(id: number, status: Lead['status']): Observable<Lead> {
    return this.leadService.update({ id, status });
  }

  assignEntitySignal(
    filterStatuses: LeadStatusType[] | undefined,
  ): Signal<Lead[]> {
    const hasStatusFilter =
      Array.isArray(filterStatuses) && filterStatuses.length > 0;

    // Return the filtered leads if hasStatusFilter is true, otherwise return unfiltered leads
    return hasStatusFilter
      ? computed(() => {
          return (
            this.leadService
              .entitiesSignal()
              ?.filter((lead) => filterStatuses!.includes(lead.status)) || []
          );
        })
      : this.leadService.entitiesSignal;
  }
}
