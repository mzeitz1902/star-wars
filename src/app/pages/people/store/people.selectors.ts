import { createSelector } from '@ngrx/store';
import { peopleFeature } from './people.reducer';
import { getRouterSelectors } from '@ngrx/router-store';

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

export const selectSelectedPersonByRouteId = createSelector(
  getRouterSelectors().selectRouteParams,
  selectPeople,
  (params, people) => people?.find((person) => person.id === params['id']),
);
