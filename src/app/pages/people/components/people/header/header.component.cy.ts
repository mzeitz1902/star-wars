import { createOutputSpy, MountConfig } from 'cypress/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cy, expect } from 'local-cypress';
import { HeaderComponent } from './header.component';

describe(`HeaderComponent`, () => {
  let config: MountConfig<HeaderComponent>;
  it(`should emit search value`, () => {
    mount();
    const component = cy.get<HeaderComponent>('@component');
    cy.get('input').type('new value');
    cy.wait(600)
      .get<HeaderComponent>('@component')
      .then((component) => {
        expect(component.search.emit).to.have.been.calledWith('new value');
      });
  });

  function mount() {
    config = {
      imports: [BrowserAnimationsModule],
      componentProperties: {
        search: createOutputSpy('search'),
      },
    };
    cy.mountWrapComponent(HeaderComponent, config);
  }
});
