import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
} from './people.actions';
import { PeopleService } from '../people.service';

@Injectable()
export class PeopleEffects {
  service = inject(PeopleService);
  actions$ = inject(Actions);

  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeople),
      switchMap((action) =>
        this.service.getPeople$(action.page).pipe(
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
