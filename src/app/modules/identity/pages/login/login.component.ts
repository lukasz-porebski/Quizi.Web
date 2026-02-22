import { Component, inject } from '@angular/core';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { FormControl, FormGroup } from '@angular/forms';
import type { ILoginForm } from '@app/modules/identity/pages/login/interfaces/login-form.interface';
import { TextInputType } from '@common/components/inputs/text/enums/type.enum';
import { ButtonComponent } from '@common/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IdentityUtils } from '@app/modules/identity/utils/identity.utils';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { TextConfig } from '@common/models/text.config';
import type { Optional } from '@common/types/optional.type';
import { MatError } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { Router } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';

@Component({
  selector: 'app-login',
  imports: [
    AsyncPageComponent,
    MatCard,
    MatCardContent,
    TextInputComponent,
    ButtonComponent,
    MatError,
    MatError,
    TextConfigTranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ TranslatePipe ],
})
export class LoginComponent {
  public readonly TextInputType = TextInputType;
  public readonly ButtonStyle = ButtonStyle;
  public readonly Validators = IdentityValidators;
  public readonly Utils = IdentityUtils;
  public readonly form = new FormGroup<ILoginForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Email(),
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Password(),
    }),
  });

  public isLoading = false;
  public invalidAuthData = false;

  private readonly _router = inject(Router);
  private readonly _authenticationService = inject(AuthenticationService);

  public tryGetInvalidAuthDataError(): Optional<TextConfig> {
    return this.invalidAuthData ? new TextConfig({text: 'INVALID_EMAIL_OR_PASSWORD'}) : undefined;
  }

  public async redirectToRegistration(): Promise<void> {
    await this._router.navigateByUrl(Route.Registration);
  }

  public async logIn(): Promise<void> {
    this.isLoading = true;
    await this._authenticationService
      .logIn(this.form.value.email!, this.form.value.password!)
      .then((isValid) => {
        if (!isValid) {
          this.invalidAuthData = true;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
