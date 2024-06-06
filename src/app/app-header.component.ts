import { Component } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatFormField, MatIcon, MatPrefix, MatInput],
  template: `
    <mat-toolbar class="flex justify-between !p-8 sticky top-0 z-10 w-full">
      <mat-form-field class="mt-4 !text-sm">
        <p class="flex items-center gap-2">
          <mat-icon matPrefix class="!text-md">search</mat-icon>
          <input type="text" matInput placeholder="Search..." />
        </p>
      </mat-form-field>
    </mat-toolbar>
  `,
})
export class AppHeaderComponent {}
