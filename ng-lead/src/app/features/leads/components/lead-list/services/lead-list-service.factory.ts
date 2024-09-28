import { inject, ProviderToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LeadStatusRoute } from '../lead-list.routes';
import { LeadListService } from './lead-list.service';
import { LeadListServiceMap } from './lead-list-service.map';

// Factory function to provide service based on the route
export function LeadListServiceFactory(): LeadListService {
  const route = inject(ActivatedRoute);
  const path = route.snapshot.url[0]?.path as LeadStatusRoute;

  // Dynamically resolve the service class from the map
  const serviceClass = LeadListServiceMap[path];

  if (serviceClass) {
    // Dynamically create the instance using the injector
    return inject(serviceClass as ProviderToken<LeadListService>);
  } else {
    throw new Error(`No matching service found for route: ${path}`);
  }
}
