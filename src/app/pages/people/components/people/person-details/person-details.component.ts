import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PeopleViewService } from '../people-view.service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', animate('200ms ease-in')),
    ]),
  ],
  template: `
    <div class="w-full h-full" [@slideInOut]="isIn() ? 'in' : 'out'">
      @if (selectedPerson()) {
        <mat-card class="flex flex-col gap-2 bg-neutral-20 h-full">
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
              <mat-list-item>
                Mass: {{ selectedPerson()?.mass }}
              </mat-list-item>
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
  isIn = signal(true);

  constructor() {
    effect(
      () => {
        if (this.selectedPerson()) {
          this.isIn.set(false);
          setTimeout(() => {
            this.isIn.set(true);
          }, 100);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
