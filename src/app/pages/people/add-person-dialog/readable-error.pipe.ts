import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'readableError',
  standalone: true,
})
export class ReadableErrorPipe implements PipeTransform {
  transform(error: ValidationErrors): string {
    if (!error) return '';
    if (error['required']) {
      return 'This field is required.';
    }
    if (error['invalidYear']) {
      return 'Invalid year. Please provide a valid year in the format XXBBY or XXABY.';
    }
    if (error['min']) {
      return 'The value must be greater than 0.';
    }
    return '';
  }
}
