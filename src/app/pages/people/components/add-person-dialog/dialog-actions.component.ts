import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-actions',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogClose],
  template: `
    <mat-dialog-actions>
      <button mat-stroked-button class="error" mat-dialog-close>Cancel</button>
      <button
        mat-stroked-button
        [matDialogClose]="value()"
        [disabled]="isDisabled()"
      >
        Save
      </button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogActionsComponent {
  value = input.required<object>();
  isDisabled = input.required<boolean>();
}
