import { createFeature, createReducer, on } from '@ngrx/store';

import { PersonPaginatedList } from '../person-paginated-list.interface';
import {
  addPerson,
  deletePerson,
  getPeople,
  getPeopleSuccess,
} from './people.actions';
import { produce } from 'immer';
import { getId } from '../../../shared/swapi-helper.functions';

export const peopleFeatureKey = 'people';

export interface State {
  personPaginatedList: PersonPaginatedList | null;
  isLoading: boolean;
  selectedPersonId: string | null;
}

export const initialState: State = {
  personPaginatedList: null,
  isLoading: false,
  selectedPersonId: null,
};

export const reducer = createReducer(
  initialState,
  on(getPeople, (state) =>
    produce(state, (draftState) => {
      draftState.isLoading = true;
    }),
  ),
  on(getPeopleSuccess, (state, action) =>
    produce(state, (draftState) => {
      const list = { ...action.personPaginatedList };
      let people = list.results;
      people = people.map((person) => ({ ...person, id: getId(person) }));
      list.results = people;
      draftState.isLoading = false;
      draftState.personPaginatedList = list;
    }),
  ),
  on(addPerson, (state, action) =>
    produce(state, (draftState) => {
      const people = draftState.personPaginatedList!.results;
      const person = { ...action.person };
      person.id = crypto.randomUUID();
      people.push(person);
    }),
  ),
  on(deletePerson, (state, action) =>
    produce(state, (draftState) => {
      let people = draftState.personPaginatedList!.results;
      people = people.filter((person) => person.id !== action.id);
      draftState.personPaginatedList!.results = people;
    }),
  ),
);

export const peopleFeature = createFeature({
  name: peopleFeatureKey,
  reducer,
});
