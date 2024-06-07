import { createActionGroup, props } from '@ngrx/store';

import { PersonPaginatedList } from '../person-paginated-list.interface';
import { Person } from '../person.interface';

const PeopleActions = createActionGroup({
  source: 'People',
  events: {
    getPeople: props<{ page: number; filter?: string }>(),
    getPeopleSuccess: props<{ personPaginatedList: PersonPaginatedList }>(),
    getPeopleFailure: props<{ error: string }>(),

    addPerson: props<{ person: Person }>(),

    deletePerson: props<{ id: string }>(),
  },
});

export const getPeople = PeopleActions.getPeople;
export const getPeopleSuccess = PeopleActions.getPeopleSuccess;
export const getPeopleFailure = PeopleActions.getPeopleFailure;

export const addPerson = PeopleActions.addPerson;

export const deletePerson = PeopleActions.deletePerson;
