import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PeopleListComponent } from '../people-list/people-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [PeopleListComponent, RouterOutlet],
  template: `
    <div class="flex gap-3 p-3">
      <app-people-list class="w-1/2" [class.w-max]="!isPersonSelected()" />
      @if (isPersonSelected()) {
        <div class="w-1/2">
          <router-outlet />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  isPersonSelected = input.required<boolean>();
}
