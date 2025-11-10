import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {
  private readonly _snackBar = inject(MatSnackBar);

  public success(message: string): void {
    this._notify(message, 'success-snackbar');
  }

  public error(message: string): void {
    this._notify(message, 'error-snackbar');
  }

  public warning(message: string): void {
    this._notify(message, 'warning-snackbar');
  }

  public info(message: string): void {
    this._notify(message, 'info-snackbar');
  }

  private _notify(message: string, panelClass: string): void {
    this._snackBar.open(message, 'X', {
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: [panelClass]
    });
  }
}
