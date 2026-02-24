import type { ErrorHandler } from '@angular/core';
import { inject, isDevMode } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NotificationService } from '@common/services/notification.service';
import { isEmpty, tryGetErrors } from '@common/utils/utils';
import { TranslateService } from '@ngx-translate/core';

export class AppErrorHandler implements ErrorHandler {
  private readonly _notificationService = inject(NotificationService);
  private readonly _translateService = inject(TranslateService);

  public handleError(error: unknown): void {
    if (isDevMode()) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (error instanceof HttpErrorResponse) {
      this._handleHttpError(error);
    } else {
      this._showGenericError();
    }
  }

  private _handleHttpError(error: HttpErrorResponse): void {
    switch (error.status) {
      case HttpStatusCode.BadRequest: {
        const message = tryGetErrors(error)
          ?.map((e) => e.message)
          .join('; ');
        if (!isEmpty(message)) {
          this._notificationService.error(message!);
        } else {
          this._showGenericError();
        }
        break;
      }
      default: {
        this._showGenericError();
      }
    }
  }

  private _showGenericError(): void {
    this._notificationService.error(this._translateService.instant('SOMETHING_WENT_WRONG'));
  }
}
