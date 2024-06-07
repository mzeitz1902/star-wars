import { createSelector } from '@ngrx/store';
import { peopleFeature } from './people.reducer';
import { getRouterSelectors } from '@ngrx/router-store';

export const selectIsLoading = peopleFeature.selectIsLoading;
export const selectPeople = createSelector(
  peopleFeature.selectPersonPaginatedList,
  (list) => list?.results,
);

export const selectPeopleCount = createSelector(
  peopleFeature.selectPersonPaginatedList,
  (list) => list?.count,
);

export const selectCurrentPage = createSelector(
  peopleFeature.selectPersonPaginatedList,
  (list) => {
    if (!list || !list.previous) return 0;
    if (!list.next) {
      const url = new URL(list.previous);
      const params = new URLSearchParams(url.search);
      return +params.get('page')! + 1;
    }

    const url = new URL(list.next);
    const params = new URLSearchParams(url.search);
    return +params.get('page')! - 2;
  },
);

export const selectPageSize = createSelector(
  peopleFeature.selectPersonPaginatedList,
  (list) => list?.results.length,
);

export const selectSelectedPersonByRouteId = createSelector(
  getRouterSelectors().selectRouteParams,
  selectPeople,
  (params, people) => people?.find((person) => person.id === params['id']),
);
