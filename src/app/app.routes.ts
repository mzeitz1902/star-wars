import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { PeopleEffects } from './pages/people/store/people.effects';
import { provideState } from '@ngrx/store';
import { peopleFeature } from './pages/people/store/people.reducer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    loadComponent: () =>
      import('./pages/people/components/people/people.component').then(
        (c) => c.PeopleComponent,
      ),
    providers: [provideState(peopleFeature), provideEffects(PeopleEffects)],
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import(
            './pages/people/components/people/person-details/person-details.component'
          ).then((c) => c.PersonDetailsComponent),
      },
    ],
  },
];
