import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmpty } from '@common/utils/utils';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IRegistrationForm } from '@app/modules/identity/pages/registration/interfaces/registration-form.interface';

export namespace RegistrationValidators {
  export function ConfirmedPassword(): ValidatorFn[] {
    return [ ...IdentityValidators.Password(), confirmPassword() ];
  }

  function confirmPassword(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const parent = control.parent as FormGroup<IRegistrationForm>;
      if (isEmpty(control.value) || isEmpty(parent.value.confirmedPassword)) {
        return null;
      }

      return parent.value.password !== control.value
        ? {confirmPassword: true}
        : null;
    };
  }
}
