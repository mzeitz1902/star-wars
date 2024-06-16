import { inject, Injectable } from '@angular/core';
import { PeopleApiService } from '../../people-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Person } from '../../person.interface';

@Injectable()
export class PeopleView2Service {
  private readonly apiService = inject(PeopleApiService);
  private _isLoading$ = new BehaviorSubject(false);

  people$ = new Observable<Person[]>();
  isLoading$ = this._isLoading$.asObservable();

  getPeople(page: number, filter?: string) {
    this._isLoading$.next(true);
    this.people$ = this.apiService.getPeople$(page, filter).pipe(
      map((response) => response.results),
      tap(() => this._isLoading$.next(false)),
    );
  }
}
