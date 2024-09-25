import { Component, inject } from '@angular/core';

import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    class: 'layout-component',
  },
})
export class LayoutComponent {
  // Services
  readonly #loadingService = inject(LoadingService);

  // State
  protected readonly isLoadingSignal = this.#loadingService.loadingSignal;
}
