import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SidebarService {
  // Subject to trigger sidebar toggle events
  readonly #toggleSidebar$: Subject<void> = new Subject<void>();
  // Exposed observable for other components to listen to sidebar toggle events
  public toggleSidebar$: Observable<void> = this.#toggleSidebar$.asObservable();

  // Function to trigger the sidebar toggle event
  toggleSidebar(): void {
    this.#toggleSidebar$.next();
  }
}
