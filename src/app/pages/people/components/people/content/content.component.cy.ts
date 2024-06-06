import { Component } from '@angular/core';
import { MountConfig } from 'cypress/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(``, () => {
  let config: MountConfig<WrapperComponent>;
  it(`should `, () => {});

  function mount() {
    config = {
      imports: [BrowserAnimationsModule],
    };
    cy.mount(WrapperComponent, config);
  }
});

@Component({ template: `` })
class WrapperComponent {}
