import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { PeopleListComponent } from '../people-list/people-list.component';
import { RouterOutlet } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { RaisedButtonComponent } from '../../../../shared/components/raised-button.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [PeopleListComponent, RouterOutlet, RaisedButtonComponent],
  animations: [
    trigger('widthAnimation', [
      state('true', style({ width: '50%' })),
      state('false', style({ width: '100%' })),
      transition('true <=> false', animate('600ms ease-in-out')),
    ]),
  ],
  template: `
    <div class="flex flex-col items-center">
      <div class="flex gap-3 p-3">
        <app-people-list [@widthAnimation]="isPersonSelected()" />
        @if (isPersonSelected()) {
          <div class="w-1/2">
            <router-outlet />
          </div>
        }
      </div>
      <app-button text="Add Person" (onClick)="onClickAddPerson()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  isPersonSelected = input.required<boolean>();

  addPerson = output();

  onClickAddPerson() {
    this.addPerson.emit();
  }
}
