import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleViewService } from './people-view.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../../../../shared/components/button.component';

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
          <div class="flex flex-col items-center">
            <app-content
              [isPersonSelected]="!!selectedPerson()"
              class="w-full"
            />
            <app-button text="Add Person" (onClick)="onClickAddPerson()" />
          </div>
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
  ],
})
export class PeopleComponent {
  service = inject(PeopleViewService);
  isLoading = this.service.isLoading;
  selectedPerson = this.service.selectedPerson;

  constructor() {
    this.getPeople();
  }

  getPeople(filter?: string) {
    this.service.getPeople(1, filter);
  }

  onClickAddPerson() {
    this.service.addPerson();
  }
}
