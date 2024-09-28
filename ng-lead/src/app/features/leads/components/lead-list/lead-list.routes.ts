import { Routes } from '@angular/router';

export const STATUS_BASED_ROUTES = [
  'new',
  'qualified',
  'placed',
  'rejected',
] as const;

export type LeadStatusRoute = (typeof STATUS_BASED_ROUTES)[number];

// Generate lead list routes based on statuses with lazy loading
export const LEAD_LIST_ROUTES: Routes = STATUS_BASED_ROUTES.map((status) => ({
  path: status,
  loadComponent: () =>
    import('./lead-list.component').then((m) => m.LeadListComponent), // Lazy load the component
}));
