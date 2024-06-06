import { Component, inject } from '@angular/core';
import { PeopleService } from './pages/people/people.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="mat-app-background h-dvh w-dvw p-8 flex items-center justify-center overflow-hidden"
    >
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  service = inject(PeopleService);

  constructor() {
    this.service.getPeople$();
  }
}
