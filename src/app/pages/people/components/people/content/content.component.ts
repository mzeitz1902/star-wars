import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleListComponent } from './people-list/people-list.component';
import { RouterOutlet } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { RaisedButtonComponent } from '../../../../../shared/components/raised-button.component';
import { MatPaginator } from '@angular/material/paginator';
import { PeopleViewService } from '../people-view.service';

@Component({
    selector: 'app-content',
    imports: [
        PeopleListComponent,
        RouterOutlet,
        RaisedButtonComponent,
        MatPaginator,
    ],
    animations: [
        trigger('widthAnimation', [
            state('true', style({ width: '50%' })),
            state('false', style({ width: '100%' })),
            transition('true <=> false', animate('1000ms ease-in-out')),
        ]),
    ],
    template: `
    @if (!isLoading()) {
      <div class="flex flex-col items-center w-full">
        <div class="flex gap-3 p-3 w-full h-full">
          @defer {
            <app-people-list [@widthAnimation]="!!selectedPerson()" />
          }
          @if (selectedPerson()) {
            <div class="w-1/2">
              <router-outlet />
            </div>
          }
        </div>
        @defer {
          <app-button text="Add Person" (onClick)="onClickAddPerson()" />
        }
      </div>
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  viewService = inject(PeopleViewService);
  selectedPerson = this.viewService.selectedPerson;
  isLoading = this.viewService.isLoading;

  onClickAddPerson() {
    this.viewService.addPerson();
  }
}
