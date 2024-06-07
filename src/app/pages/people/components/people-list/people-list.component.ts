import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatChip,
  MatChipListbox,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSet,
} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PeopleViewService } from '../people/people-view.service';
import { Person } from '../../person.interface';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    MatChipListbox,
    MatChipOption,
    MatIcon,
    MatChipRow,
    MatChipRemove,
    MatButton,
  ],
  template: `
    <div class="flex flex-col items-center justify-center w-full">
      <mat-chip-set class="mat-mdc-chip-set-stacked !w-full">
        @for (person of people(); track person.id) {
          <mat-chip-row (click)="onClickPerson(person.id!)">
            {{ person.name }}
            <button matChipRemove (click)="onClickRemove(person)">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
      </mat-chip-set>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent {
  viewService = inject(PeopleViewService);
  people = this.viewService.people;
  selectedPerson = this.viewService.selectedPerson;

  onClickPerson(id: string) {
    this.viewService.openPersonDetails(id);
  }

  onClickRemove(person: Person) {
    this.viewService.deletePerson(person);
  }
}
