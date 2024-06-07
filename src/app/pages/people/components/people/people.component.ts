import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleViewService } from './people-view.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-people',
  standalone: true,
  template: `
    <div class="max-w-7xl w-max flex primary h-full">
      <div class="flex flex-col w-dvw p-5 h-full justify-center">
        @defer {
          <app-header (search)="getPeople($event)" />
        }
        @if (isLoading()) {
          <div class="self-center mt-40">
            <mat-spinner />
          </div>
        }
        <div class="flex h-full w-full">
          @defer (when !isLoading()) {
            <app-content
              [isPersonSelected]="!!selectedPerson()"
              [isLoading]="isLoading()"
              (addPerson)="onAddPerson()"
              class="w-full"
            />
          }
        </div>
      </div>
    </div>
  `,
  providers: [PeopleViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, MatProgressSpinner, ContentComponent],
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
