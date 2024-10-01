import { Component, inject, Injector, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EditLeadFormService } from './services/edit-lead-form.service';
import { LeadFormService } from './services/lead-form.service';
import { CreateLeadFormService } from './services/create-lead-form.service';
import { leadFormServiceFactory } from './services/lead-form-service.factory';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  host: {
    class: 'lead-form-component',
  },
  providers: [
    // Dynamically provide the appropriate LeadFormService based on the route.
    // This is done at the component level to ensure the service is recreated
    // for each use of the component, rather than sharing a single instance across routes
    EditLeadFormService,
    CreateLeadFormService,
    {
      provide: LeadFormService,
      useFactory: leadFormServiceFactory,
      deps: [Injector],
    },
  ],
})
export class LeadFormComponent implements OnInit {
  // Services
  readonly #fb = inject(FormBuilder);
  readonly #leadFormService = inject(LeadFormService);

  // State
  protected sectionTitle = this.#leadFormService.sectionTitle;
  protected submitButtonText = this.#leadFormService.submitButtonText;
  protected showDeleteButton = this.#leadFormService.showDeleteButton;
  protected fields = [
    {
      label: 'Lead Name',
      formControlName: 'name',
      placeholder: 'Enter lead name',
      validators: [Validators.required],
      errorMessage: 'Name is required.',
    },
    // #region Form field configuration
    {
      label: 'Email',
      formControlName: 'email',
      placeholder: 'Enter lead email',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Please enter a valid email.',
    },
    {
      label: 'Phone',
      formControlName: 'phone',
      placeholder: 'Enter lead phone number',
      validators: [],
    },
    {
      label: 'Current Company',
      formControlName: 'currentCompany',
      placeholder: 'Enter company name',
      validators: [],
    },
    {
      label: 'Years of Experience',
      formControlName: 'yearsOfExperience',
      placeholder: 'Enter years of experience',
      validators: [],
    },
    {
      label: 'Skills',
      formControlName: 'skills',
      placeholder: 'Enter skills (comma-separated)',
      validators: [],
    },
    {
      label: 'Resume URL',
      formControlName: 'resumeUrl',
      placeholder: 'Enter resume URL',
      validators: [],
    },
    {
      label: 'Notes',
      formControlName: 'notes',
      placeholder: 'Enter additional notes',
      validators: [],
    },
    // #endregion
  ];
  protected leadForm = this.createFormGroup(this.fields);

  ngOnInit(): void {
    this.#leadFormService.setFormValues?.(this.leadForm);
  }

  createFormGroup(fields: typeof this.fields): FormGroup {
    const formControls = fields.reduce(
      (controls, field) => {
        controls[field.formControlName] = ['', field.validators];
        return controls;
      },
      {} as Record<string, unknown>,
    );

    return this.#fb.group(formControls);
  }

  onSubmit(): void {
    if (this.leadForm.invalid) return;
    this.#leadFormService.onSubmitLead(this.leadForm.value, this.leadForm);
  }

  onDelete(event: Event): void {
    // Prevent form submission on delete button click
    event.preventDefault();
    this.#leadFormService.onDeleteLead?.();
  }
}
