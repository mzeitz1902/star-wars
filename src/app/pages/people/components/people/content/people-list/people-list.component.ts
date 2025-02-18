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
import { PeopleFacade } from '../../people.facade';
import { Person } from '../../../../person.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-people-list',
    imports: [
        MatChip,
        MatChipSet,
        MatChipListbox,
        MatChipOption,
        MatIcon,
        MatChipRow,
        MatChipRemove,
        MatButton,
        MatPaginator,
    ],
    template: `
    <div class="flex flex-col items-start w-full h-full">
      <mat-chip-set class="mat-mdc-chip-set-stacked !w-full !h-full">
        @for (person of people(); track person.id) {
          <mat-chip-row (click)="onClickPerson(person.id!)">
            {{ person.name }}
            <button matChipRemove (click)="onClickRemove(person)">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        } @empty {
          No People found!
        }
      </mat-chip-set>
      <mat-paginator
        [length]="peopleCount()"
        [pageSize]="pageSize()"
        [pageIndex]="currentPage()"
        (page)="onPageChange($event)"
      />
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent {
  viewService = inject(PeopleFacade);
  people = this.viewService.people;
  peopleCount = this.viewService.count;
  currentPage = this.viewService.currentPage;
  pageSize = this.viewService.pageSize;

  onClickPerson(id: string) {
    this.viewService.openPersonDetails(id);
  }

  onClickRemove(person: Person) {
    this.viewService.deletePerson(person);
  }

  onPageChange(event: PageEvent) {
    this.viewService.onPageChange(event);
  }
}
