import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const PAGES_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { hideBackButton: true },
  },
  { path: 'not-found', component: NotFoundComponent },
];
