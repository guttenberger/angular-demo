import { inject, NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityCollectionServiceBase,
  EntityCollectionServiceFactory,
  EntityDataService,
} from '@ngrx/data';

import { environment } from '@env/environment.prod';
import { Lead } from '../models/lead';
import { LeadMockDataApiService } from '../services/lead-mock-data-api.service';
import { LeadService } from '../services/lead.service';

@NgModule({
  providers: [
    // Provide NgRx data service config from environment
    { provide: DefaultDataServiceConfig, useValue: environment.ngrxDataConfig },

    LeadService,
    LeadMockDataApiService,

    // Use Factory for creating lead ngrx repository (EntityCollectionServiceBase<Lead>)
    {
      provide: EntityCollectionServiceBase<Lead>,
      useFactory: (
        entityCollectionServiceFactory: EntityCollectionServiceFactory,
      ) => entityCollectionServiceFactory.create<Lead>('Lead'),
      deps: [EntityCollectionServiceFactory],
    },
  ],
})
export class LeadsStoreModule {
  readonly #entityDataService = inject(EntityDataService);
  readonly #leadMockDataService = inject(LeadMockDataApiService);

  constructor() {
    // Use mock data service instead of doing api calls
    this.#entityDataService.registerService('Lead', this.#leadMockDataService);
  }
}
