import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutModule } from '@layout/layout.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
