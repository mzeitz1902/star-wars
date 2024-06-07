import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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

  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeople),
      switchMap((action) =>
        this.service.getPeople$(action.page, action.filter).pipe(
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
