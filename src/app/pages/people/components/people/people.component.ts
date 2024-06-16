import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleViewService } from './people-view.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { PeopleView2Service } from './people-view2.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
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
    <div class="max-w-7xl w-max flex primary h-full">
      <div class="flex flex-col w-dvw p-5 h-full justify-center">
        @defer (when !(isLoading2$ | async)) {
          <app-header (search)="getPeople($event)" />
        }
        @if (isLoading2$ | async) {
          <div class="self-center mt-40">
            <mat-spinner />
          </div>
        }
        <div class="flex h-full w-full">
          @defer (when !(isLoading2$ | async)) {
            <app-content class="w-full" />
          }
        </div>
      </div>
    </div>
  `,
  providers: [PeopleViewService, PeopleView2Service],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, MatProgressSpinner, ContentComponent, AsyncPipe],
})
export class PeopleComponent {
  viewService = inject(PeopleViewService);
  viewService2 = inject(PeopleView2Service);
  isLoading = this.viewService.isLoading;
  isLoading2$ = this.viewService2.isLoading$;

  constructor() {
    this.getPeople();
  }

  getPeople(filter?: string) {
    this.viewService.getPeople(1, filter);
  }
}
