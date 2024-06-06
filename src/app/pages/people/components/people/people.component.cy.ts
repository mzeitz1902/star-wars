import { MountConfig } from 'cypress/angular';
import { PeopleComponent } from './people.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(``, () => {
  let config: MountConfig<PeopleComponent>;
  it(`should `, () => {});

  function mount() {
    config = {
      imports: [BrowserAnimationsModule],
    };
    cy.mount(PeopleComponent, config);
  }
});
