import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadDetailComponent } from './components/lead-detail/lead-detail.component';
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { LeadListComponent } from './components/lead-list/lead-list.component';
import { LeadResolver } from './lead.resolver';

const routes: Routes = [
  {
    path: '',
    component: LeadListComponent,
  },
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsRoutingModule {}
