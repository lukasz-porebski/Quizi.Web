import type { ApplicationConfig } from '@angular/core';
import { ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { authenticationInterceptor } from '@common/identity/interceptors/authentication.interceptor';
import { AppErrorHandler } from '@common/handlers/error.handler';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideTranslateService({
      fallbackLang: 'pl',
    }),
    provideTranslateHttpLoader({
      prefix: './i18n/',
      suffix: '.json',
    }),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideNgxMask({
      patterns: {
        G: {
          pattern: /[0-9a-fA-F]/,
        },
      },
    }),
  ],
};
