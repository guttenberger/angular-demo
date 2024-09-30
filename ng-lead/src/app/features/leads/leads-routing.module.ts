import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LEAD_FORM_ROUTES } from './components/lead-form/lead-form.routes';
import { LEAD_LIST_ROUTES } from './components/lead-list/lead-list.routes';
import { LeadResolver } from './lead.resolver';

const routes: Routes = [
  ...LEAD_LIST_ROUTES,
  ...LEAD_FORM_ROUTES,
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./components/lead-detail/lead-detail.component').then(
        (m) => m.LeadDetailComponent,
      ),
    resolve: { lead: LeadResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsRoutingModule {}
