import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap, shareReplay, filter } from 'rxjs/operators';

// Utility function to get data from the current active route
export function traverseAndGetCurrentRouteData$(
  router: Router,
  route: ActivatedRoute,
): ActivatedRoute['data'] {
  // Listen for route changes
  return router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    switchMap(() => {
      let currentRoute = route;

      // Traverse to the deepest child route
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      // Return the observable of the last child route's data
      return currentRoute.data;
    }),
    shareReplay(1),
  );
}
