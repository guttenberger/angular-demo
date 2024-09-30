import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  // Template Bindings
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  @HostBinding('class.is-mobile') isMobile =
    this.#responsiveService.isMobileSignal();

  // State
  protected toggleSidebar$ =
    this.#sidebarService.toggleSidebar$.pipe(takeUntilDestroyed());
  protected isMobileSignal = this.#responsiveService.isMobileSignal;

  ngAfterViewInit(): void {
    this.toggleSidebar$.subscribe(() => {
      this.sideNav.toggle();
    });
  }
}
