import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { Lead, LeadStatus } from '@features/leads/models/lead';
import { PropertyToTitlePipe } from '@shared/pipes/property-to-title.pipe';
import { LeadListServiceFactory } from './services/lead-list-service.factory';
import { LeadListService } from './services/lead-list.service';
import { LeadListServiceMap } from './services/lead-list-service.map';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ScrollingModule,
    PropertyToTitlePipe,
    ScrollingModule,
  ],
  providers: [
    // Provides all lead list service classes based on routes
    ...Object.values(LeadListServiceMap),
    {
      provide: LeadListService,
      useFactory: LeadListServiceFactory,
      deps: [Injector],
    },
  ],
})
export class LeadListComponent implements OnInit {
  // Services
  readonly #router = inject(Router);
  readonly #leadListService = inject(LeadListService);

  // State
  protected readonly title = this.#leadListService.title;
  protected readonly leadsSignal = this.#leadListService.entitiesSignal;
  protected readonly isLoadingSignal = this.#leadListService.isLoadingSignal;
  protected readonly viewModel = this.#leadListService.viewModel;
  protected readonly leadStatus = LeadStatus;
  // Table properties
  protected readonly textColumns: (keyof Lead)[] = [
    'name',
    'email',
    'status',
    'yearsOfExperience',
    'skills',
  ];
  protected readonly allColumns = [...this.textColumns, 'actions'];
  protected readonly skeletonRows = new Array(5);

  // Generalized status updater function
  readonly #statusUpdater = this.#leadListService.updateLeadStatus;

  ngOnInit(): void {
    // fetch leads
    this.#leadListService.loadAll();
  }

  createNewLead() {
    this.#router.navigate([`/leads/create`]);
  }

  viewLead(id: number) {
    this.#router.navigate([`/leads/detail`, id]);
  }

  /// Specific status update methods
  rejectLead = (id: number) => this.#statusUpdater(id, LeadStatus.Rejected);
  unrejectLead = (id: number) => this.#statusUpdater(id, LeadStatus.New);
  qualifyLead = (id: number) => this.#statusUpdater(id, LeadStatus.Qualified);
  placedLead = (id: number) => this.#statusUpdater(id, LeadStatus.Placed);
  contactedLead = (id: number) => this.#statusUpdater(id, LeadStatus.Contacted);
}
