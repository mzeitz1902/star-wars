import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButton],
  template: `
    <button mat-raised-button [class]="styleClass()" (click)="onClick.emit()">
      {{ text() }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaisedButtonComponent {
  text = input.required<string>();
  styleClass = input<'primary' | 'secondary'>('primary');

  onClick = output();
}
