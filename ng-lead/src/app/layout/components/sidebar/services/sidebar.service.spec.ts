import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService],
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger toggleSidebar event', (done: DoneFn) => {
    // Use `take(1)` to automatically complete the observable after receiving the first value
    service.toggleSidebar$.pipe(take(1)).subscribe(() => {
      expect(true).toBe(true); // This is to ensure the subscription is triggered
      done(); // Indicate that the test is complete
    });

    // Trigger the toggle event
    service.toggleSidebar();
  });
});
