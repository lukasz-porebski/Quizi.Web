import { Component, inject } from '@angular/core';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { ButtonComponent } from '@common/components/button/button.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IdentityUtils } from '@app/modules/identity/utils/identity.utils';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import { TextInputType } from '@common/components/inputs/text/enums/type.enum';
import type { IRegistrationForm } from '@app/modules/identity/pages/registration/interfaces/registration-form.interface';
import { RegistrationApiService } from '@app/modules/identity/pages/registration/api/registration-api.service';
import { RegistrationValidators } from '@app/modules/identity/pages/registration/validators/registration.validators';
import type { ITextConfig } from '@common/models/text.config';
import { isDefined } from '@common/utils/utils';
import { Route } from '@app/core/enums/route.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [
    AsyncPageComponent,
    ButtonComponent,
    MatCard,
    MatCardContent,
    TextInputComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [ TranslatePipe, RegistrationApiService ],
})
export class RegistrationComponent {
  public readonly TextInputType = TextInputType;
  public readonly ButtonStyle = ButtonStyle;
  public readonly Validators = IdentityValidators;
  public readonly Utils = IdentityUtils;
  public readonly form = new FormGroup<IRegistrationForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Email(),
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Password(),
    }),
    confirmedPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: RegistrationValidators.ConfirmedPassword(),
    }),
  });

  public isLoading = false;

  private readonly _router = inject(Router);
  private readonly _registrationApiService = inject(RegistrationApiService);
  private readonly _authenticationService = inject(AuthenticationService);

  public tryGetEmailAdditionalError(): ITextConfig | undefined {
    const control = this.form.controls.email;
    return control.hasError('emailIsTaken')
      ? {
        text: 'EMAIL_IS_TAKEN',
      }
      : undefined;
  }

  public tryGetConfirmedPasswordAdditionalError(): ITextConfig | undefined {
    const control = this.form.controls.confirmedPassword;
    const error = IdentityUtils.TryGetPasswordFormatError(control);
    if (isDefined(error)) {
      return error;
    }

    return control.hasError('confirmPassword')
      ? {
        text: 'PASSWORDS_ARE_DIFFERENT',
      }
      : undefined;
  }

  public async redirectToLogin(): Promise<void> {
    await this._router.navigateByUrl(Route.Login);
  }

  public async register(): Promise<void> {
    this.isLoading = true;
    await this._registrationApiService.register({
      email: this.form.value.email!,
      password: this.form.value.password!,
    })
      .then(() => this._authenticationService.logIn(this.form.value.email!, this.form.value.password!))
      .catch(() => {
        this.form.controls.email.setErrors({emailIsTaken: true});
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
