import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatChip,
  MatChipListbox,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSet,
} from '@angular/material/chips';
import { PeopleViewService } from '../people-view.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Person } from '../../../person.interface';

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
        @for (person of persons(); track person.id) {
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
  service = inject(PeopleViewService);
  persons = this.service.persons;
  selectedPerson = this.service.selectedPerson;

  onClickPerson(id: string) {
    this.service.openPersonDetails(id);
  }

  onClickRemove(person: Person) {
    this.service.deletePerson(person);
  }
}
