import { createSelector } from '@ngrx/store';
import { peopleFeature } from './people.reducer';

export const selectIsLoading = peopleFeature.selectIsLoading;
export const selectPeople = createSelector(
  peopleFeature.selectPersonPaginatedList,
  (list) => list?.results,
);
export const selectSelectedPerson = createSelector(
  selectPeople,
  peopleFeature.selectSelectedPersonId,
  (people, id) => people?.find((person) => person.id === id),
);
