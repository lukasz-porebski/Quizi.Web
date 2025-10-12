import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { isEmpty } from '@common/utils/utils';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  public readonly service = inject(AuthenticationService);

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('identity/refresh-token')) {
      return next.handle(request);
    }

    const accessToken = this.service.response()?.accessToken;
    let authRequest = request;
    if (!isEmpty(accessToken)) {
      authRequest = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return next.handle(authRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return from(this.service.refresh()).pipe(
            switchMap(() => {
              const newReq = request.clone({
                setHeaders: { Authorization: `Bearer ${this.service.response()?.accessToken}` },
              });
              return next.handle(newReq);
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
