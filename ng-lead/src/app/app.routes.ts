import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'leads',
    loadChildren: () =>
      import('./features/leads/leads.module').then((m) => m.LeadsModule),
  },
];
