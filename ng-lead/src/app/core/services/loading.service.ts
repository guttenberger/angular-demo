import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // ensure singleton at root
})
export class LoadingService {
  readonly #loadingSignal = signal(false);

  loadingSignal = this.#loadingSignal.asReadonly();

  setLoading(loading: boolean) {
    this.#loadingSignal.set(loading);
  }
}
