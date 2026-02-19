import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { Permission } from '@app/core/enums/permission.enum';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public readonly hasPermission = input<Permission | Permission[]>([]);

  public constructor() {
    effect(() => {
      const perms = this.hasPermission();
      const required = Array.isArray(perms) ? perms : [perms];

      this._viewContainerRef.clear();

      if (required.every((p) => this._authenticationService.hasPermission(p))) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      }
    });
  }
}
