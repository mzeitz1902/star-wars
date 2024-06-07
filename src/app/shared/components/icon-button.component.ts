import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatTooltip],
  template: `
    <button
      mat-icon-button
      [matTooltip]="tooltip()"
      class="!flex !items-center"
      (click)="closed.emit()"
    >
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  icon = input.required<string>();
  tooltip = input.required<string>();

  closed = output();
}
