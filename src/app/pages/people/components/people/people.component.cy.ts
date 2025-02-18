import { MountConfig } from 'cypress/angular';
import { PeopleComponent } from './people.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cy } from 'local-cypress';
import { MockProvider } from 'ng-mocks';
import { PeopleFacade } from './people.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { selectIsLoading } from '../../store/people.selectors';
import { DeferBlockState } from '@angular/core/testing';

describe(`PeopleComponent`, () => {
  let config: MountConfig<PeopleComponent>;
  it(`should show loading spinner if 'isLoading' is true`, () => {
    mount(true);
    cy.get('mat-spinner').should('exist');
  });

  it(`should show content when 'isLoading' is false`, () => {
    mount(false).defer().renderAll(DeferBlockState.Complete);
    cy.get('app-header').should('exist');
    cy.get('app-content').should('exist');
  });

  function mount(isLoading: boolean) {
    config = {
      imports: [BrowserAnimationsModule],
      providers: [
        MockProvider(PeopleFacade, {
          getPeople: () => {},
        }),
        provideMockStore({
          selectors: [
            {
              selector: selectIsLoading,
              value: isLoading,
            },
          ],
        }),
      ],
    };
    return cy.mount(PeopleComponent, config);
  }
});
