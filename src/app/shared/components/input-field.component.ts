import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { ReadableErrorPipe } from '../../pages/people/add-person-dialog/readable-error.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Field } from '../../pages/people/add-person-dialog/form.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    MatFormField,
    MatError,
    ReadableErrorPipe,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        [formControl]="field().control"
        [type]="field().inputType"
      />
    </mat-form-field>
    @if (field().control.errors && field().control.touched) {
      <mat-error>{{ error() | readableError }}</mat-error>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  field = input.required<Field>();
  error = computed(() => this.field().control.errors!);
}
