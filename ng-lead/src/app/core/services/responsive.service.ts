import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root', // ensure singleton at root level
})
export class ResponsiveService {
  // Services
  readonly #breakpointObserver = inject(BreakpointObserver);

  // Exposed
  isMobileSignal = toSignal(
    this.#breakpointObserver
      .observe([Breakpoints.Handset]) // Mobile Breakpoint
      .pipe(map((result) => result.matches)),
  );
}
