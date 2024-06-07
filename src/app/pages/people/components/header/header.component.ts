import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormField, MatIcon, MatInput, MatPrefix, ReactiveFormsModule],
  template: `
    <header class="text-2xl w-full flex justify-between items-end px-4">
      <h1>People</h1>
      <mat-form-field class="mt-4 !text-sm flex items-center justify-center">
        <p class="flex items-center gap-2">
          <mat-icon matPrefix class="!text-md">search</mat-icon>
          <input
            type="text"
            matInput
            placeholder="Search..."
            [formControl]="control"
          />
        </p>
      </mat-form-field>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  control = new FormControl<string>('');

  search = output<string>();

  constructor() {
    this.control.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(600))
      .subscribe((value) => this.search.emit(value!));
  }
}
