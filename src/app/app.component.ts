import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: `
    <div
      class="mat-app-background h-dvh w-dvw p-8 flex items-center justify-center overflow-hidden"
    >
      <div class="h-full">
        <router-outlet />
      </div>
    </div>
  `
})
export class AppComponent {}
