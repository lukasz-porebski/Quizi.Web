import type { ApplicationConfig } from '@angular/core';
import { ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideNgxMask } from 'ngx-mask';
import { API_URL, AppErrorHandler, authenticationInterceptor } from 'lp-common';
import { environment } from '@env/environment';

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
    { provide: API_URL, useValue: environment.apiUrl },
  ],
};
