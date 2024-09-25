import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarService } from './components/sidebar/services/sidebar.service';
import { ResponsiveService } from '@core/services/responsive.service';
import { BackButtonComponent } from '../shared/components/back-button/back-button.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    RouterLink,
    RouterLinkActive,
    BackButtonComponent,
  ],
  providers: [SidebarService, ResponsiveService],
})
export class LayoutModule {}
