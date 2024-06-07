import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Gender, Person } from '../../person.interface';

@Injectable()
export class PersonFormService {
  fields = signal<Field[]>([]);
  inputFields = computed(() =>
    this.fields().filter((field) => field.inputType !== 'select'),
  );
  genderField = computed(() =>
    this.fields().find((field) => field.inputType === 'select'),
  );

  genderOptions: Gender[] = ['male', 'female', 'n/a'];

  private readonly fb = inject(NonNullableFormBuilder);
  form: FormGroup<PersonForm> = this.fb.group<PersonForm>({
    name: this.fb.control('', [Validators.required]),
    height: this.fb.control('', [Validators.required, Validators.min(1)]),
    mass: this.fb.control('', [Validators.required, Validators.min(1)]),
    birth_year: this.fb.control('', [Validators.required, birthYear()]),
    gender: this.fb.control('', [Validators.required]),
  });

  constructor() {
    this.buildFields();
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
  hint?: string;
}

type PersonPartial = Pick<
  Person,
  'name' | 'height' | 'mass' | 'birth_year' | 'gender'
>;

type PersonForm = Record<keyof PersonPartial, FormControl<string>>;

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
