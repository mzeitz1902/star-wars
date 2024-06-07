import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {take} from 'rxjs';

/**
 * Opens a dialog and calls the onClosed callback with the output of the dialog.
 * If there is no output, the onCanceled callback is called instead.
 */
export function openDialog<OUTPUT>(
  dialog: MatDialog,
  component: ComponentType<unknown>,
  options: {
    input?: unknown;
    onClosed: (output: OUTPUT) => void;
    onCanceled?: () => void;
  },
) {
  dialog
    .open(component, {
      data: options.input,
      width: '500px',
    })
    .afterClosed()
    .pipe(take(1))
    .subscribe((output: OUTPUT) => {
      output ? options.onClosed(output) : options.onCanceled?.();
    });
}
