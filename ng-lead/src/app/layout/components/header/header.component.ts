import { Component, inject } from '@angular/core';

import { SidebarService } from '../sidebar/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly sidebarService = inject(SidebarService);

  onLogout(): void {
    console.log('User logged out');
  }
}
