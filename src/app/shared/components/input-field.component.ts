import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { ReadableErrorPipe } from '../../pages/people/components/add-person-dialog/readable-error.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Field } from '../../pages/people/components/add-person-dialog/person-form.service';

@Component({
    selector: 'app-input-field',
    imports: [
        MatFormField,
        MatError,
        ReadableErrorPipe,
        MatLabel,
        MatInput,
        MatHint,
        ReactiveFormsModule,
    ],
    template: `
    <mat-form-field class="w-full" [class.mb-2]="!!field().hint">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        [formControl]="field().control"
        [type]="field().fieldType"
      />
    </mat-form-field>

    @if (field().hint) {
      <mat-hint>{{ field().hint }}</mat-hint>
    }
    @if (field().control.errors && field().control.touched) {
      <mat-error>{{ error() | readableError }}</mat-error>
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {
  field = input.required<Field>();
  error = computed(() => this.field().control.errors!);
}
