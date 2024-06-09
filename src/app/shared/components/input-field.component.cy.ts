import { Component } from '@angular/core';
import { MountConfig } from 'cypress/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputFieldComponent } from './input-field.component';
import { Field } from '../../pages/people/components/add-person-dialog/person-form.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { cy } from 'local-cypress';

describe(`InputFieldComponent`, () => {
  let config: MountConfig<WrapperComponent>;
  const fakeField: Field = {
    key: 'name',
    label: 'Name',
    control: new FormControl('', [Validators.required]) as FormControl,
    fieldType: 'text',
    hint: 'Enter name',
  };

  it(`should display field with label and hint`, () => {
    mount(fakeField);
    cy.get('mat-label').should('contain', fakeField.label);
    cy.get('mat-hint').should('contain', fakeField.hint);
  });

  it(`should display field without hint`, () => {
    mount({ ...fakeField, hint: '' });
    cy.get('mat-hint').should('not.exist');
  });

  it(`should display error`, () => {
    mount(fakeField);
    cy.get('input').click();
    cy.get('input').blur();
    cy.get('mat-error').should('contain', 'This field is required.');
  });

  function mount(field: Field) {
    config = {
      imports: [BrowserAnimationsModule, InputFieldComponent],
      componentProperties: { field },
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline' },
        },
      ],
    };
    cy.mount(WrapperComponent, config);
  }
});

@Component({
  template: ` <div class="p-5">
    <app-input-field [field]="field" />
  </div>`,
})
class WrapperComponent {
  field!: Field;
}
