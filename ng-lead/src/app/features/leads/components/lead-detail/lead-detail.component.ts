import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

import { Lead, LeadStatus } from '@features/leads/models/lead';
import { LeadService } from '@features/leads/services/lead.service';
import { PropertyToTitlePipe } from '@shared/pipes/property-to-title.pipe';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatCardModule, PropertyToTitlePipe],
})
export class LeadDetailComponent {
  // Services
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #leadService = inject(LeadService);

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
    this.#leadService
      .update({ id, status })
      .subscribe((updatedLead) => this.leadSignal.set(updatedLead));
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
}
