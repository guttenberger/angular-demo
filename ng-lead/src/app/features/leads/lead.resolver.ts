import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';

import { Lead } from './models/lead';
import { LeadService } from './services/lead.service';

export const LeadResolver: ResolveFn<Lead | undefined> = (
  route,
): Observable<Lead | undefined> => {
  const _leadService = inject(LeadService);

  // read id from route
  const id = route.paramMap.get('id');

  if (id) {
    const leadId = Number(id);

    // Try reading lead from cache
    const lead = _leadService
      .entitiesSignal()
      ?.find((lead) => lead.id === leadId);

    if (lead) {
      // If lead is found in the cache, return it
      return of(lead);
    }

    // If not found, fetch it from the backend
    return _leadService.getById(leadId).pipe(filter(Boolean), take(1));
  }

  return of(undefined); // If no id is provided, return undefined
};
