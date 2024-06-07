import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleViewService } from './people-view.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../../../../shared/components/button.component';
import { HeaderComponent } from '../header/header.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-people',
  standalone: true,
  template: `
    <div class="max-w-7xl w-max flex primary">
      @if (isLoading()) {
        <mat-spinner />
      }
      @defer (when !isLoading()) {
        <div class="flex flex-col w-dvw p-5">
          <app-header (valueChanged)="getPeople($event)" />
          <app-content
            [isPersonSelected]="!!selectedPerson()"
            (addPerson)="onAddPerson()"
            class="w-full"
          />
        </div>
      }
    </div>
  `,
  providers: [PeopleViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatProgressSpinner,
    ContentComponent,
    HeaderComponent,
    MatButton,
    ButtonComponent,
    HeaderComponent,
    ContentComponent,
  ],
})
export class PeopleComponent {
  viewService = inject(PeopleViewService);
  isLoading = this.viewService.isLoading;
  selectedPerson = this.viewService.selectedPerson;

  constructor() {
    this.getPeople();
  }

  getPeople(filter?: string) {
    this.viewService.getPeople(1, filter);
  }

  onAddPerson() {
    this.viewService.addPerson();
  }
}
