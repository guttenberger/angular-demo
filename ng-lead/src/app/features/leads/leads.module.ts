import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsStoreModule } from './store/leads-store.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LeadsRoutingModule, LeadsStoreModule],
})
export class LeadsModule {} // NgModule need to Lazy-load and register LeadsStoreModule once
