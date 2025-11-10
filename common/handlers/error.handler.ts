import { ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NotificationService } from '@common/services/notification.service';
import { isEmpty, tryGetErrors } from '@common/utils/utils';
import { TranslateService } from '@ngx-translate/core';

export class AppErrorHandler implements ErrorHandler {
  private readonly _notificationService = inject(NotificationService);
  private readonly _translateService = inject(TranslateService);

  public handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case HttpStatusCode.BadRequest: {
        const errors = tryGetErrors(error.error);
        let message = '';
        if (!isEmpty(errors)) {
          message = errors!.map(e => e.Message).join('; ');
        } else {
          message = this._translateService.instant('SOMETHING_WENT_WRONG');
        }

        this._notificationService.error(message)
      }
    }
  }
}
