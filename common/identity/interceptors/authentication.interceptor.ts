import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { isEmpty } from '@common/utils/utils';

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const service = inject(AuthenticationService);

  if (request.url.includes('identity/refresh-token')) {
    return next(request);
  }

  const accessToken = service.response()?.accessToken;
  let authRequest = request;
  if (!isEmpty(accessToken)) {
    authRequest = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }

  return next(authRequest).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return from(service.refresh()).pipe(
          switchMap(() => {
            const newReq = request.clone({
              setHeaders: { Authorization: `Bearer ${service.response()?.accessToken}` },
            });
            return next(newReq);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
