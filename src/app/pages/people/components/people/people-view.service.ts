import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addPerson,
  deletePerson,
  getPeople,
  getPerson,
} from '../../store/people.actions';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from '../../../../shared/dialog-helper';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { Person } from '../../person.interface';
import {
  selectIsLoading,
  selectPeople,
  selectSelectedPerson,
} from '../../store/people.selectors';
import { Router } from '@angular/router';

@Injectable()
export class PeopleViewService {
  private readonly store: Store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  people = this.store.selectSignal(selectPeople);
  isLoading = this.store.selectSignal(selectIsLoading);
  selectedPerson = this.store.selectSignal(selectSelectedPerson);

  getPeople(page = 1, filter?: string) {
    this.store.dispatch(getPeople({ page, filter }));
  }

  openPersonDetails(id: string) {
    this.router.navigate(['/people', id]);
    // todo call get person after routing
    this.getPerson(id);
  }

  private getPerson(id: string) {
    this.store.dispatch(getPerson({ id }));
  }

  addPerson() {
    openDialog(this.dialog, AddPersonDialogComponent, {
      onClosed: (person: Person) => {
        this.store.dispatch(addPerson({ person }));
      },
    });
  }

  deletePerson(person: Person) {
    this.store.dispatch(deletePerson({ id: person.id! }));
  }
}
