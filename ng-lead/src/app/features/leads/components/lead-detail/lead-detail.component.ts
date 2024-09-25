import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Lead, LeadStatus } from '@features/leads/models/lead';
import { LeadService } from '@features/leads/services/lead.service';
import { PropertyToTitlePipe } from '@shared/pipes/property-to-title.pipe';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, PropertyToTitlePipe],
})
export class LeadDetailComponent implements OnDestroy {
  // Services
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #leadService = inject(LeadService);

  // Subscriptions
  readonly #subscriptions = new Subscription();

  // State
  protected leadSignal = signal<Lead>(this.#route.snapshot.data['lead']);
  protected readonly fieldsToDisplay: (keyof Lead)[] = [
    'name',
    'email',
    'status',
    'phone',
    'currentCompany',
    'yearsOfExperience',
    'skills',
    'resumeUrl',
    'notes',
  ];

  // method to update lead status
  #updateLeadStatus(id: number, status: Lead['status']): void {
    const updateLeadSubscription = this.#leadService
      .update({ id, status })
      .subscribe((updatedLead) => this.leadSignal.set(updatedLead));

    this.#subscriptions.add(updateLeadSubscription);
  }

  newLead(id: number): void {
    this.#updateLeadStatus(id, LeadStatus.New);
  }

  qualifyLead(id: number): void {
    this.#updateLeadStatus(id, LeadStatus.Qualified);
  }

  rejectLead(id: number): void {
    this.#updateLeadStatus(id, LeadStatus.Rejected);
  }

  contactedLead(id: number): void {
    this.#updateLeadStatus(id, LeadStatus.Contacted);
  }

  editLead(id: number): void {
    this.#router.navigate(['/leads', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
