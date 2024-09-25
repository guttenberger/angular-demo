import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  ViewChild,
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
export class SidebarComponent implements AfterViewInit {
  // Services
  readonly #sidebarService = inject(SidebarService);
  readonly #responsiveService = inject(ResponsiveService);

  // Subscriptions
  readonly #subscriptions = new Subscription();

  // Template Bindings
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  @HostBinding('class.is-mobile') isMobile =
    this.#responsiveService.isMobileSignal();

  // State
  protected isMobileSignal = this.#responsiveService.isMobileSignal;

  ngAfterViewInit(): void {
    this.#toggleSidebar(); // Set up sidebar toggle event listener
  }

  #toggleSidebar(): void {
    const sidebarToggleSubscription =
      this.#sidebarService.toggleSidebar$.subscribe(() => {
        this.sideNav.toggle();
      });

    this.#subscriptions.add(sidebarToggleSubscription);
  }
}
