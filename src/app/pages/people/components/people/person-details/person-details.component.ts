import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PeopleViewService } from '../people-view.service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-people-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
  ],
  template: `
    <div class="w-full h-full">
      @if (selectedPerson()) {
        <mat-card class="flex flex-col gap-2 bg-primary-30 h-full">
          <mat-card-header>
            <mat-card-title>
              {{ selectedPerson()?.name }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="flex flex-col gap-2">
            <mat-list>
              <mat-list-item>
                Height: {{ selectedPerson()?.height }}
              </mat-list-item>
              <mat-list-item> Mass: {{ selectedPerson()?.mass }}</mat-list-item>
              <mat-list-item>
                Birth Year: {{ selectedPerson()?.birth_year }}
              </mat-list-item>
              <mat-list-item>
                Gender: {{ selectedPerson()?.gender }}
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailsComponent {
  service = inject(PeopleViewService);
  selectedPerson = this.service.selectedPerson;
  name = computed(() => this.selectedPerson()?.name);
}
