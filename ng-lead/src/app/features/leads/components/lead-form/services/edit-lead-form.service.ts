import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Lead } from '@features/leads/models/lead';
import { LeadService } from '@features/leads/services/lead.service';
import { LeadFormService } from './lead-form.service';

@Injectable()
export class EditLeadFormService extends LeadFormService {
  // Services
  readonly #route = inject(ActivatedRoute);
  readonly #location = inject(Location);
  readonly #leadService = inject(LeadService);

  // State
  readonly #initialLead: Lead = this.#route.snapshot.data['lead'];

  constructor() {
    super({
      sectionTitle: 'Edit Lead',
      submitButtonText: 'Update Lead',
      showDeleteButton: true,
    });
  }

  // Set form values for editing a lead
  override setFormValues(leadForm: FormGroup): void {
    leadForm.patchValue({
      name: this.#initialLead.name || '',
      email: this.#initialLead.email || '',
      phone: this.#initialLead.phone || '',
      currentCompany: this.#initialLead.currentCompany || '',
      status: this.#initialLead.status || '',
      yearsOfExperience: this.#initialLead.yearsOfExperience || '',
      skills: this.#initialLead.skills
        ? this.#initialLead.skills.join(', ')
        : '',
      resumeUrl: this.#initialLead.resumeUrl || '',
      notes: this.#initialLead.notes || '',
    });
  }

  // Handle form submission for editing a lead
  onSubmitLead(leadData: Lead, leadForm: FormGroup): void {
    const updatedLead: Lead = {
      ...this.#initialLead,
      ...leadData,
      skills: leadForm.value.skills
        ? leadForm.value.skills.split(',').map((skill: string) => skill.trim())
        : [],
    };
    this.#leadService
      .update(updatedLead)
      .subscribe(() => this.#location.back());
  }

  // Handle lead deletion
  override onDeleteLead(): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.#leadService.delete(this.#initialLead.id).subscribe(() => {
        this.#location.historyGo(-2);
      });
    }
  }
}
