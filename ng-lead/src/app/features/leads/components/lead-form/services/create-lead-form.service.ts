import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Lead, LeadStatus } from '@features/leads/models/lead';
import { LeadService } from '@features/leads/services/lead.service';
import { LeadFormService } from './lead-form.service';

@Injectable()
export class CreateLeadFormService extends LeadFormService {
  // Services
  readonly #location = inject(Location);
  readonly #leadService = inject(LeadService);

  constructor() {
    super({ sectionTitle: 'Add New Lead', submitButtonText: 'Create Lead' });
  }

  // Handle form submission for creating a new lead
  onSubmitLead(leadData: Lead, leadForm: FormGroup): void {
    const newLead: Lead = {
      ...leadData,
      status: LeadStatus.New,
      skills: leadForm.value.skills
        ? leadForm.value.skills.split(',').map((skill: string) => skill.trim())
        : [],
      id: 0,
    };

    this.#leadService
      .add(newLead)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.#location.back());
  }
}
