import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'leads',
    loadChildren: () =>
      import('./features/leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
