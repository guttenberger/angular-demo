import { Routes } from '@angular/router';

import { LeadResolver } from '@features/leads/lead.resolver';

// Generate lead list routes based on statuses with lazy loading
export const LEAD_FORM_ROUTES: Routes = [
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./lead-form.component').then((m) => m.LeadFormComponent),
    resolve: { lead: LeadResolver },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./lead-form.component').then((m) => m.LeadFormComponent),
  },
];
