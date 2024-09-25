import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadDetailComponent } from './components/lead-detail/lead-detail.component';
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { LeadListComponent } from './components/lead-list/lead-list.component';
import {
  LeadListService,
  NewLeadListService,
  PlacedLeadListService,
  QualifiedListService,
  RejectedLeadListService,
} from './components/lead-list/services';
import { LeadResolver } from './lead.resolver';
import { LeadsStoreModule } from './store/leads-store.module';

const routes: Routes = [
  {
    path: 'new',
    component: LeadListComponent,
    providers: [{ provide: LeadListService, useClass: NewLeadListService }],
  },
  {
    path: 'qualified',
    component: LeadListComponent,
    providers: [{ provide: LeadListService, useClass: QualifiedListService }],
  },
  {
    path: 'placed',
    component: LeadListComponent,
    providers: [{ provide: LeadListService, useClass: PlacedLeadListService }],
  },
  {
    path: 'rejected',
    component: LeadListComponent,
    providers: [
      { provide: LeadListService, useClass: RejectedLeadListService },
    ],
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
  imports: [RouterModule.forChild(routes), LeadsStoreModule],
  exports: [RouterModule],
})
export class LeadsRoutingModule {}
