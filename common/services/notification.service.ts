import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _translateService = inject(TranslateService);

  public success(message: string, translate: boolean = true): void {
    this._notify(message, 'success-snackbar', translate);
  }

  public error(message: string, translate: boolean = true): void {
    this._notify(message, 'error-snackbar', translate);
  }

  public warning(message: string, translate: boolean = true): void {
    this._notify(message, 'warning-snackbar', translate);
  }

  public info(message: string, translate: boolean = true): void {
    this._notify(message, 'info-snackbar', translate);
  }

  private _notify(message: string, panelClass: string, translate: boolean): void {
    const messageToDisplay = translate ? this._translateService.instant(message) : message;
    this._snackBar.open(messageToDisplay, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
      duration: 5000,
    });
  }
}
