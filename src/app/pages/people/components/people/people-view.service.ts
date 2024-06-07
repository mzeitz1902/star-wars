import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {addPerson, deletePerson, getPeople} from '../../store/people.actions';
import {MatDialog} from '@angular/material/dialog';
import {openDialog} from '../../../../shared/dialog-helper';
import {PersonDialogComponent} from '../add-person-dialog/person-dialog.component';
import {Person} from '../../person.interface';
import {
  selectCurrentPage,
  selectIsLoading,
  selectPageSize,
  selectPeople,
  selectPeopleCount,
  selectSelectedPersonByRouteId,
} from '../../store/people.selectors';
import {Router} from '@angular/router';
import {PEOPLE_PATH} from '../../../../app.routes';
import {PageEvent} from '@angular/material/paginator';

/**
 * Service for managing the view of people.
 * Acts as a facade for the store, providing methods for getting people, opening person details, closing person details, adding a person, deleting a person, and handling page changes.
 * Also provides data from the store to its consumers via signals.
 */
@Injectable()
export class PeopleViewService {
  private readonly store: Store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  people = this.store.selectSignal(selectPeople);
  count = this.store.selectSignal(selectPeopleCount);
  currentPage = this.store.selectSignal(selectCurrentPage);
  pageSize = this.store.selectSignal(selectPageSize);
  isLoading = this.store.selectSignal(selectIsLoading);

  selectedPerson = this.store.selectSignal(selectSelectedPersonByRouteId);

  getPeople(page: number, filter?: string) {
    this.store.dispatch(getPeople({ page, filter }));
  }

  openPersonDetails(id: string) {
    this.router.navigate([PEOPLE_PATH, id]);
  }

  closePersonDetails() {
    this.router.navigate([PEOPLE_PATH]);
  }

  addPerson() {
    openDialog(this.dialog, PersonDialogComponent, {
      onClosed: (person: Person) => {
        this.store.dispatch(addPerson({ person }));
      },
    });
  }

  deletePerson(person: Person) {
    this.store.dispatch(deletePerson({ id: person.id! }));
  }

  onPageChange(event: PageEvent) {
    this.closePersonDetails();
    let pageIndex = 1;
    if (event.previousPageIndex! < event.pageIndex) {
      pageIndex = event.pageIndex + 1;
    }
    if (event.previousPageIndex! > event.pageIndex) {
      pageIndex = event.pageIndex - 1;
    }
    this.getPeople(pageIndex > 0 ? pageIndex : 1);
  }
}
