import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import {
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
} from './people.actions';
import { PeopleApiService } from '../people-api.service';

@Injectable()
export class PeopleEffects {
  service = inject(PeopleApiService);
  actions$ = inject(Actions);

  /**
   * Effect that listens for `getPeople` action.
   * Waits for 500 milliseconds before dispatching the `getPeopleSuccess` action with the returned people to improve
   * user experience by showing the spinner in {@link PeopleComponent} for at least that time, which removes flickering.
   */
  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeople),
      switchMap((action) =>
        this.service.getPeople$(action.page, action.filter).pipe(
          delay(500),
          map((people) => getPeopleSuccess({ personPaginatedList: people })),
          catchError((error) => {
            console.error(error);
            return of(getPeopleFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
