import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PersonFormService } from './person-form.service';
import { ReadableErrorPipe } from './readable-error.pipe';
import { DialogActionsComponent } from './dialog-actions.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { InputFieldComponent } from '../../../../shared/components/input-field.component';
import { SelectFieldComponent } from '../../../../shared/components/select-field.component';

@Component({
  selector: 'app-add-person-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    ReadableErrorPipe,
    MatInput,
    DialogActionsComponent,
    MatSelect,
    MatOption,
    InputFieldComponent,
    SelectFieldComponent,
  ],
  providers: [PersonFormService],
  template: `
    <div class="flex flex-col gap-3">
      <h1 matDialogTitle class="primary">Add Person</h1>
      <mat-dialog-content class="!pt-2">
        <form [formGroup]="form" class="flex flex-col gap-5">
          @for (field of inputFields(); track field) {
            <app-input-field [field]="field" />
          }
          <app-select-field
            [control]="genderField()!.control"
            [label]="genderField()!.label"
            [options]="genderOptions"
          />
        </form>
      </mat-dialog-content>
      <app-dialog-actions [isDisabled]="form.invalid" [value]="form.value" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDialogComponent {
  formService = inject(PersonFormService);
  form = this.formService.form;
  inputFields = this.formService.inputFields;
  genderField = this.formService.genderField;
  genderOptions = this.formService.genderOptions;
}
