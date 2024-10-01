import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { traverseAndGetCurrentRouteData$ } from '@shared/utils/route-utils';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  // Services
  readonly #location = inject(Location);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  // State
  readonly #currentRouteData$ = traverseAndGetCurrentRouteData$(
    this.#router,
    this.#route,
  );
  readonly showBackButtonSignal = toSignal(
    this.#currentRouteData$.pipe(
      map((data) => (data['hideBackButton'] ? false : true)),
    ),
  );

  goBack() {
    const isFirstPageInHistory = window.history.length === 0;

    if (isFirstPageInHistory) {
      this.#router.navigate(['/']);
    } else {
      this.#location.back();
    }
  }
}
