import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonPaginatedList } from './person-paginated-list.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  http = inject(HttpClient);
  apiBaseUrl = 'https://swapi.dev/api/people';

  getPeople$(page = 1) {
    const url = `${this.apiBaseUrl}?page=${page}`;
    return this.http.get<PersonPaginatedList>(url);
  }
}
