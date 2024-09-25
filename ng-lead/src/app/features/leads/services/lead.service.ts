import { Injectable } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { EntityCollectionServiceBase } from '@ngrx/data';

import { SnackbarService } from '@core/services/snackbar.service';
import { GenericEntityService } from '@store/services/generic-entity.service';
import { Lead } from '../models/lead';

@Injectable()
export class LeadService extends GenericEntityService<Lead> {
  constructor(
    entityRepository: EntityCollectionServiceBase<Lead>,
    loadingService: LoadingService,
    snackbarService: SnackbarService,
  ) {
    super(entityRepository, loadingService, snackbarService);
  }
}
