import { inject, ProviderToken, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LeadFormService } from './lead-form.service';
import { EditLeadFormService } from './edit-lead-form.service';
import { CreateLeadFormService } from './create-lead-form.service';

export const LeadFormServiceMap: Record<string, Type<LeadFormService>> = {
  // Maps the route path (e.g., 'edit', 'create') to its corresponding form service
  edit: EditLeadFormService,
  create: CreateLeadFormService,
};

// Factory function to provide service based on the route
export function leadFormServiceFactory(): LeadFormService {
  const route = inject(ActivatedRoute);
  const path = route.snapshot.url[0]?.path;

  // Dynamically resolve the service class from the map
  const serviceClass = LeadFormServiceMap[path];

  if (serviceClass) {
    // Dynamically create the instance using the injector
    return inject(serviceClass as ProviderToken<LeadFormService>);
  } else {
    throw new Error(`No matching service found for route: ${path}`);
  }
}
