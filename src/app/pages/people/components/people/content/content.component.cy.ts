import { MountConfig } from 'cypress/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cy } from 'local-cypress';
import { ContentComponent } from './content.component';
import { MockProvider } from 'ng-mocks';
import { PeopleFacade } from '../people.facade';
import { signal } from '@angular/core';
import { Person } from '../../../person.interface';
import { DeferBlockState } from '@angular/core/testing';

describe(`ContentComponent`, () => {
  let config: MountConfig<ContentComponent>;
  it(`should not show content when 'isLoading' is true`, () => {
    mount(true);
    cy.get('app-content').should('not.exist');
  });
  it('should show list of people', () => {
    mount(false).defer().renderAll(DeferBlockState.Complete);
    cy.get('app-people-list').should('exist');
  });
  it('should show selected person details', () => {
    const selectedPerson = { id: '1', name: 'John' } as Person;
    mount(false, selectedPerson).defer().renderAll(DeferBlockState.Complete);
    cy.get('router-outlet').should('exist');
  });

  function mount(isLoading: boolean, selectedPerson?: Person) {
    const fakePeople = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ] as Person[];
    config = {
      imports: [BrowserAnimationsModule],
      providers: [
        MockProvider(PeopleFacade, {
          isLoading: signal(isLoading),
          selectedPerson: signal(selectedPerson),
          people: signal(fakePeople),
          count: signal(0),
          pageSize: signal(0),
          currentPage: signal(0),
        }),
      ],
    };
    return cy.mount(ContentComponent, config);
  }
});
