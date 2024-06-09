import { ReadableErrorPipe } from './readable-error.pipe';
import { ValidationErrors } from '@angular/forms';

describe('ReadableErrorPipe', () => {
  let pipe: ReadableErrorPipe;

  beforeEach(() => {
    pipe = new ReadableErrorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it.each([
    { error: null as unknown as ValidationErrors, expected: '' },
    { error: { required: true }, expected: 'This field is required.' },
    {
      error: { invalidYear: true },
      expected:
        'Invalid year. Please provide a valid year in the format XXBBY or XXABY.',
    },
    { error: { min: true }, expected: 'The value must be greater than 0.' },
    { error: { unknownError: true }, expected: '' },
  ])('should return $expected when error is $error', ({ error, expected }) => {
    expect(pipe.transform(error)).toBe(expected);
  });
});
