import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {take} from 'rxjs';

/**
 * Opens a dialog and calls the onClosed callback with the output of the dialog when the dialog .
 * @param dialog
 * @param component
 * @param options
 *
 * @example
 *
 * openDialog(this.dialog, IceCreamDialogComponent, {
 *     input: 'chocolate',
 *     onClosed: (result: IceCream) =>{...}
 *     onCanceled: () => {...}
 *  });
 *
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
