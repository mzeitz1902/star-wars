import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
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
import { PeopleViewService } from '../people/people-view.service';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconButtonComponent } from '../../../../shared/components/icon-button.component';

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
    IconButtonComponent,
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
  template: `
    <div
      class="w-full h-full"
      [@slideInOut]="slideState() === 'in' ? 'in' : 'out'"
    >
      @if (selectedPerson()) {
        <mat-card class="flex flex-col gap-2 bg-neutral-20 h-full">
          <mat-card-header class="flex items-center justify-between">
            <mat-card-title>
              {{ selectedPerson()?.name }}
            </mat-card-title>
            <app-icon-button
              icon="close"
              tooltip="Close"
              (closed)="onClosed()"
            />
          </mat-card-header>
          <mat-card-content class="flex flex-col gap-2">
            <mat-list>
              <mat-list-item>
                Height: {{ selectedPerson()?.height }} cm
              </mat-list-item>
              <mat-list-item>
                Mass: {{ selectedPerson()?.mass }} kg
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
  private readonly destroyRef = inject(DestroyRef);
  peopleViewService = inject(PeopleViewService);
  selectedPerson = this.peopleViewService.selectedPerson;
  name = computed(() => this.selectedPerson()?.name);

  slideState = signal<'in' | 'out'>('in');
  animationEffect = effect(
    () => {
      if (this.selectedPerson()) {
        this.slideState.set('out');
        timer(0)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.slideState.set('in'));
      }
    },
    { allowSignalWrites: true },
  );

  onClosed() {
    this.peopleViewService.closePersonDetails();
  }
}
