import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { PeopleViewService } from './people-view.service';
import { addPerson, deletePerson, getPeople } from '../../store/people.actions';
import { Person } from '../../person.interface';
import { of } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { PEOPLE_PATH } from '../../../../app.routes';
import { PageEvent } from '@angular/material/paginator';

describe('PeopleViewService', () => {
  let service: PeopleViewService;
  let store: MockStore;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleViewService,
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: {
            open: () => {},
          },
        },
        MockProvider(Router, { navigate: jest.fn() }),
      ],
    });

    service = TestBed.inject(PeopleViewService);
    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
  });

  it('should dispatch getPeople action when getPeople is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    service.getPeople(1);
    expect(dispatchSpy).toHaveBeenCalledWith(getPeople({ page: 1 }));
  });

  it('should navigate to person details when openPersonDetails is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    service.openPersonDetails('1');
    expect(navigateSpy).toHaveBeenCalledWith([PEOPLE_PATH, '1']);
  });

  it('should navigate to people list when closePersonDetails is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    service.closePersonDetails();
    expect(navigateSpy).toHaveBeenCalledWith([PEOPLE_PATH]);
  });

  it('should dispatch addPerson action when a person is added', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const person = { id: '1', name: 'John Doe' } as Person;
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(person),
    } as MatDialogRef<unknown>);
    service.addPerson();
    expect(dispatchSpy).toHaveBeenCalledWith(addPerson({ person }));
  });

  it('should dispatch deletePerson action when a person is deleted', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const person = { id: '1', name: 'John Doe' } as Person;
    service.deletePerson(person);
    expect(dispatchSpy).toHaveBeenCalledWith(deletePerson({ id: '1' }));
  });

  it('should dispatch getPeople action with correct page when onPageChange is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    service.onPageChange({ previousPageIndex: 0, pageIndex: 1 } as PageEvent);
    expect(dispatchSpy).toHaveBeenCalledWith(getPeople({ page: 2 }));
  });
});
