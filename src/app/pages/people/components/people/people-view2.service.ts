import { inject, Injectable } from '@angular/core';
import { PeopleApiService } from '../../people-api.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleView2Service {
  private readonly apiService = inject(PeopleApiService);

  private peopleSubject = new BehaviorSubject([]);
  people$ = this.peopleSubject.asObservable();

  getPeople(page: number, filter?: string) {
    this.apiService
      .getPeople$(page, filter)
      .pipe(map((response) => response.results));
  }
}
