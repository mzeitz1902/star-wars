import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Gender, Person } from '../../person.interface';

@Injectable()
export class FormService {
  form!: PersonForm;
  fields = signal<Field[]>([]);
  inputFields = computed(() =>
    this.fields().filter((field) => field.inputType !== 'select'),
  );
  genderField = computed(() =>
    this.fields().find((field) => field.inputType === 'select'),
  );

  genderOptions: Gender[] = ['male', 'female', 'n/a'];

  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.buildForm();
    this.buildFields();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required, Validators.min(1)]),
      mass: new FormControl('', [Validators.required, Validators.min(1)]),
      birth_year: new FormControl('', [Validators.required, birthYear()]),
      gender: new FormControl('', [Validators.required]),
    }) as PersonForm;
  }

  private buildFields() {
    const fieldMap = new Map<
      keyof Person,
      { label: string; inputType: string }
    >([
      ['name', { label: 'Name', inputType: 'text' }],
      ['height', { label: 'Height', inputType: 'number' }],
      ['mass', { label: 'Mass', inputType: 'number' }],
      ['birth_year', { label: 'Birth Year', inputType: 'text' }],
      ['gender', { label: 'Gender', inputType: 'select' }],
    ]);
    this.fields.set(
      Object.keys(this.form.controls).map((key) => {
        const _key = key as keyof Person;
        return {
          control: this.form.get(key) as FormControl,
          label: fieldMap.get(_key)!.label as string,
          inputType: fieldMap.get(_key)!.inputType as string,
        };
      }),
    );
  }
}

export interface Field {
  control: FormControl;
  label: string;
  inputType: string;
}

type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

type PersonForm = ModelFormGroup<
  Pick<Person, 'name' | 'height' | 'mass' | 'birth_year' | 'gender'>
>;

function birthYear(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const starWarsYearPattern = /^(\d+(\.\d+)?)(BBY|ABY)$/i;

    if (!value) {
      return null; // don't validate empty values to allow optional controls
    }

    return starWarsYearPattern.test(value) ? null : { invalidYear: true };
  };
}
