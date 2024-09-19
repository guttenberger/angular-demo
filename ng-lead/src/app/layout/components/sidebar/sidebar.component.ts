import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: { class: 'sidebar-component' },
})
export class SidebarComponent implements OnDestroy, AfterViewInit {
  private sidebarService = inject(SidebarService);
  private responsiveService = inject(ResponsiveService);
  private cdr = inject(ChangeDetectorRef);

  private subscriptions: Subscription = new Subscription();

  protected isMobileValue = false;

  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  // Dynamically add the 'is-mobile' class to the host element
  @HostBinding('class.is-mobile') get isMobile() {
    return this.isMobileValue;
  }

  ngAfterViewInit(): void {
    this.handleSidebarToggle(); // listen for toggle sidebar event
    this.monitorScreenSize(); // listen for mobile screen size event
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleSidebarToggle(): void {
    const sidebarSubscription = this.sidebarService.toggleSidebar$.subscribe(
      () => {
        this.sideNav.toggle();
      },
    );
    this.subscriptions.add(sidebarSubscription);
  }

  private monitorScreenSize(): void {
    const mobileSubscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobileValue = isMobile;
        this.cdr.detectChanges();
      },
    );
    this.subscriptions.add(mobileSubscription);
  }
}
