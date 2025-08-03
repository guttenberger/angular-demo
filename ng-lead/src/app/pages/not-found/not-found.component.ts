import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  host: {
    class: 'not-found-component',
  },
})
export class NotFoundComponent {}
