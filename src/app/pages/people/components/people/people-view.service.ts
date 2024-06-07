import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPerson, deletePerson, getPeople } from '../../store/people.actions';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from '../../../../shared/dialog-helper';
import { PersonDialogComponent } from '../add-person-dialog/person-dialog.component';
import { Person } from '../../person.interface';
import {
  selectIsLoading,
  selectPeople,
  selectSelectedPersonByRouteId,
} from '../../store/people.selectors';
import { Router } from '@angular/router';
import { PEOPLE_PATH } from '../../../../app.routes';

@Injectable()
export class PeopleViewService {
  private readonly store: Store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  people = this.store.selectSignal(selectPeople);
  isLoading = this.store.selectSignal(selectIsLoading);
  selectedPerson = this.store.selectSignal(selectSelectedPersonByRouteId);

  getPeople(page = 1, filter?: string) {
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
}
