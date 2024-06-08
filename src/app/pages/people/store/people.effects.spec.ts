import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PeopleEffects } from './people.effects';
import { Actions } from '@ngrx/effects';
import { MockProvider } from 'ng-mocks';
import { PeopleApiService } from '../people-api.service';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PersonPaginatedList } from '../person-paginated-list.interface';
import {
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
} from './people.actions';
import { HttpErrorResponse } from '@angular/common/http';

describe('PeopleEffects', () => {
  let actions$: Actions;
  let effects: PeopleEffects;
  let service: PeopleApiService;
  const fakeError = new HttpErrorResponse({ error: 'error' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleEffects,
        provideMockActions(() => actions$),
        MockProvider(PeopleApiService),
      ],
    });

    effects = TestBed.inject(PeopleEffects);
    service = TestBed.inject(PeopleApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getPeople$', () => {
    it('should return getPeopleSuccess action with people', async () => {
      const people = [{ id: '1', name: 'John Doe' }];
      const service = TestBed.inject(PeopleApiService);
      jest
        .spyOn(service, 'getPeople$')
        .mockReturnValueOnce(of({ results: people } as PersonPaginatedList));

      actions$ = of(getPeople({ page: 1, filter: '' }));

      const dispatchedAction = await firstValueFrom(effects.getPeople$);

      expect(service.getPeople$).toHaveBeenCalledWith(1, '');
      expect(dispatchedAction).toEqual(
        getPeopleSuccess({
          personPaginatedList: { results: people } as PersonPaginatedList,
        }),
      );
    });
    it('should return getPeopleFailure action when service fails', async () => {
      jest
        .spyOn(service, 'getPeople$')
        .mockReturnValueOnce(throwError(() => fakeError));

      actions$ = of(getPeople({ page: 0 }));

      const dispatchedAction = await firstValueFrom(effects.getPeople$);

      expect(dispatchedAction).toEqual(getPeopleFailure({ error: fakeError }));
    });
  });
});
