import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  host: {
    class: 'dashboard-container',
  },
})
export class DashboardComponent {
  // Services
  readonly #router = inject(Router);

  navigateTo(route: string): void {
    this.#router.navigate([`/leads/${route}`]);
  }
}
