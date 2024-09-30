import { Routes } from '@angular/router';

import { PAGES_ROUTES } from '@pages/pages.routes';

export const routes: Routes = [
  ...PAGES_ROUTES,
  {
    path: 'leads',
    loadChildren: () =>
      import('./features/leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
