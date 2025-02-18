import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleFacade } from './people.facade';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-people',
    template: `
    <div class="max-w-7xl w-max flex primary h-full">
      <div class="flex flex-col w-dvw p-5 h-full justify-center">
        @defer (when !isLoading()) {
          <app-header (search)="getPeople($event)" />
        }
        @if (isLoading()) {
          <div class="self-center mt-40">
            <mat-spinner />
          </div>
        }
        <div class="flex h-full w-full">
          @defer (when !isLoading()) {
            <app-content class="w-full" />
          }
        </div>
      </div>
    </div>
  `,
    providers: [PeopleFacade],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, MatProgressSpinner, ContentComponent, AsyncPipe]
})
export class PeopleComponent {
  viewService = inject(PeopleFacade);
  isLoading = this.viewService.isLoading;

  constructor() {
    this.getPeople();
  }

  getPeople(filter?: string) {
    this.viewService.getPeople(1, filter);
  }
}
