import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadDetailComponent } from './components/lead-detail/lead-detail.component';
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { LeadResolver } from './lead.resolver';
import { LeadsStoreModule } from './store/leads-store.module';
import { LEAD_LIST_ROUTES } from './components/lead-list/lead-list.routes';

const routes: Routes = [
  ...LEAD_LIST_ROUTES,
  {
    path: 'create',
    component: LeadFormComponent,
  },
  {
    path: 'edit/:id',
    component: LeadFormComponent,
    resolve: { lead: LeadResolver },
  },
  {
    path: 'detail/:id',
    component: LeadDetailComponent,
    resolve: { lead: LeadResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LeadsStoreModule],
  exports: [RouterModule],
})
export class LeadsRoutingModule {}
