import { Injectable, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ReplaySubject, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: null,
})
export class ResponsiveService implements OnDestroy {
  // Subject that holds the last emitted value for mobile status
  private isMobileSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1,
  );
  // Exposed observable for other components to listen to screen size change events
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  // Media query to detect screen size changes
  private mobileQuery: MediaQueryList;
  // Listener to trigger when screen size changes
  private readonly mobileQueryListener: () => void;

  constructor(private mediaMatcher: MediaMatcher) {
    // Set up media query to listen for screen sizes under 600px
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.updateMobileStatus();

    // Initial check for the current screen size
    this.updateMobileStatus();

    // Add event listener for screen size changes (modern and legacy browser support)
    if (this.mobileQuery.addEventListener!) {
      // Use debouncing to limit frequent changes during window resize events
      fromEvent(this.mobileQuery, 'change')
        .pipe(debounceTime(100))
        .subscribe(this.mobileQueryListener);
    } else if (this.mobileQuery.addListener) {
      // Legacy browser support for older event listeners
      this.mobileQuery.addListener(this.mobileQueryListener);
    }
  }

  // Updates the mobile status and emits the value through the ReplaySubject
  private updateMobileStatus(): void {
    const isMobile = this.mobileQuery.matches;
    this.isMobileSubject.next(isMobile); // Emit the current mobile status
  }

  // Clean up media query listeners when no longer needed to prevent memory leaks
  public ngOnDestroy(): void {
    if (this.mobileQuery.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    } else if (this.mobileQuery.removeListener) {
      // Legacy browser support for removing older event listeners
      this.mobileQuery.removeListener(this.mobileQueryListener);
    }
  }
}
