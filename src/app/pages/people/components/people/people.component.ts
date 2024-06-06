import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleViewService } from './people-view.service';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PeopleListComponent } from './people-list/people-list.component';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  template: `
    <div class="w-full flex primary">
      @if (isLoading()) {
        <mat-spinner />
      } @else {
        <!--        outer container-->
        <div class="flex flex-col w-dvw p-5">
          <h1 class="text-2xl w-full">People</h1>
          <!--          inner component container-->
          <div class="flex gap-3 p-3">
            <!--            left side-->
            <div
              class="flex flex-col items-center w-1/2"
              [class.w-full]="!selectedPerson()"
            >
              @defer (when !isLoading()) {
                <app-people-list />
              }
            </div>
            <!--            right side-->
            @if (selectedPerson()) {
              <div class="w-1/2">
                <router-outlet />
              </div>
            }
          </div>
          <button
            mat-raised-button
            class="primary"
            (click)="onClickAddPerson()"
          >
            Add Person
          </button>
        </div>
      }
    </div>
  `,
  providers: [PeopleViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatChipSet,
    MatChip,
    MatProgressSpinner,
    PeopleListComponent,
    MatButton,
    RouterOutlet,
    NgClass,
  ],
})
export class PeopleComponent {
  service = inject(PeopleViewService);
  isLoading = this.service.isLoading;
  selectedPerson = this.service.selectedPerson;

  constructor() {
    this.service.getPeople();
  }

  onClickAddPerson() {
    this.service.addPerson();
  }
}
