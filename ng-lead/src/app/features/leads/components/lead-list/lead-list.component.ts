import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { LeadListService } from './services/lead-list.service';
import { Lead, LeadStatus } from '@features/leads/models/lead';
import { PropertyToTitlePipe } from '@shared/pipes/property-to-title.pipe';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ScrollingModule,
    PropertyToTitlePipe,
    ScrollingModule,
  ],
})
export class LeadListComponent implements OnInit {
  // Services
  readonly #router = inject(Router);
  readonly #leadListService = inject(LeadListService); // provide in route module

  // State
  protected readonly title = this.#leadListService.title;
  protected readonly leadsSignal = this.#leadListService.entitiesSignal;
  protected readonly isLoadingSignal = this.#leadListService.isLoadingSignal;
  protected readonly viewModel = this.#leadListService.viewModel!;
  protected readonly isDataAvailable = computed(
    () => this.leadsSignal().length > 0 || !this.isLoadingSignal(),
  );
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

  // Skeleton properties
  protected readonly skeletonRows = new Array(10);
  protected readonly skeletonData = new Array(8).fill({
    name: '',
    email: '',
    status: '',
    actions: '',
  });

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

  rejectLead(id: number): void {
    this.#leadListService.updateLeadStatus(id, LeadStatus.Rejected);
  }

  unrejectLead(id: number): void {
    this.#leadListService.updateLeadStatus(id, LeadStatus.New);
  }

  qualifyLead(id: number): void {
    this.#leadListService.updateLeadStatus(id, LeadStatus.Qualified);
  }

  placedLead(id: number): void {
    this.#leadListService.updateLeadStatus(id, LeadStatus.Placed);
  }

  contactedLead(id: number): void {
    this.#leadListService.updateLeadStatus(id, LeadStatus.Contacted);
  }
}
