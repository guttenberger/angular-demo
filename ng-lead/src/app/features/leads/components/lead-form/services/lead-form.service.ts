import { FormGroup } from '@angular/forms';

import { Lead } from '@features/leads/models/lead';

interface LeadFormServiceOptions {
  sectionTitle: string;
  submitButtonText: string;
  showDeleteButton?: boolean;
}

export abstract class LeadFormService {
  // State
  readonly showDeleteButton: boolean;
  readonly sectionTitle: string;
  readonly submitButtonText: string;

  constructor({
    showDeleteButton,
    sectionTitle,
    submitButtonText,
  }: LeadFormServiceOptions) {
    this.showDeleteButton = showDeleteButton ?? false;
    this.sectionTitle = sectionTitle;
    this.submitButtonText = submitButtonText;
  }

  abstract onSubmitLead(leadData: Lead, leadForm: FormGroup): void;

  // Optional methods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setFormValues?(leadForm: FormGroup): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDeleteLead?(): void {}
}
