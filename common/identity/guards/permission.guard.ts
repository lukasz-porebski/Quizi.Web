import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';

export const permissionGuard =
  (...permissions: string[]): CanActivateFn =>
  () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    if (!permissions.every((p) => authenticationService.hasPermission(p))) {
      return router.createUrlTree(['/forbidden']); // TODO: Dodać stronę na brak uprawnień
    }
    return true;
  };
