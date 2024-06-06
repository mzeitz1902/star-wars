import { Person } from './person.interface';

export interface PersonPaginatedList {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}
