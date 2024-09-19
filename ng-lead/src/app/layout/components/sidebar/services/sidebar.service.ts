import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class SidebarService {
  // Subject to trigger sidebar toggle events
  private _toggleSidebar$: Subject<void> = new Subject<void>();
  // Exposed observable for other components to listen to sidebar toggle events
  public toggleSidebar$: Observable<void> = this._toggleSidebar$.asObservable();

  // Function to trigger the sidebar toggle event
  toggleSidebar(): void {
    this._toggleSidebar$.next();
  }
}
