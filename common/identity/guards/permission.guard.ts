import type { CanActivateFn} from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import type { Permission } from '@app/core/enums/permission.enum';

export const permissionGuard =
  (...permissions: Permission[]): CanActivateFn =>
  () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    if (!permissions.every((p) => authenticationService.hasPermission(p))) {
      return router.createUrlTree(['/forbidden']); // TODO: Dodać stronę na brak uprawnień
    }
    return true;
  };
