import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-select-field',
    imports: [MatFormField, MatSelect, ReactiveFormsModule, MatOption, MatLabel],
    template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label() }}</mat-label>
      <mat-select [formControl]="control()">
        @for (option of options(); track option) {
          <mat-option [value]="option">{{ option }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent<T> {
  control = input.required<FormControl<T>>();
  options = input.required<T[]>();
  label = input.required<string>();
}
