import {computed, inject, Injectable, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {Gender, Person} from '../../person.interface';

/**
 * Service for managing the form for adding a new person.
 */
@Injectable()
export class PersonFormService {
  private readonly fb = inject(NonNullableFormBuilder);

  private fieldMap = signal(this.buildFieldMap());
  fields = computed(() => Array.from(this.fieldMap().values()));
  controlObj = computed(() => this.buildControlObj());
  inputFields = computed(() =>
    this.fields().filter((field) => field.fieldType !== 'select'),
  );
  genderField = computed(() =>
    this.fields().find((field) => field.fieldType === 'select'),
  );

  genderOptions: Gender[] = ['male', 'female', 'n/a'];

  form: FormGroup<PersonForm> = this.fb.group(this.controlObj());

  /**
   * Builds a map of fields for the form.
   * Each field is represented as a key-value pair in the map, where the key is a property of the `Person` type and the value is a `Field` object.
   * The `Field` object contains information about the form control for the field, such as its label, type, and validators.
   *
   * @returns A map of fields for the form.
   */
  private buildFieldMap() {
    return new Map<keyof Person, Field>([
      this.buildMapEntry('name', 'Name', 'text', [Validators.required]),
      this.buildMapEntry('height', 'Height', 'number', [
        Validators.required,
        Validators.min(1),
      ]),
      this.buildMapEntry('mass', 'Mass', 'number', [
        Validators.required,
        Validators.min(1),
      ]),
      this.buildMapEntry(
        'birth_year',
        'Birth Year',
        'text',
        [Validators.required, birthYear()],
        'Format: YYBBY or YYABY',
      ),
      this.buildMapEntry('gender', 'Gender', 'select', [Validators.required]),
    ]);
  }

  private buildMapEntry(
    key: keyof PersonPartial,
    label: string,
    fieldType: 'text' | 'select' | 'number',
    validators: ValidatorFn[],
    hint?: string,
  ): MapEntry {
    const field: Field = {
      key,
      control: this.fb.control('', validators),
      label,
      fieldType,
      hint,
    };
    return [key, field];
  }

  /**
   * Builds an object of form controls that will be used by the form builder to build the form.
   * Each form control is represented as a key-value pair in the object, where the key is a property of the `PersonPartial` type and the value is a `FormControl<string>`.
   * The `FormControl<string>` object contains the current value of the form control, as well as its validation status and any associated validators.
   *
   * @returns An object of form controls for the form.
   */
  private buildControlObj() {
    const controlObj: PersonForm = {} as PersonForm;
    const controls = this.fields().map((field) => field.control);
    this.fields().forEach((field, i) => {
      controlObj[field.key] = controls[i];
    });
    return controlObj;
  }
}

type MapEntry = [keyof Person, Field];

type FieldTypes = 'text' | 'select' | 'number';

export interface Field {
  key: keyof PersonPartial;
  control: FormControl<string>;
  label: string;
  fieldType: FieldTypes;
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
